/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"index" : function(req, res){
		return res.view();
	},
	"lang" : function(req, res){ 
		if(req.headers.referer && req.headers.referer != req.protocol+'://'+req.headers.host+"/"){
			return res.redirect(req.headers.referer.replace(/\/fr|\/en/, "/"+req.session.locale));
		}else{
			console.log(req.session.locale);
			return res.redirect("/"+req.session.locale);
		}
	},
	"faq" : function(req, res){
		return res.view();
	},
	"privacy" : function(req, res){
		return res.view();
	},
  	"terms" : function(req, res){
		return res.view();
	}
};

