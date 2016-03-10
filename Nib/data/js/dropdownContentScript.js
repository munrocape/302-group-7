self.port.emit("addReference", {'data': 'hi'});
self.port.emit('removeReference', 'remove!');
self.port.emit('checkIfReference', 'do i exist');

self.port.on('wakeUp', function (value) {
	console.log('dropdown');
	// get the current URL
	self.port.emit('getURLRequest', {});
	document.getElementById('test').innerHTML = value;
});

self.port.on('getURLResponse', function (url) {
	document.getElementById('test').innerHTML = url;
})