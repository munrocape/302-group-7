self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
});


self.port.on(SHOW_BIB, function(bib) {
    console.log(bib);
});