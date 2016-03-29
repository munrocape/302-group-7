
self.port.on(HOME, function (storage) {

	for (let i = 0; i < storage.length; i++){
		if ($('#' + i).val() === 'null' || $('#' + i).val() === '') {
			continue;
		}
		//Not proud of this, but cannot find another way
		let html = '<div class="project"><h6 class="projectName" id=' + i + '>' + storage[i].name + '</h6>' +
							 '<a class="projectLinks" href="#" id="reference_' + i + '">Cite</a></div>'
		$('#projects').append(html)

		$('#reference_' + i).click(function() {
			//reference handler for +
			console.log(i)
		})
	}
});

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
