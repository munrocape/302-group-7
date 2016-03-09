"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");

exports.FooterView = class FooterView {
  constructor(button){
    this.button = button
    this.panel = panels.Panel({
      width:1000,
      position:{bottom:0},
      contentURL: self.data.url('footer.html')
    })
  }

  show () {
    this.panel.show({

    })
  }
}
