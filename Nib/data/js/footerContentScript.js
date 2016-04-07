self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
});


self.port.on(SHOW_BIB, function(bib) {
    console.log(bib);
    sources = bib["sources"];
    for (let i = 0; i < sources.length; i++) {
        citation = "<p>[" + (i + 1) + "]";
        citation = citation + "<span class = 'italicize'>" + sources[i]['title_of_source'] + "</span>";
        $("#bibliography").append(citation);
    }

});