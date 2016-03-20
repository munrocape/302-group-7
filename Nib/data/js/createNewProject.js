let ss = require("sdk/simple-storage");

$('#submit').click(function(){
  console.log("here")
  ss.storage.data.push({
    name: $('#project_name').val().toString(),
    sources: []
  })
})
