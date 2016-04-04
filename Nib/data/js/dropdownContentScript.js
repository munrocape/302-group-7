// Initially hide all divs except for main/home
let active_source_id = null;
let active_ref_id = null;
let active_project_id = null;

$("#projectView").css("display", "none");
$("#sourceView").css("display", "none");
$("#authorView").css("display", "none");
$("#createNewProjectView").css("display", "none");
$("#createNewSourceView").css("display", "none");
$("#createNewAuthorView").css("display", "none");
$('#editSourceView').css('display', 'none');

//When Nib is clicked, it redirects to home, hiding all other divs
$("#home").click(function() {
	self.port.emit(SEND_STORAGE, HOME);
})

function showHome() {
	$("#main").css("display", "block");
	$("#projectView").css("display", "none");
	$("#sourceView").css("display", "none");
	$("#authorView").css("display", "none");
	$("#createNewProjectView").css("display", "none");
	$("#createNewSourceView").css("display", "none");
	$("#createNewAuthorView").css("display", "none");
  $("#sourceNameView").css("display", "none");
	$("#createNewReferenceView").css("display", "none");
	$('#editSourceView').css('display', 'none');
	$('#referencesView').css('display', 'none');
}

function hideAll() {
	$("#main").css("display", "none");
	$("#projectView").css("display", "none");
	$("#sourceView").css("display", "none");
	$("#authorView").css("display", "none");
	$("#createNewProjectView").css("display", "none");
	$("#createNewSourceView").css("display", "none");
	$("#createNewAuthorView").css("display", "none");
	$("#sourceNameView").css("display", "none");
	$("#createNewReferenceView").css("display", "none");
	$('#editSourceView').css('display', 'none');
	$("#referencesView").css("display", "none");
}

//In home click 'add new project' (The plus sign)
$("#addNewProject").click(function(){
	$("#main").css("display", "none");
	$("#createNewProjectView").css("display", "block");
})

// In author view click 'add new author'
$("#newAuthor").click(function(){
	$("#authorView").css("display", "none");
	$("#createNewAuthorView").css("display", "block");
})


$("#deleteProjectButton").click(function(){
	self.port.emit(DELETE_PROJECT, active_project_id);
})

// Navigates to authors 'view'
$("#addNewAuthors").click(function(){
	$("#createNewSourceView").css("display", "none");
	$("#authorView").css("display", "block");
})

// Navigates to main add source 'view'.
 $("#addNewSource").click(function(){
 	$("#projectView").css("display", "none");
 	$("#sourceNameView").css("display", "block");
 })

 // Navigates to main add source 'view'.
 $("#submitSourceName").click(function(){
 	$("#sourceNameView").css("display", "none");
 	$("#sourceView").css("display", "block");
 })

 // Navigates to main add references 'view'.
 $("#addReference").click(function(){
 	$("#sourceView").css("display", "none");
 	$("#createNewReferenceView").css("display", "block");
 })

 // Navigates to source options 'view'.
 $("#sourceOptions").click(function(){
 	$("#sourceView").css("display", "none");
 	$("#createNewSourceView").css("display", "block");
 })


function viewSource(index) {
	active_source_id = index || 0
	self.port.emit(SEND_STORAGE, VIEW_SOURCE);
}
self.port.on(VIEW_SOURCE, function(data) {
	console.log(active_project_id, active_source_id)
	let source = data[active_project_id].sources[active_source_id];
	hideAll();
	$('#editSourceName').val(source.name);
	$('#editSourceYear').val(source.year);
	$('#editSourceTitle').val(source.title_of_source);
	$('#editSourceURL').val(source.link);
	$('#editSourceView').css('display', 'block');

});
$('#manageReferences').click(function(){
	hideAll();
	$("#referencesView").css("display", "block");
	//Not working with .collection
	$("#refcollection").html("");
	$("#sourceName").html(active_source.name)
	for (let i = 0; i < active_source.references.length; i++) {
		if ($("#reference_" + i).val() === 'null' || $("#reference_" + i).val() === '')
			continue;

		let html = '<li class="collection-item"><a href="#!" id="reference_' + i +'">' + active_source.references[i].name + '</a></li>'
		console.log("appending reference " + active_source.references[i].name)
		$('#refcollection').append(html)
		$('#reference_' + i).click(function() {
			//Listener for specific reference
			hideAll();
			$("#createNewReferenceView").css("display", "block");
			viewRef(i)
		})
	}

})

function viewRef(index) {
	active_ref_id = index
	$("#edit_reference_name").val(active_source.references[index].name);
	$("#edit_page_number").val(active_source.references[index].page);
	$("#edit_quote_message").val(active_source.references[index].quote);
}

$("#editReferenceSave").click(function() {
	let new_ref = {
		"name": $("#edit_reference_name").val(),
		"page": $("#edit_page_number").val(),
		"quote": $("#edit_quote_message").val()
	}
	self.port.emit(UPDATE_REFERENCE, active_project_id, active_source_id, active_ref_id, new_ref)
});

$('#addReference').click(function() {
	hideAll()
	$('#createNewReferenceView').css("display", "block")
})
$('#editSourceSave').click(function(){
	let new_source = {
    "source_id": active_source_id,
    "name": $('#editSourceName').val(),
    "title_of_source": $('#editSourceTitle').val(),
    "link": $('#editSourceURL').val(),
    "year": $('#editSourceYear').val(),
    "authors": active_source.authors,
    "references": active_source.references
  }
	self.port.emit(UPDATE_SOURCE, active_project_id, active_source_id, new_source);
	// go home
});

$('#editSourceDelete').click(function(){
	self.port.emit(DELETE_SOURCE, active_project_id, active_source_id);
	// go home
});

$('#editSourceCancel').click(function() {
	self.port.emit(CANCEL_EDIT, active_project_id);
});

//Event for when someone wants to go home or initial page
self.port.on(HOME, function (storage) {
	$('#projects').empty();
	showHome();
	if (storage.length == 0) {
		$('#projects').append("<p>You don't have any projects! Press the + below to create one.</p>");
	}
	for (let i = 0; i < storage.length; i++){
		if ($('#' + i).val() === 'null' || $('#' + i).val() === '') {
			continue;
		}
		console.log('Appending project: ' + i + ', ' + storage[i].name);
		//TODO: href should be custom to each project, maybe use a hleper function here. issue #35
		let html = '<div class="project"><a href="#"><h6 id=' + i + '>' + storage[i].name + '</h6></a></div>'
		$('#projects').append(html)

		$('#' + i).click(function() {
			// Handler for project i
			active_project_id = i;
			console.log(active_project_id)
			self.port.emit(SEND_STORAGE, SELECT_PROJECT, i)
		})

	}
});

//Listens when user selects a project
self.port.on(SELECT_PROJECT, function(project) {
	hideAll();
	console.log('active project id: ' + active_project_id);
	console.log(project.name + " selected")
	//Main display is gone, and project view is block
	$("#main").css("display", "none")
	$("#projectView").css("display", "block")

	$(".projectName").html(project.name)
	$('.collection').empty();
	for (let i = 0; i < project.sources.length; i++) {
		console.log($("#source_" + i).val())
		if ($("#source_" + i).val() === 'null' || $("#source_" + i).val() === '')
			continue;

		let html = '<li class="collection-item"><div><a href="#" id="source_' + i +'">' + project.sources[i].name + '</a><a href="#!" class="secondary-content"></a></div></li>'
		console.log("appending source " + project.sources[i].name )
		console.log("appending #source_" + i)

		$('.collection').append(html)
		$('#source_' + i).click(function(){
			//Listener for specific source
			viewSource(i);
		})
	}
})

$("#submitNewProject").click(function(){
	if ($.trim( $('#newProjectName').val() ) === '' ) {
		console.log('Blank input.');
		$("#newProjectMsg").css("display", "block");
	}
	else {
		self.port.emit(ADD_NEW_PROJECT, $("#newProjectName").val());
		self.port.emit(SEND_STORAGE, HOME);
		$('#main').css("display", "block");
		$('#newProjectName').val('');
		$('#createNewProjectView').css("display", "none");
	}
})

$("#submitNewSource").click(function(){
	if ($.trim( $('#newSourceName').val() ) === '' ) {
		console.log('Blank input.');
		$("#newSourceMsg").css("display", "block");
	}
	else {
		$("#newSourceMsg").css("display", "none");
		var title = $('#newSourceName').val();
		$('#newSourceName').val('');
		console.log('going to fire an event to create source with title: ' + title)
		self.port.emit(CREATE_SOURCE, active_project_id, title)
		self.port.on(SOURCE_CREATED, function (index) {
			viewSource(index);
		});
	}
})

$("#submitNewAuthor").click(function(){
	if ($.trim( $('#newAuthorName').val() ) === '' ) {
		console.log('Blank input.');
		$(".authorName").html("Please enter an Author's name")
	}
	else {
		self.port.emit(ADD_NEW_AUTHOR, $("#newAuthorName").val())
		self.port.emit(SEND_STORAGE, HOME)
		$('#main').css("display", "block");
		$('#createNewAuthorView').css("display", "none");
	}
})

$('#options').click(function(){
	console.log('options')
})

self.port.on('getURLResponse', function (url) {

})
