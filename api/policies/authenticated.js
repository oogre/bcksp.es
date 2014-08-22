/*
	peoples passing through are [User]
*/

module.exports = function(req, res, next){
	if(req.session.authenticated){
		return next();
	}
	else{
		res.send(403);
	}
};