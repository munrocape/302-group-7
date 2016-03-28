
self.port.on(HOME, function (storage) {

	for (let i = 0; i < storage.length; i++){
		// let node = document.createElement("h6");
		// let textnode = document.createTextNode(storage[i].name);
		// 	node.appendChild(textnode);
		// 	document.getElementById("projects").appendChild(node);
		// node.setAttribute("id", i);
		if ($('#' + i).val() === 'null' || $('#' + i).val() === '') {
			continue;
		}
		$('#projects').append('<h6 id=' + i + '>' + storage[i].name + '</h6>')
	}
});

$('#options').click(function(){
	console.log('options')
})

$('#home').click(function(){
	self.port.emit(SEND_STORAGE, HOME)
})

self.port.on('getURLResponse', function (url) {

})
