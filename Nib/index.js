var self = require("sdk/self");
const { MenuButton } = require('./lib/menu-button');
const { DropDownView } = require('./src/dropdownView');
const { FooterView } = require('./src/footerView');
const { HOME, SEND_STORAGE, ADD_NEW_PROJECT, SELECT_PROJECT } = require('./consts/emitter');

var ss = require("sdk/simple-storage");
var utils = require('sdk/window/utils');

let dropDownView = null;
let footerView = null;

function getURL() {
  return utils.getMostRecentBrowserWindow().content.location.href;
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
//i is optional if you want a specific 'project', AKA the nth project
dropDownView.panel.port.on(SEND_STORAGE, function(panelEvent, i){

  if (typeof i === 'undefined') {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data)
  } else {
    dropDownView.panel.port.emit(panelEvent, ss.storage.data[i])
  }
})



dropDownView.panel.port.on("store", function(project) {
  console.log(project);
});

dropDownView.panel.port.on(ADD_NEW_PROJECT, function(projectName){
  ss.storage.data.push({
    name: projectName,
    sources: []
  });
})

dropDownView.panel.port.on("checkIfReferenceRequest", function(ref) {
  console.log(ref);
  dropDownView.panel.port.emit('checkIfReferenceResponse', 'okay! resposne from index.js');
});


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
  let fakeData = require("fake_data.json")
  ss.storage.data = []
  for(let i = 0; i < fakeData.length; i++){
      console.log("Stored " + fakeData[i].name)
      ss.storage.data.push(fakeData[i])
  }
})()

dropDownView.panel.port.emit(HOME, ss.storage.data)


function handleClick(state, isMenu) {
  if (isMenu) {
    footer_open = !footer_open;
    footerView.show();
  } else {
    dropdown_open = !dropdown_open;
    dropDownView.show();
  }
}
