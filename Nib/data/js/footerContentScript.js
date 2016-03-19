self.port.emit("addReference", {'data': 'hi'});
self.port.emit('removeReference', 'remove!');
self.port.emit('test', 'do i exist');
window.content;

self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
})
