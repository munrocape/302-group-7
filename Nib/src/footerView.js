"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");
var utils = require('sdk/window/utils');


exports.FooterView = class FooterView {
  constructor(button){
    this.button = button
    this.panel = panels.Panel({
      position:{bottom:0},
      contentURL: self.data.url('footer.html')
    })
  }

  show () {
    var browserWindow = utils.getMostRecentBrowserWindow();
    this.panel.width = browserWindow.content.innerWidth;
    this.panel.show({});
  }
}
