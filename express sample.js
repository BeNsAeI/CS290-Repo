function Home(req,res){
	res.render("home");
}
function Admin(req,res){
	res.type("text/plain");
	res.send("This is for administrative purposes only.");
}
function Server(req,res){
	res.render("server",curTime);
}
function Time(req,res){
	curTime.time = (new Date(Date.now())).toLocaleTimeString('en-US');
	res.render("time",curTime)
}
function reqGetHandler(req,res){
	var inBound = {};
	inBound.data = [];
	for(var query in req.query){
		inBound.data.push({'name':query,'value':req.query[query]});
	}
	res.render('servant',inBound);
}
function reqPostHandler(req,res){
	var inBound = {};
	inBound.data = [];
	for(query in req.body){
		inBound.data.push({'name':query,'value':req.body[query]});
	}
	res.render('post',inBound);
	console.log(inBound);
	console.log(req.body);
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

var curTime={};
curTime.serverStartTime = (new Date(Date.now())).toLocaleTimeString('en-US');

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var app = express();

// for form handling:
app.use(bodyParser.urlencoded({extended:false}));
// for json handling:
app.use(bodyParser.json());

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port', 1852);

app.get('/home',Home);

app.get('/admin',Admin);

app.get('/time',Time);

app.get('/server',Server);

app.get('/servant',reqGetHandler);

app.post('/post',reqPostHandler);

app.use(handler404);

app.use(handler500);

app.listen(app.get('port'), logOnSuccess);
