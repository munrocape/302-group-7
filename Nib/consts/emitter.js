//Declare the constants before exporting or messes up conscript file
const HOME = "HOME";
const SEND_STORAGE = "SEND_STORAGE";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const SELECT_PROJECT = "SELECT_PROJECT";
const ADD_NEW_AUTHOR = "ADD_NEW_AUTHOR";
const DELETE_PROJECT = "DELETE_PROJECT";

//So contentScriptFile doesnt complain
if (typeof exports !== 'undefined') {
  exports.HOME = HOME;
  exports.SEND_STORAGE = SEND_STORAGE;
  exports.ADD_NEW_PROJECT = ADD_NEW_PROJECT;
  exports.SELECT_PROJECT = SELECT_PROJECT;
  exports.ADD_NEW_AUTHOR = ADD_NEW_AUTHOR;
  exports.DELETE_PROJECT = DELETE_PROJECT;
}
