self.port.emit("addReference", {'data': 'hi'});
self.port.emit('removeReference', 'remove!');
self.port.emit('test', 'do i exist');

self.port.on('wakeUp', function (storage) {
	for (let i = 0; i < storage.length; i++){
		let node = document.createElement("h6");
		let textnode = document.createTextNode(storage[i].name);
	 	node.appendChild(textnode);
	 	document.getElementById("projects").appendChild(node);
		node.setAttribute("id", i);
	}
});

self.port.on('getURLResponse', function (url) {
})
