'use strict';
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");

exports.dropdownView = function(button) {
  let panel = panels.Panel({
    contentURL: self.data.url("test.html"),
  });
  panel.show({
    position: button
  });

}


function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}
