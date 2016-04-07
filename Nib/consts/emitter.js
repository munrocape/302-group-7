//Declare the constants before exporting or messes up conscript file
const HOME = "HOME";
const SEND_STORAGE = "SEND_STORAGE";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const SELECT_PROJECT = "SELECT_PROJECT";
const ADD_NEW_AUTHOR = "ADD_NEW_AUTHOR";
const DELETE_PROJECT = "DELETE_PROJECT";
const CREATE_SOURCE = 'CREATE_SOURCE';
const SOURCE_CREATED = 'SOURCE_CREATED';
const UPDATE_SOURCE = 'UPDATE_SOURCE';
const DELETE_SOURCE = 'DELETE_SOURCE';
const CANCEL_EDIT = 'CANCEL_EDIT';
const UPDATE_REFERENCE = "UPDATE_REFERENCE";
const VIEW_SOURCE = "VIEW_SOURCE";
const ACTIVE_REF = "ACTIVE_REF";
const SELECT_SOURCE = "SELECT_SOURCE";
const DELETE_REF = "DELETE_REF";
const SHOW_BIB = "SHOW_BIB";

//So contentScriptFile doesnt complain
if (typeof exports !== 'undefined') {
  exports.HOME = HOME;
  exports.SEND_STORAGE = SEND_STORAGE;
  exports.ADD_NEW_PROJECT = ADD_NEW_PROJECT;
  exports.SELECT_PROJECT = SELECT_PROJECT;
  exports.ADD_NEW_AUTHOR = ADD_NEW_AUTHOR;
  exports.DELETE_PROJECT = DELETE_PROJECT;
  exports.CREATE_SOURCE = CREATE_SOURCE;
  exports.SOURCE_CREATED = SOURCE_CREATED;
  exports.UPDATE_SOURCE = UPDATE_SOURCE;
  exports.DELETE_SOURCE = DELETE_SOURCE;
  exports.CANCEL_EDIT = CANCEL_EDIT;
  exports.UPDATE_REFERENCE = UPDATE_REFERENCE;
  exports.VIEW_SOURCE = VIEW_SOURCE;
  exports.ACTIVE_REF = ACTIVE_REF;
  exports.SELECT_SOURCE = SELECT_SOURCE;
  exports.DELETE_REF = DELETE_REF;
  exports.DELETE_REF = SHOW_BIB;
}
