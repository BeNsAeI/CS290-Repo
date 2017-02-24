function run(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end("Potato is a fruit!");
}

var http = require('http');

http.createServer(run).listen(1852);

console.log('server started.');
