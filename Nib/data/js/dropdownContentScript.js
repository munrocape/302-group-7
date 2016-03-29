
self.port.on(HOME, function (storage) {

	for (let i = 0; i < storage.length; i++){
		if ($('#' + i).val() === 'null' || $('#' + i).val() === '') {
			continue;
		}
		console.log('Appending projejct: ' + i + ', ' + storage[i].name);
		//TODO: href should be custom to each project, maybe use a hleper function here. issue #35
		let html = '<div class="project"><a href="projectView.html"><h6 class="projectName" id=' + i + '>' + storage[i].name + '</h6></a></div>'
		$('#projects').append(html)

		$('#' + i).click(function() {
			// Handler for project i
			self.port.emit(SEND_STORAGE, SELECT_PROJECT, i)
		})
	}
});
//Listens when user selects a project
self.port.on(SELECT_PROJECT, function(project) {
	console.log(project)
})

$("#submitNewProject").click(function(){
	self.port.emit(ADD_NEW_PROJECT, $("#project_name").val())
	$("html").load('dropdown.html')
	self.port.emit(SEND_STORAGE, HOME)
})

$('#options').click(function(){
	console.log('options')
})

$('#home').click(function(){
	self.port.emit(SEND_STORAGE, HOME)
})

self.port.on('getURLResponse', function (url) {

})
