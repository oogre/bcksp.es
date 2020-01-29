/*----------------------------------------*\
  bcksp.es - errors.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:24:27
  @Last Modified time: 2020-01-27 10:37:04
\*----------------------------------------*/
i18n.addTranslation('fr', "errors", {
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
	author : {
		"max-string" : "nous attendons que votre nom d'auteur compte au maximum {$length} charactèrs",	
	},
	passwordConfirm : {
		required : "nous souhaitons que vous confirmiez votre mot de passe",
		"no-match" : "nous observons que votre mot de passe et votre confirmation ne colle pas",
	},
	login : {
		required : "nous avons besoin que vous soyez connecté pour procéder à cette opération"
	},
	role : {
		required : "vous n'avez pas le droit requis pour accéder à cette resource. ({$role})"
	},
	url : {
		"not-a-string" : "nous ne parvenons pas à reconnaître cette URL"
	},
	device : {
		required : "nous avons besoin de l'identifiant de votre extension pour procéder à cette opération",
		"not-a-string" : "nous attendons que l'identifiant de votre extension soit du texte",
		"no-match" : "nous avons besoin que l'identifiant de votre extension soit reconnu (votre id : {$deviceId})",
	},
	lang : {
		"not-recognize": "nous ne connaissons pas la langue requise, il semble y avoir un problème",
	},
	type : {
		"not-a-function" : "nous avons besoin que cette donnée soit une fonction : '{$value}'",
		"not-recognize": "nous ne comprenons pas ces informations, il semble y avoir un problème",
		"not-a-string" : "nous avons besoin que cette donnée soit du texte : '{$value}'",
		"not-a-number" : "nous avons besoin que cette donnée soit un nombre",
		"greater-than" : "{$a} est plus petit que {$b}",
	},
	default : {
		required : "nous avons besoin de cette information",
		"remove-disabled" : "Cette donnée ne peux être supprimée"
	}
});