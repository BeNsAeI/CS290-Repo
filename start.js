var http = require('http');
const PORT=1852
function handleRequest(request, response)
{
	response.end('Primary server is up! ' + "\n");
}
var server = http.createServer(handleRequest);
server.listen(PORT, function()
{
	console.log("Server listening on: http://access.engr.oregonstate.edu:%s", PORT);
});
