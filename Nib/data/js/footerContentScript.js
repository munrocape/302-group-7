self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
});


self.port.on(SHOW_BIB, function(bib, citation_style) {
    $("#bibliography").html("");
    console.log(bib);
    sources = bib["sources"];

    if (!citation_style) {
    	citation_style = "IEEE";
    }

    if (citation_style === 'IEEE') {

        // Print sources according to citation_style
        for (let i = 0; i < sources.length; i++) {
            authors = parse_authors(sources[i]["authors"]);
            citation = "<p>[" + (i + 1) + "] " + authors + ", " + "<span class = 'italicize'>" +
                       sources[i]["name"] + "</span>" + " City of Publisher. " +
                       "Country if not USA. " + "Publisher name. " + "year. " + "ch. " +
                       "sec. " + "pp.</p>";
            $("#bibliography").append(citation);
        }

    } else if (citation_style == 'MLA'){
    	for (let i = 0; i < sources.length; i++) {
    		citation = mla_format(sources[i]) + "<br>";
    		$("#bibliography").append(citation);
    	}
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

function mla_format(source) {
	let citation = "";
	let authors = parse_authors(source["authors"]) + ". ";
	let title = '"' + source["name"] + '". ';
	let link = source["link"];

	return authors + title + link;
	
}
