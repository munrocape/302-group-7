
$("#home").click(function() {
	$("#main").css("display", "block");
	$("#projectView").css("display", "none");
})

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
	$("#main").css("display", "none")
	$("#projectView").css("display", "block")
	$(".projectName").html(project.name)
	let html = ''
	for (let i = 0; i < project.sources.length; i++) {
		console.log(project.sources[i])
		html += '<li class="collection-item"><div><a href="sourceView.html">' + project.sources[i].name + '</a><a href="#!" class="secondary-content"><i class="material-icons">add</i>|<i class="material-icons">delete</i></a></div></li>'
	}
	$('.collection').html(html)

})

$("#submitNewProject").click(function(){
	if ( $.trim( $('#project_name').val() ) == '' ) {
		console.log('Blank input.');
		$("#project_name").html("Please enter a project name")

	}
	else {
		self.port.emit(ADD_NEW_PROJECT, $("#project_name").val())
		$("html").load('dropdown.html')
		self.port.emit(SEND_STORAGE, HOME)
	}
})

$('#options').click(function(){
	console.log('options')
})

$('#home').click(function(){
	self.port.emit(SEND_STORAGE, HOME)
})

self.port.on('getURLResponse', function (url) {

})
