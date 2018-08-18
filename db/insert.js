var SQL = require('sql.js');

function insert(obj, db){
	var statement = "INSERT INTO visits (LastName, FirstName, Plate, VisitDate) VALUES (";
	statement += '"' + obj.fName + '", ';
	statement += '"' + obj.nname + '", ';
	statement += '"' + obj.plate + '", ';
	var timestamp = (new Date()).getTime();
	statement += timestamp + ");"
	db.run(statement);
}

module.exports = {insert: insert};