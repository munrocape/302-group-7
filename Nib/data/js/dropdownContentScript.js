// Initially hide all divs except for main/home
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
	goHome();
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

active_project_id = null;
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

active_source_id = null;
active_source = null;
function viewSource(source) {
	active_source_id = source.source_id;
	active_source = source;
	hideAll();
	console.log(source.name);
	$('#editSourceName').val(source.name);
	$('#editSourceYear').val(source.year);
	$('#editSourceTitle').val(source.title_of_source);
	$('#editSourceURL').val(source.link);
	$('#editSourceView').css('display', 'block');
}

$('#editSourceSave').click(function(){
	new_source = {
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
			self.port.emit(SEND_STORAGE, SELECT_PROJECT, i)
		})

	}
});

//Listens when user selects a project
self.port.on(SELECT_PROJECT, function(project) {
	hideAll();
	console.log('project id: ' + project.project_id);
	active_project_id = project.project_id;
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

		let html = '<li class="collection-item"><div><a href="#" id="source_' + i +'">' + project.sources[i].name + '</a><a href="#!" class="secondary-content"><i class="material-icons">add</i>|<i class="material-icons">delete</i></a></div></li>'
		console.log("appending source " + project.sources[i].name )
		console.log("appending #source_" + i)

		$('.collection').append(html)
		$('#source_' + i).click(function(){
			//Listener for specific source
			viewSource(project.sources[i]);
		})
	}
})

$("#submitNewProject").click(function(){
	if ($.trim( $('#newProjectName').val() ) === '' ) {
		console.log('Blank input.');
		$(".projectName").html("Please enter a project name")
	}
	else {
		self.port.emit(ADD_NEW_PROJECT, $("#newProjectName").val())
		self.port.emit(SEND_STORAGE, HOME)
		$('#main').css("display", "block");
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
		self.port.on(SOURCE_CREATED, function (source) {
			viewSource(source);
		});
		//console.log(newName);
		//$('#newProjectName').val('');
		//createSource('#newSourceName');
	}
})

$("#submitNewAuthor").click(function(){
	if ($.trim( $('#newAuthorName').val() ) === '' ) {
		console.log('Blank input.');
		$(".authorName").html("Please enter an Author's name")
	}
	else {
		self.port.emit(ADD_NEW_PROJECT, $("#newAuthorName").val())
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
