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
function Query(req,res,next){
	pool.query("SELECT * FROM webdev",[mysql.query],DBresult);
	console.log("QUERY: "+results.lastStatus);
	res.render('DB',results);
}
function DBresult(err, result){
	var lastStatus = "-";
	if(err)
	{
		console.log("ERROR: "+err);
		var lastStatus = "<font color=\"red\">Offline</font>";
		return;
	}
	lastStatus = "<font color=\"green\">Online</font>";
	results.table = result;
	results.lastStatus = lastStatus;
	console.log(results.table[0].firstname);
}
function DBConnection(err,con){
	if(err)
	{
		console.log(err);
		console.log("Error: Could not connect to DB. (1)");
		return;
	}
	con.query("SELECT * FROM webdev");
	if(err)
	{
		con.release();
		console.log(err);
		console.log("Error: Could not connect to DB. (2)");
		return;
	}
	con.query("insert into webdev (`firstname`,`lastname`) values (\"server\",\"started\");");
	console.log("DB was successful!");
	con.release();
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
var mysql = require('mysql');

var app = express();

// For logging purposes
var log = [];

//For DB
var pool = mysql.createPool({
	host  : 'localhost',
	user  : 'root',
	password: 'H@02122705029e',
	database: 'test'
});
pool.getConnection(DBConnection);

var results={}

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

app.get('/DB',Query);

app.use(handler404);

app.use(handler500);

app.listen(app.get('port'), logOnSuccess);
