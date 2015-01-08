module.exports = function api(status, data) {
	var res = this.res;
	res.status(status)
	return res.json({
		data: data
	});
};