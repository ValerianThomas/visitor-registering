function singleToHtml(obj){
	return "<tr><td>"+obj[0]+"</td><td>"+obj[1]+"</td><td>"+obj[2]+"</td><td>"+obj[3]+"</td><td>"+new Date(obj[4])+"</td></tr>";
}

module.exports = {
	single: singleToHtml, 
}