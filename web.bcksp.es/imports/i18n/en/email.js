/*----------------------------------------*\
  bcksp.es - emails.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:24:27
  @Last Modified time: 2020-01-30 13:01:04
\*----------------------------------------*/

i18n.addTranslation('en', "email", {
	posterConfirm : {
		subject : "your order for a bcksp.es poster",
		content : 
			"Hello and thank you.<br/>"+
			"Here is the identifier of your order : {$orderID}<br/>"+
			"We make every effort to ensure<br/>"+
			"that it is produced as soon as possible.<br/>"
	},
	bookConfirm : {
		subject : "your order for a bcksp.es book",
		content : 
			"Hello and thank you.<br/>"+
			"Here is the identifier of your order : {$orderID}<br/>"+
			"We make every effort to ensure<br/>"+
			"that it is produced as soon as possible.<br/>"
	},
	contactConfirm : {
		subject : "your request has been sent to bcksp.es",
		content : 
			"Hello and thank you.<br/>"+
			"Here is the identifier of your request : {$orderID}<br/>"+
			"We make every effort to ensure<br/>"+
			"that it is produced as soon as possible.<br/>"
	},
	resetPassword : {
		subject : "Reset your bcksp.es password",
		content : 
			"Hello.<br/>"+
			"Here is a link to reset your bcksp.es password : <br/>"+
			"{$url}<br/>"
	},
	verifyEmail : {
		subject : "bcksp.es requests confirmation of your email",
		content : 
			"Hello.<br/>"+
			"Here is a link to confirm your email address : <br/>"+
			"{$url}<br/>"
	}
});
