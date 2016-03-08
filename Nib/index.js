var self = require("sdk/self");
const { MenuButton } = require('./lib/menu-button');

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
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state, isMenu) {
  if (isMenu) {
    console.log('menu click');
  } else {
    console.log('icon click');
    tabs.open("http://tobottleshops.club/");
  }
}