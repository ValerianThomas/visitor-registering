var SQL = require('sql.js');

function query(start, end, db){
	return db.exec("SELECT * FROM visits WHERE VisitDate BETWEEN " + start + " AND " + end);
}

module.exports = {
	query: query,
}