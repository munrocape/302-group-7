
const { empty_reference_object } = require('./emptyreference.js');

function googleBooks() {
	fields = document.getElementById('metadata_content_table').children[0].children;
	var ref = empty_reference_object;
	for(i = 0; i < fields.length; i++) {
		pair = fields[i].children
		key = pair[0];
		
		// keep unpacking the table entry until we reach the inner HTML
		// sometimes things are buried in link span link span things
		while (key.children.length > 0 && key.children != undefined) {
			key = key.children[0];
		}
		key = key.innerHTML.toLowerCase();
		
		// now that we know the key we can filter out some values we dont care about
		// Subjects is categorizing filter, Export Citation is for generating citations (haha)
		if (['Subjects', '&nbsp;', 'Export Citation'].indexOf(key) === -1) {
			value = pair[1];
			while (value.children.length > 0 && value.children != undefined) {
				value = value.children[0];
			}
			value = value.innerHTML;
			if (ref[key] != undefined) {
				ref[key] = value;
			}
		}
	}
	console.log(ref);
	return ref;
}

if (typeof exports !== 'undefined') {
  exports.googleBooks = googleBooks;
}
