/*
	peoples passing through are [Admin]
*/

module.exports = function(req, res, next){

	if(req.session.User && req.session.User.admin){
		return next();
	}
	else{
		req.session.flash={
			err: {
				error: "noAdminError",
				data:null
			}
		}
		res.redirect("/session/new");
		return;
	}
};