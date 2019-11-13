/*----------------------------------------*\
  bcksp.es - errors.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:24:27
  @Last Modified time: 2019-06-07 16:39:49
\*----------------------------------------*/
i18n.addTranslation('fr', {
	errors : {
		server : {
			offline : "le serveur est injoignable"
		},
		email : {
			required : "nous avons besoin de votre adresse eMail pour vous identifier",
			"not-a-string" : "nous attendons que votre eMail soit du texte",
			"not-an-email" : "votre adresse eMail ne nous paraît pas être une adresse eMail",
			"no-match" : "nous ne connaissons pas votre adresse eMail",
			"already-exists" : "nous connaissons déjà cet eMail",
		},
		password : {
			wrong : "ce mot de passe est incorrect",
			required : "nous avons besoin de votre mot de passe pour sécuriser votre archive",
			"not-a-string" : "nous attendons que votre mot de passe soit du texte",
			"min-string" : "nous attendons que votre mot de passe compte au minimum {$length} charactèrs",
			"max-string" : "nous attendons que votre mot de passe compte au maximum {$length} charactèrs",
		},
		passwordConfirm : {
			required : "nous souhaitons que vous confirmiez votre mot de passe",
			"no-match" : "nous observons que votre mot de passe et votre confirmation ne colle pas",
		},
		login : {
			required : "nous avons besoin que vous soyez connecté pour procéder à cette opération"
		},
		url : {
			"not-a-string" : "nous ne parvenons pas à reconnaître cette URL"
		},
		device : {
			required : "nous avons besoin de l'identifiant de votre extension pour procéder à cette opération",
			"not-a-string" : "nous attendons que l'identifiant de votre extension soit du texte",
			"no-match" : "nous avons besoin que l'identifiant de votre extension soit reconnu (votre id : {$deviceId})",
		},
		type : {
			"not-a-function" : "nous avons besoin que cette donnée soit une fonction : '{$value}'",
			"not-recognize": "nous ne comprenons pas ces informations, il semble y avoir un problème",
			"not-a-string" : "nous avons besoin que cette donnée soit du texte : '{$value}'",
			"not-a-number" : "nous avons besoin que cette donnée soit un nombre",
			"greater-than" : "{$a} est plus petit que {$b}",
		}
	}
});