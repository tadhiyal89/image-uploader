var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
app.set('view engine', 'jade');
app.set('views', __dirname+'/public');
app.use(express.static('public'));
app.get('/', function (req, res) {
	fs.realpath(__dirname, function(err, path) {
    if (err) {
        console.log(err);
     return;
    }
    
});	
	let imgArr=[];
	fs.readdir(__dirname+'/public/img', (err, files) => {
	imgArr=files;
	res.render( "landing",{data:imgArr});
	});
	
	
})

app.post('/fileupload', function (req, res) {
   var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
	  var oldpath = files.filetoupload.path;
      var newpath = 'public/img/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.redirect('/');
      });
})
})
var server = app.listen(8081, function () {
	
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})