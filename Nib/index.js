var self = require("sdk/self");
const { MenuButton } = require('./lib/menu-button');
const { DropDownView } = require('./src/dropdownView');
const { FooterView } = require('./src/footerView');
let dropDownView = null;
let footerView = null;
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
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

function handleClick(state, isMenu) {
  if (isMenu) {
    footerView.show();
  } else {
    dropDownView.show();
  }
}