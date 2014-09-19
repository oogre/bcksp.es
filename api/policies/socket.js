/*
	Only socket request pass through
*/

module.exports = function(req, res, next){
	if(req.isSocket){
		return next();
	}
	else{
		res.send(403);
	}
};