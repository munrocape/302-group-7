fields = document.getElementById('metadata_content_table');
if (fields != null){
	fields = fields.children[0].children;
}
if(fields != null){
	for(i = 0; i < fields.length; i++) {
		pair = fields[i].children;
		key = pair[0];
		while(key.children.length > 0 && key.children != undefined) {
			key = key.children[0];
		}
		key = key.innerHTML;
		if (['Subjects', '&nbsp;', 'Export Citation'].indexOf(key) === -1) {
			key = key.toLowerCase();value = pair[1];
			while (value.children.length > 0 && value.children != undefined) {
				value = value.children[0];
			}
			value = value.innerHTML;
			self.port.emit('key_value_pair', [key, value]);
		}
	}
}