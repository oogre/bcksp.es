/*----------------------------------------*\
  bcksp.es - emails.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:24:27
  @Last Modified time: 2020-07-02 21:40:16
\*----------------------------------------*/

i18n.addTranslation('fr', "email", {
	
	posterConfirm : {
		subject : "votre commande d'un poster <i>bcksp.es</i>",
		content : 
			"Bonjour et merci.<br/>"+
			"Voici l'identifiant de votre commande : {$orderID}<br/>"+
			"Nous mettons tout en œuvre pour que celle-ci soit<br/>"+
			"produite dans les meilleurs délais.<br/>"
	},
	bookConfirm : {
		subject : "votre commande d'un livre <i>bcksp.es</i>",
		content : 
			"Bonjour et merci.<br/>"+
			"Voici l'identifiant de votre commande : {$orderID}<br/>"+
			"Nous metons tout en œuvre pour que celle-ci soit<br/>"+
			"produite dans les meilleurs délais.<br/>"
	},
	contactConfirm : {
		subject : "votre demande à bien été envoyée à <i>bcksp.es</i>",
		content : 
			"Bonjour et merci.<br/>"+
			"Voici l'identifiant de votre demande : {$orderID}<br/>"+
			"Nous metons tout en œuvre pour que celle-ci soit<br/>"+
			"traitée dans les meilleurs délais.<br/>"
	},
	resetPassword : {
		subject : "Redéfinnez votre mot de passe <i>bcksp.es</i>",
		content : 
			"Bonjour.<br/>"+
			"Voici un lien pour redéfinir votre mot de passe <i>bcksp.es</i> : <br/>"+
			"{$url}<br/>"
	},
	verifyEmail : {
		subject : "bcksp.es demande une confirmation de votre email",
		content : 
			"Bonjour.<br/>"+
			"Voici un lien pour confirmer votre adresse email : <br/>"+
			"{$url}<br/>"
	}
});
