self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
});


self.port.on(SHOW_BIB, function(bib, citation_style) {
    $("#bibliography").html("");
    if (citation_style === 'IEEE')

    console.log(bib);
    sources = bib["sources"];

    // Print sources according to citation_style
    for (let i = 0; i < sources.length; i++) {
        authors = parse_authors(sources[i]["authors"]);
        citation = "<p>[" + (i + 1) + "] ";
        citation = citation + authors + ", " "<span class = 'italicize'>" + sources[i]["name"] + "</span></p>"; //+ authors;
        $("#bibliography").append(citation);
    }

});

function parse_authors(authors) {
    let ret = "";

    for (let i = 0; i < authors.length; i++) {
        ret += authors[i];
        if (i != authors.length - 1) ret += " and ";
    }
    return ret;
}