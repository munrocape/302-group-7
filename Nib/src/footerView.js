"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");
var utils = require('sdk/window/utils');


exports.FooterView = class FooterView {
  constructor(button){
    this.panel = panels.Panel({
      position:{bottom:0},
      contentURL: self.data.url('footer/footer.html'),
      contentScriptFile: self.data.url('js/footerContentScript.js')
    });
  }

  show () {
    var browserWindow = utils.getMostRecentBrowserWindow();
    this.panel.width = browserWindow.content.innerWidth;
    this.panel.show({});
  }
}
