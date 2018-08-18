function compare(clear, stored){
	var cryptoHash = require('crypto-hashing')
	var buffer = new Buffer(clear);
	return cryptoHash('hash256', buffer).toString('hex').toUpperCase() == stored.toUpperCase();
}

module.exports = {
	compare: compare,
}