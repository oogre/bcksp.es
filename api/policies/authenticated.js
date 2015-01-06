/*
	peoples passing through are [User]
*/

module.exports = function(req, res, next){
	if(req.session.authenticated){
		return next();
	}
	else{
		return res.redirect("/session/new");
	}
};