self.port.emit("addReference", {'data': 'hi'});
self.port.emit('removeReference', 'remove!');
self.port.emit('test', 'do i exist');

self.port.on('wakeUp', function (storage) {

	for (project in storage) {
		let node = document.createElement("h6");
		let textnode = document.createTextNode(project);
	 	node.appendChild(textnode);
	 	document.getElementById("projects").appendChild(node);
		node.setAttribute("id", project.split()[0]);
	}
});

self.port.on('getURLResponse', function (url) {
})
