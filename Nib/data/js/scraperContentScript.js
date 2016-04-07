function getEmptySource() {
	empty_reference_object = {
	  "source_id": -1,
	  "name": "",
	  "title_of_source": "",
	  "link": "",
	  "year": null,
	  "authors": [],
	  "references":[]
	};
	return empty_reference_object;
}

self.port.on(GOOGLE_BOOKS, function (url) {
	console.log('in google book scraper');
	//fields = $('#metadata_content_table').children[0].children;
	var ref = getEmptySource();
	// for(i = 0; i < fields.length; i++) {
	// 	pair = fields[i].children
	// 	key = pair[0];
	// 	while(key.children.length > 0 && key.children != undefined) {
	// 		key = key.children[0];
	// 	}
	// 	key = key.innerHTML;

	// 	if (['Subjects', '&nbsp;', 'Export Citation'].indexOf(key) === -1) {
	// 		key = key.toLowerCase();
	// 		value = pair[1];
	// 		while (value.children.length > 0 && value.children != undefined) {
	// 			value = value.children[0];
	// 		}
	// 		value = value.innerHTML;
	// 		console.log(key, value);
	// 		if (key === 'title') {
	// 			ref['title_of_source'] = value;
	// 		} else {
	// 			if (ref[key] != undefined) {
	// 				ref[key] = value;
	// 			}
	// 		}
	// 	}
	// }
	self.port.emit(SCRAPED_CITATION, ref);
});