var mysql = require('mysql');

function getPool(){
	var pool = mysql.createPool({
		host  : 'localhost',
		user  : 'root',
		password: 'H@02122705029e',
		database: 'test'
	});
//	module.exports.pool = pool;
	return pool;
}
module.exports.getPool = getPool;
