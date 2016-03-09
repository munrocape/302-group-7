"use strict";
const { Cu } = require('chrome');
const panels = require('sdk/panel');
const self = require("sdk/self");

exports.DropDown = class DropDown {
  constructor(button) {
    this.button = button;
    this.panel = panels.Panel({
      contentURL: self.data.url('../build/dropDownView.html')
    });
  }

  show () {
    this.panel.show({
      position: this.button
    })
  }

}
