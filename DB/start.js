function resetTable(req,res,next){
	var context = {};
	pool.query("DROP TABLE IF EXISTS workouts", function(err){
		var createString = "CREATE TABLE workouts("+
		"id INT PRIMARY KEY AUTO_INCREMENT,"+
		"name VARCHAR(255) NOT NULL,"+
		"reps INT,"+
		"weight INT,"+
		"date DATE,"+
		"lbs BOOLEAN)";
		pool.query(createString, function(err){
			res.writeHead(302, {'Location': '/'});
			res.end();
		})
	});
	results.lastStatus = false;
};
function Server(req,res){
	res.render("server",curTime);
}
function reqGetHandler(req,res){
	var inBound = {};
	inBound.data = [];
	log = [];
	inBound.type = "Get";
	var time = (new Date(Date.now())).toLocaleTimeString('en-US');
	for(var query in req.query){
		var format = {'method':"Get",'name':query,'value':req.query[query],'time':time}
		inBound.data.push(format);
		log.push(format);
	}
	inBound.log = log;
	if(inBound.log[inBound.log.length-1].value=="add")
		pool.query(insert(inBound.log[0].value,inBound.log[1].value,inBound.log[2].value,inBound.log[3].value,inBound.log[4].value),[mysql.query],DBresult);
	if(inBound.log[inBound.log.length-1].value=="delete")
		pool.query(del(inBound.log[inBound.log.length-2].value),[mysql.query],DBresult);
	res.render('post',inBound);
}
function reqPostHandler(req,res){
	var inBound = {};
	inBound.data = [];
	inBound.type = "Post";
	log = [];
	var time = (new Date(Date.now())).toLocaleTimeString('en-US');
	for(query in req.body){
		var format = {'method':"Post",'name':query,'value':req.body[query],'time':time}
		inBound.data.push(format);
		log.push(format);
	}
	inBound.log = log;
	console.log("***");
	if(inBound.log[inBound.log.length-1].value=="add")
		pool.query(insert(inBound.log[0].value,inBound.log[1].value,inBound.log[2].value,inBound.log[3].value,inBound.log[4].value),[mysql.query],DBresult);
	if(inBound.log[inBound.log.length-1].value=="delete")
		pool.query(del(inBound.log[inBound.log.length-2].value),[mysql.query],DBresult);
	if(inBound.log[inBound.log.length-1].value=="edit")
		pool.query(edit(inBound.log[0].value,inBound.log[1].value,inBound.log[2].value,inBound.log[3].value,inBound.log[4].value,inBound.log[5].value),[mysql.query],DBresult);
	console.log("***");
	res.render('post',inBound);
	//console.log(inBound);
	//console.log(req.body);
}
function Query(req,res,next){
	pool.query("SELECT * FROM workouts;",[mysql.query],DBresult);
	console.log("QUERY: "+results.lastStatus+".");
	while(!results.lastStatus || (!results.table[0] && results.table.length != 0))
	{
		res.writeHead(302, {'Location': '/'});
		res.end();
	}
//	res.render('DB',results);
	res.render('home',results);
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
	return results;
}
function dbClear(req,res,next){
	pool.query("DELETE FROM workouts WHERE name=\"server\";",[mysql.query],DBresult);
	pool.query("SELECT * FROM workouts;",[mysql.query],DBresult);
	results.lastStatus = false;
	res.writeHead(302, {'Location': '/'});
	res.end();
}
function DBConnection(err,con){
	if(err)
	{
		console.log(err);
		console.log("Error: Could not connect to DB. (1)");
		return;
	}
	con.query("SELECT * FROM workouts");
	if(err)
	{
		con.release();
		console.log(err);
		console.log("Error: Could not connect to DB. (2)");
		return;
	}
//	con.query("insert into workouts (`name`) values (\"server\");");
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
function insert(_name,_reps,_weight,_date,_lbs){
	var query = "insert into workouts (`name`,`reps`,`weight`,`date`,`lbs`) values ("+
		"\""+_name+"\""+", "+
		_reps+", "+
		_weight+", "+
		"\'"+_date+"\', "+
		_lbs+
		");";
	console.log("query is: "+query);
	return query;
}
function del(ID){
	var query = "DELETE FROM workouts WHERE id="+ID+";"
	console.log("query is: "+query);
	return query;
}
function edit(_name,_reps,_weight,_date,_lbs,_id){
	var query = "UPDATE workouts SET `name`=\""+_name+"\",`reps`="+_reps+",`weight`="+_weight+",`date`=\'"+_date+"\',`lbs`="+_lbs+" WHERE id="+_id+";";
	console.log("query is: "+query);
	return query;
}
var curTime={};
curTime.serverStartTime = (new Date(Date.now())).toLocaleTimeString('en-US');

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbcon = require('./dbcon.js');

var app = express();

// For logging purposes
var log = [];

//For DB
var pool = dbcon.getPool();
pool.getConnection(DBConnection);

var results={}

// for form handling:
app.use(bodyParser.urlencoded({extended:false}));
// for json handling:
app.use(bodyParser.json());

app.engine('handlebars',handlebars.engine);

app.set('view engine','handlebars');

app.set('port', 1852);

app.get('/reset-table',resetTable);

app.get('/server',Server);

app.get('/insert',reqGetHandler);

app.post('/insert',reqPostHandler);

app.get('/',Query);

app.get('/DB',Query);

app.get('/clear',dbClear);

app.use(handler404);

app.use(handler500);

app.listen(app.get('port'), logOnSuccess);
