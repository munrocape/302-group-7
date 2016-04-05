const { empty_reference_object } = require('./emptyreference.js');
function googleBooks() {
	return empty_reference_object;
}

if (typeof exports !== 'undefined') {
  exports.googleBooks = googleBooks;
}
