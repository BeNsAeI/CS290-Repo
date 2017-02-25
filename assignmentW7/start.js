function Server(req,res){
	res.render("server",curTime);
}
function reqGetHandler(req,res){
	var inBound = {};
	inBound.data = [];
	inBound.type = "Get";
	var time = (new Date(Date.now())).toLocaleTimeString('en-US');
	for(var query in req.query){
		var format = {'method':"Get",'name':query,'value':req.query[query],'time':time}
		inBound.data.push(format);
		log.push(format);
	}
	inBound.log = log;
	res.render('post',inBound);
}
function reqPostHandler(req,res){
	var inBound = {};
	inBound.data = [];
	inBound.type = "Post";
	var time = (new Date(Date.now())).toLocaleTimeString('en-US');
	for(query in req.body){
		var format = {'method':"Post",'name':query,'value':req.body[query],'time':time}
		inBound.data.push(format);
		log.push(format);
	}
	inBound.log = log;
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

// For logging purposes
var log = [];

// for form handling:
app.use(bodyParser.urlencoded({extended:false}));
// for json handling:
app.use(bodyParser.json());

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port', 1852);

app.get('/server',Server);

app.get('/',reqGetHandler);

app.post('/',reqPostHandler);

app.use(handler404);

app.use(handler500);

app.listen(app.get('port'), logOnSuccess);
