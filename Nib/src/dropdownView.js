"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");

exports.DropDownView = class DropDownView {
  constructor(button){
    this.button = button;
    this.panel = panels.Panel({
      contentURL: self.data.url('dropdown.html'),
      contentScriptFile: self.data.url('js/dropdownContentScript.js')
    });
  }

  show () {
    this.panel.show({
      position: this.button
    })
  }
}
