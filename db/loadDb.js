var fs = require('fs');
var SQL = require('sql.js');

function getDb(){
	if (fs.existsSync("db.sqlite")) {
		var filebuffer = fs.readFileSync('db.sqlite');
		var db = new SQL.Database(filebuffer);
		return db;
	}	
	//else
	var db = new SQL.Database();
	var sqlstr = "CREATE TABLE visits (ID integer NOT NULL PRIMARY KEY, LastName TEXT, FirstName TEXT, Plate TEXT, VisitDate integer);"
	db.run(sqlstr);
	return db;
}

module.exports = {
	load: getDb,
}