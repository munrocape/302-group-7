"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");
const ss = require("sdk/simple-storage");
exports.DropDownView = class DropDownView {
  constructor(button){
    this.button = button;
    this.panel = panels.Panel({
      contentURL: self.data.url('dropdown/dropdown.html'),
      contentScriptFile: [self.data.url('js/jquery.js'), self.data.url('../consts/emitter.js'), self.data.url('js/dropdownContentScript.js')]
    });
  }

  show () {
    this.panel.show({
      position: this.button
    })
  }
}
