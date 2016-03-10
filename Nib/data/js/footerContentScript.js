self.port.emit("addReference", {'data': 'hi'});
self.port.emit('removeReference', 'remove!');
self.port.emit('checkIfReference', 'do i exist');
window.content;

self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	console.log('i was opened');
	document.getElementById('test').innerHTML = value;
})