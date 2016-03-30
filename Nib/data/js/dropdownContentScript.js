//When Nib is clicked, it redirects to home, hiding all other divs
$("#home").click(function() {
	self.port.emit(SEND_STORAGE, HOME)
	$("#main").css("display", "block");
	$("#projectView").css("display", "none");
	$("#sourceView").css("display", "none");
	$("#createNewProjectView").css("display", "none");
	$("#createNewSourceView").css("display", "none");

})
//In home click 'add new project' (The plus sign)
$("#addNewProject").click(function(){
	$("#main").css("display", "none");
	$("#createNewProjectView").css("display", "block");
})

//Event for when someone wants to go home or initial page
self.port.on(HOME, function (storage) {
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
	console.log(project.name + " selected")
	//Main display is gone, and project view is block
	$("#main").css("display", "none")
	$("#projectView").css("display", "block")

	$(".projectName").html(project.name)

	for (let i = 0; i < project.sources.length; i++) {
		console.log($("#source_" + i).val())
		if ($("#source_" + i).val() === 'null' || $("#source_" + i).val() === '')
			continue;

		let html = '<li class="collection-item"><div><a href="#" id="source_' + i +'">' + project.sources[i].name + '</a><a href="#!" class="secondary-content"><i class="material-icons">add</i>|<i class="material-icons">delete</i></a></div></li>'
		console.log("appending #source_" + i)

		$('.collection').append(html)
		$('#source_' + i).click(function(){
			//Listener for specific source
			console.log(i)
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

$('#options').click(function(){
	console.log('options')
})

self.port.on('getURLResponse', function (url) {

})
