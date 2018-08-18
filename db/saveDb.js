var fs = require('fs');
var SQL = require('sql.js');

function save(db){
	var data = db.export();
	var buffer = new Buffer(data);
	fs.writeFileSync("db.sqlite", buffer);
}

module.exports = {save: save};