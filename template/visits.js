const single = require("./singleVisit").single;

function visits(arr){
	var ret = '<table id="result" class="responsive-table"><tr><th>id</th><th>Lastname</th><th>Firstname</th><th>Plate</th><th>DateTime</th></tr>';
	for(var i = 0 ; i < arr.length ; ++i){
		ret += single(arr[i]);
	}
	ret += '</table>';
	return ret;
}

module.exports = {visits: visits};