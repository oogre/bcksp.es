/*----------------------------------------*\
  bcksp.es - emails.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:24:27
  @Last Modified time: 2019-04-07 21:09:13
\*----------------------------------------*/

i18n.addTranslation('fr-FR', {
	email : {
		posterConfirm : {
			subject : "votre commande d'un livre bcksp.es",
			content : 
				"Bonjour et merci.<br/>"+
				"Voici l'identifiant de votre commande : {$orderID}<br/>"+
				"Nous metons tout en œuvre pour que celle-ci soit<br/>"+
				"produite dans les meilleurs délais.<br/>"
		},
		bookConfirm : {
			subject : "votre commande d'un livre bcksp.es",
			content : 
				"Bonjour et merci.<br/>"+
				"Voici l'identifiant de votre commande : {$orderID}<br/>"+
				"Nous metons tout en œuvre pour que celle-ci soit<br/>"+
				"produite dans les meilleurs délais.<br/>"
		},
		contactConfirm : {
			subject : "votre demande à bien été envoyée à bcksp.es",
			content : 
				"Bonjour et merci.<br/>"+
				"Voici l'identifiant de votre demande : {$orderID}<br/>"+
				"Nous metons tout en œuvre pour que celle-ci soit<br/>"+
				"traitée dans les meilleurs délais.<br/>"
		},
		resetPassword : {
			subject : "Redéfinnez votre mot de passe bcksp.es",
			content : 
				"Bonjour.<br/>"+
				"Voici un lien pour redéfinir votre mot de passe bcksp.es : <br/>"+
				"{$url}<br/>"
		},
		verifyEmail : {
			subject : "bcksp.es demande une confirmation de votre email",
			content : 
				"Bonjour.<br/>"+
				"Voici un lien pour confirmer votre adresse email : <br/>"+
				"{$url}<br/>"
		}
	}
});
