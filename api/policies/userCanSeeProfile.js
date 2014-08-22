/*
	peoples passing through are [Admin, Owner]
*/

module.exports = function(req, res, next){
	if(req.session.User){
		var hasToTakeCareOfID = req.param("id") ? true : false;
		var sessionUserMatchesId = req.session.User.id === req.param("id");
		var isAdmin = req.session.User.admin;
		
		if( !hasToTakeCareOfID || sessionUserMatchesId || isAdmin ){
			return next();
		}else{
			req.session.flash={
				err: {
					error: "noAdminError",
					data:null
				}
			};
			return res.redirect("/session/new");
		}
	}else{
		req.session.flash={
			err: {
				error: "noSessionError",
				data:null
			}
		};
		return res.redirect("/session/new");
	}
};