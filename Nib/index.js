var self = require("sdk/self");
const { MenuButton } = require('./lib/menu-button');
const { DropDownView } = require('./src/dropdownView');
const { FooterView } = require('./src/footerView');
const { HOME, SEND_STORAGE, ADD_NEW_PROJECT, SELECT_PROJECT, ADD_NEW_AUTHOR, DELETE_PROJECT, DELETE_PROJECT_COMPLETE, CREATE_SOURCE, SOURCE_CREATED, UPDATE_SOURCE, DELETE_SOURCE, CANCEL_EDIT } = require('./consts/emitter');

var ss = require("sdk/simple-storage");
var utils = require('sdk/window/utils');

let dropDownView = null;
let footerView = null;
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

function getURL() {
  return utils.getMostRecentBrowserWindow().content.location.href;
}

exports.dummy = dummy;

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var btn = MenuButton({
  id: 'my-menu-button',
  label: 'My menu-button',
  button_label: 'Add reference',
  dropdown_label: 'Manage projects and references',
  icon: {
    "16": "./icon/icon-16.png",
    "32": "./icon/icon-32.png",
    "64": "./icon/icon-64.png"
  },
  onClick: handleClick
});


dropDownView = new DropDownView(btn);
footerView = new FooterView(btn);
// set up our messaging
// it largely is a thin layer to the functions
dropDownView.panel.port.on('getURLRequest', function () {
  return dropDownView.panel.port.emit('getURLResponse', getURL());
});

dropDownView.panel.port.on("addReferenceRequest", function(ref) {
  console.log(ref);
});

dropDownView.panel.port.on("removeReferenceRequest", function(ref) {
  console.log(ref);
});
//On an event send the storage
//i is optional if you want a specific 'project', AKA the nth project
dropDownView.panel.port.on(SEND_STORAGE, function(panelEvent, i){

  if (typeof i === 'undefined') {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data)
  } else {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data[i])
  }
})

dropDownView.panel.port.on(DELETE_PROJECT, function (project_to_delete_id){
  // for i in projects
  // if i == project
    // delete i
  console.log(project_to_delete_id);
  for (let i = 0; i < ss.storage.data.length; i++) {
      if (ss.storage.data[i].project_id === project_to_delete_id) {
        console.log('say bye-bye to ' + project_to_delete_id);
        ss.storage.data.splice(i, 1);
      }
  }
  console.log(ss.storage.data);
  dropDownView.panel.port.emit(HOME, ss.storage.data);
});




dropDownView.panel.port.on("store", function(project) {
  console.log(project);
});

// Add a new project to simple storage
dropDownView.panel.port.on(ADD_NEW_PROJECT, function(projectName){
  ss.storage.max_id = ss.storage.max_id + 1;
  ss.storage.data.push({
    name: projectName,
    sources: [],
    project_id: ss.storage.max_id
  });
})

// Add a new author for a source
dropDownView.panel.port.on(ADD_NEW_AUTHOR, function(authorName){
  // Currently this will push the author onto the first project, first source
  // Since I wasn't sure how to index properly yet. I'm assuming the function
  // will have to take a project_id and source_id as indices
  ss.storage.data[0].sources[0].authors.push(authorName);
  console.log(ss.storage.data[0].sources[0].authors);
})

dropDownView.panel.port.on("checkIfReferenceRequest", function(ref) {
  console.log(ref);
  dropDownView.panel.port.emit('checkIfReferenceResponse', 'okay! resposne from index.js');
});

dropDownView.panel.port.on(CREATE_SOURCE, function(active_project_id, name){
  source_id = ss.storage.max_id;
  ss.storage.max_id = ss.storage.max_id + 1;
  var url = getURL();
  if (url.startsWith('about:')) {
    url = '';
  }
  new_source = {
    "source_id": source_id,
    "name": name,
    "title_of_source": "",
    "link": url,
    "year": null,
    "authors": [],
    "references":[]};

  for(let i = 0; i < ss.storage.data.length; i++){
    if (ss.storage.data[i].project_id == active_project_id) {
      ss.storage.data[i].sources.push(new_source);
    }
  }
  dropDownView.panel.port.emit(SOURCE_CREATED, new_source);
});

function deleteSource(proj_id, s_id) {
  for(let i = 0; i < ss.storage.data.length; i++){
    if(ss.storage.data[i].project_id === proj_id) {
      for(let j = 0; j < ss.storage.data[i].sources.length; j++){
        if (ss.storage.data[i].sources[j].source_id === s_id) {
          console.log('saving');
          ss.storage.data[i].sources.splice(j, 1);
          return i
        }
      }
      return i
    }
  }
}

dropDownView.panel.port.on(UPDATE_SOURCE, function (proj_id, s_id, updated_source) {
  // this is why we should have used keys
  //var index = deleteSource(proj_id, s_id);
  //ss.storage.data[index].sources.push(updated_source);
  for(let i = 0; i < ss.storage.data.length; i++){
    if(ss.storage.data[i].project_id === proj_id) {
      for(let j = 0; j < ss.storage.data[i].sources.length; j++){
        console.log(ss.storage.data[i].sources[j]);
        if (ss.storage.data[i].sources[j].source_id === s_id) {
          console.log('saving');
          ss.storage.data[i].sources[j] = updated_source;
        }
      }
    }
  }
  displayProjectById(proj_id);
});


dropDownView.panel.port.on(DELETE_SOURCE, function (proj_id, s_id) {
  deleteSource(proj_id, s_id);
  displayProjectById(proj_id);
})

dropDownView.panel.port.on(CANCEL_EDIT, function(proj_id) {
  displayProjectById(proj_id);
});


function displayProjectById(proj_id) {
  for(let i = 0; i < ss.storage.data.length; i++) {
    if (ss.storage.data[i].project_id == proj_id) {
      dropDownView.panel.port.emit(SELECT_PROJECT, ss.storage.data[i]);
    }
  }
}
function addReference(reference) {
  console.log(reference);
}

function removeReference(reference) {
  console.log(reference);
}

dropdown_open = false;
footer_open = false;
open_count = 0;

//To be removed once app is completed
(function initialize(){
  ss.storage.max_id = 100;
  let fakeData = require("fake_data.json");
  ss.storage.data = [];
  for(let i = 0; i < fakeData.length; i++){
      console.log("Stored " + fakeData[i].name);
      ss.storage.data.push(fakeData[i]);
  }
})()

dropDownView.panel.port.emit(HOME, ss.storage.data);


function handleClick(state, isMenu) {
  if (isMenu) {
    footer_open = !footer_open;
    footerView.show();
  } else {
    dropdown_open = !dropdown_open;
    dropDownView.show();
  }
}
