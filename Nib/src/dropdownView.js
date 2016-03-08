"use strict";
const { Cu } = require('chrome');
const panels = require("sdk/panel");
const self = require("sdk/self");
//const React = require('react');
//const ReactDOM = require('react-dom');

//document.getElementById('app').innerHTML = "hello world"

exports.DropDownView = class DropDownView {
  constructor(button) {
    this.button = button;
    this.panel = panels.Panel({
      contentURL: self.data.url('dropDownView.html')
    });


    // ReactDOM.render(
    //   <h1>Hello, world!</h1>,
    //   document.getElementById('app')
    // );
    //document.createElement("p")

  }

  show () {
    this.panel.show({
      position: this.button
    })
  }

}
