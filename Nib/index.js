var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var google_book = {
		"name": "",
		"title_of_source": "",
		"link": "",
		"year": "",
		"publisher": "",
		"authors": [],
		"isbn": -1,
		"references": []
	};
google_book_changed = false;
const { MenuButton } = require('./lib/menu-button');
const { DropDownView } = require('./src/dropdownView');
const { FooterView } = require('./src/footerView');
const { HOME, SEND_STORAGE, ADD_NEW_PROJECT, SELECT_PROJECT, ADD_NEW_AUTHOR, DELETE_PROJECT, DELETE_PROJECT_COMPLETE, CREATE_SOURCE, SOURCE_CREATED, UPDATE_SOURCE, DELETE_SOURCE, CANCEL_EDIT, UPDATE_REFERENCE, GOOGLE_BOOKS, SCRAPED_CITATION,SELECT_SOURCE, DELETE_REF} = require('./consts/emitter');


var ss = require("sdk/simple-storage");
var utils = require('sdk/window/utils');

let dropDownView = null;
let footerView = null;
//

p = pageMod.PageMod({
  include: "https://books.google.ca/books?id=*",
  contentScriptWhen: "ready",
  contentScriptFile: self.data.url('./scrapers/googleBooks.js'),
  //contentScript: "fields = document.getElementById('metadata_content_table').children[0].children;",
  onAttach: function(worker) {
      google_book_changed = true
      worker.port.on("key_value_pair", function(pair) {
        console.log('before: ' +  pair[0] + ': ' + google_book[pair[0]]);
        console.log(pair[0] + '' + pair[1]);
        if (pair[0] == 'publisher') {
        	var pairSplit = pair[1].split(",")
            google_book['publisher'] = pairSplit.slice(0, pairSplit.length -1).join(',');
            google_book['year'] = pairSplit[pairSplit.length - 1];
            console.log('after: year:' + google_book['year']);
        }else{
            google_book[pair[0]] = pair[1];
        }
        console.log('after: ' + pair[0] + ': ' +  google_book[pair[0]]);

      });
    }
});
///
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js

function getURL() {
  var url = utils.getMostRecentBrowserWindow().content.location.href;
  google_book =  {
      "source_id": -1,
      "name": "",
      "title_of_source": "",
      "link": "",
      "year": null,
      "authors": [],
      "references":[]
    };
    google_book_changed = false;
  return url;
}

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
//i is optional if you want a specific 'project', AKA the ith project and jth source
dropDownView.panel.port.on(SEND_STORAGE, function(panelEvent, i, j){

  if (typeof i === 'undefined') {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data)
  } else if (typeof j === 'undefined') {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data[i])
  } else {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data[i].sources[j])
  }
})

dropDownView.panel.port.on(DELETE_PROJECT, function (project_to_delete_id){
  ss.storage.data.splice(project_to_delete_id, 1);
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

dropDownView.panel.port.on(DELETE_REF, function(proj_id, source_id, ref_id) {
  ss.storage.data[proj_id].sources[source_id].references.splice(ref_id, 1);
  displayProjectById(proj_id, source_id)
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

function getScrapedData(url) {
  console.log('checking url: ' + url);
  if (url.indexOf('books.google.') != -1) {
    console.log('calling google scraper');
    dropDownView.panel.port.emit(GOOGLE_BOOKS);
    dropDownView.panel.port.on(SCRAPED_CITATION, function (citation) {
      console.log('got a citation back: ' + citation);
      return citation;
    });
  }
  return null
}

dropDownView.panel.port.on(CREATE_SOURCE, function(active_project_id, name){
  var url = getURL();
  if (url.startsWith('about:')) {
    url = '';
  }
  new_source = {};
  scraped_data = null;
  if(google_book_changed){
    scraped_data = google_book;
  }
  if (scraped_data != null) {
    new_source = scraped_data;
    console.log('using google book: ' + new_source);
  } else {
    new_source = {
      "name": "",
      "title_of_source": "",
      "link": "",
      "year": null,
      "authors": [],
      "references":[]
    };
  }
  new_source["link"] = url;
  new_source["name"] = name;
  ss.storage.data[active_project_id].sources.push(new_source)
  //Send back the last index of the newly created source
  google_books_changed = false;
  dropDownView.panel.port.emit(SOURCE_CREATED, ss.storage.data[active_project_id].sources.length - 1);


  

});

function deleteSource(proj_id, s_id) {
  ss.storage.data[proj_id].sources.splice(s_id, 1)
}

dropDownView.panel.port.on(UPDATE_SOURCE, function (proj_id, s_id, updated_source) {
  let references = ss.storage.data[proj_id].sources[s_id].references
  ss.storage.data[proj_id].sources[s_id] = updated_source
  ss.storage.data[proj_id].sources[s_id].references = references
  displayProjectById(proj_id);
});

dropDownView.panel.port.on(UPDATE_REFERENCE, function(proj_id, source_id, ref_id, updated_ref) {
  //Implies new reference
  if (typeof ref_id !== 'number') {
    console.log("Saved new reference");
    ss.storage.data[proj_id].sources[source_id].references.push(updated_ref);
    displayProjectById(proj_id, source_id);
  } else {
    console.log("Updated ref")
    ss.storage.data[proj_id].sources[source_id].references[ref_id] = updated_ref
    displayProjectById(proj_id, source_id);
  }
  //ss.storage.data[proj_id]
})
dropDownView.panel.port.on(DELETE_SOURCE, function (proj_id, s_id) {
  deleteSource(proj_id, s_id);
  displayProjectById(proj_id);
})

dropDownView.panel.port.on(CANCEL_EDIT, function(proj_id) {
  displayProjectById(proj_id);
});


function displayProjectById(proj_id, source_id) {
  if(typeof source_id !== 'number')
    dropDownView.panel.port.emit(SELECT_PROJECT, ss.storage.data[proj_id]);
  else
    dropDownView.panel.port.emit(SELECT_SOURCE, ss.storage.data[proj_id].sources[source_id]);
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
