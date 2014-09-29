// api/policies/localize.js

module.exports = function(req, res, next) {

	if(req.param('lang') && sails.config.i18n.locales.indexOf(req.param('lang').toLowerCase())>-1){
		req.locale = req.param('lang').toLowerCase() || sails.config.i18n.defaultLocale;
		req.session.locale = req.locale;
	}else if(req.session.locale){
		req.locale = req.session.locale;
	}
	else{
		req.locale = sails.config.i18n.defaultLocale;
		req.session.locale = req.locale;
	}
   next();   
};