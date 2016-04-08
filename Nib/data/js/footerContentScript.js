self.port.on('checkIfReferenceResponse', function (rep) {console.log(rep)});

self.port.on('wakeUp', function (value) {
	document.getElementById('app').innerHTML = value
});

var saved_bib;

self.port.on(SHOW_BIB, function (bib, citation_style) {
    $("#nobib").css("display", "none");
    saved_bib = bib;
    print_bib(saved_bib);
});

function print_bib(bib, citation_style) {
    $("#bibliography").html("");
    // Save the bib into a variabe so function can be called again
    saved_bib = bib
    sources = bib["sources"];

    if (!citation_style) {
        citation_style = IEEE;
    }

    if (citation_style === IEEE) {
        // Print sources according to citation_style
        ieee_format_bib(bib);
    }

    else if (citation_style == MLA){
        for (let i = 0; i < sources.length; i++) {
            citation = mla_format(sources[i]) + "<br>";
            $("#bibliography").append(citation);
        }
    }

    else if(citation_style == CHICAGO) {
        citation = "Implementation of chicago style coming soon.";
        $("#bibliography").append(citation);
    }


}

function parse_authors(authors) {
    let ret = "";

    for (let i = 0; i < authors.length; i++) {
				let tokenized = authors[i].split(" ");
        // Append a last name only if it exists
        if (tokenized.length > 1) {
            ret += tokenized[0].slice(0, 1) + ". " + tokenized[1];
        } else {
            ret += tokenized[0];
        }
        
        if (i != authors.length - 1)
					ret += " and ";
    }
    return ret;
}

function mla_format(source) {
	let citation = "";
	let authors = parse_authors(source["authors"]) + ". ";
	let title = "<i>" + source["name"] + "</i>";
    let year = source["year"];
	let link = source["link"];

	return authors + '. ' + title + '. ' + year + '. ' + link;

}

function ieee_format_bib(bib) {
    for (let i = 0; i < sources.length; i++) {
        authors = parse_authors(sources[i]["authors"]);
        citation = "<p>[" + (i + 1) + "] " + authors + ", " + "";
        if (sources[i]['section']) {
            citation = citation + ' "' + sources[i]["section"] + '" in '
        }
        citation = citation + "<i>" + sources[i]["name"] + "</i>,";
        if (sources[i]['publisher']) {
            citation = citation + " " + sources[i]['publisher'];
        }
        if (sources[i]['year']) {
            citation = citation + " " + sources[i]['year'];
        }
        if (sources[i]['accessed']) {
            citation = citation + ", Internet: " + sources[i]['link'];
            citation = citation + ", [" + sources[i]['accessed'] + "]";
        }

        citation = citation + ".</p>";
        $("#bibliography").append(citation);
    }
}

// Shows the IEEE bib
$('#style_ieee').click(function(){
    print_bib(saved_bib, IEEE);
});

// Shows the MLA bib
$('#style_mla').click(function(){
    print_bib(saved_bib, MLA);
});

// Shows the chicago bib
$('#style_chicago').click(function(){
    print_bib(saved_bib, CHICAGO);
});

$('#switch-to-dropdown').click(function () {
    self.port.emit(SHOW_DROPDOWN);
});
