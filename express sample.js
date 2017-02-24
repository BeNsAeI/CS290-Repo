function Home(req,res){
	res.type("text/plain");
	res.send("This is the homepage!");
}
function Admin(req,res){
	res.type("text/plain");
	res.send("This is for administrative purposes only.");
}
function handler404(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
}
function handler500(err,req,res,next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.send('500 - Server Error');
}
function logOnSuccess(){
	console.log("Express started on http:\/\/localhost:" + app.get('port') + '; press Ctrl-C to terminate.');
}

var express = require('express');

var app = express();

app.set('port', 1852);

app.get('/',Home);

app.get('/admin',Admin)

app.use(handler404);

app.use(handler500);

app.listen(app.get('port'), logOnSuccess);
