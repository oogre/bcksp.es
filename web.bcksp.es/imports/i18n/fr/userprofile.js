/*----------------------------------------*\
  bcksp.es - userprofile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:32:25
  @Last Modified time: 2020-01-27 10:17:01
\*----------------------------------------*/
i18n.addTranslation('fr', "userprofile", {
	title: "mon profile",
	settings : {
		title : "vie privée",
		publishToPublicFeed : {
			title : "publier vos suppressions dans l'archive publique",
			inactiveLabel : "non",
			activeLabel : "oui",
			desc : "L'archive publique est annonyme, seul vous n'igniorez pas ce que vous y avez publié.</br>"+
					"Cette archive ne contient qu'au maximum les {$maxCounter} derniers caractères archivés.",
			confirmation : {
				active : {
					title : "Publication dans l'archive publique activée",
					content : "la publication dans l'archive publique est autorisée"	
				},
				disactive : {
					title : "Publication dans l'archive publique désactivée",
					content : "la publication dans l'archive publique n'est pas autorisée"	
				}
			}
		},
		language : {
			confirmation : {
				title : "Mise à jour de votre langue.",
				content : "La langue de l'interface du site est liée à l'interface de vos extension"	
			}
		},
		blacklist : {
			title : "sites web privés",
			desc : "",
			activeLabel : "whitelisted",
			inactiveLabel : "blacklisted",
			confirmation : {
				add : {
					title : "Ajout d'un site à la blacklist",
					content : "le site : ({$URL}) a été ajouté à la blacklist"	
				},
				remove : {
					title : "Retrait d'un site à la blacklist",
					content : "le site : ({$URL}) a été retiré de la blacklist"	
				}
			}
		},
		noBlacklist : {
			title : "aucun site web privé",
			desc :  "Cliquez sur l'icone <img rel=\"icon\" src=\"/images/favicons/favicon-16x16.png\"> dans votre browser toolbar </br>"+
					"pour signaler à «bcksp.es» de ne pas archiver </br>"+
					"de vos ratrues sur le site affiché."
		},
		blindfield : {
			type : {
				title : "champs de formulaire privés",
				desc : "Signalez ici les champs de formulaire dans lesquels «bcksp.es» ne doit pas archiver vos ratures.",
				activeLabel : "whitelisted",
				inactiveLabel : "blacklisted"
			},
			class : {
				title :  "class HTML privées",
				desc : "Pour plus de précision, signalez ici les class portées par les éléments HTML dans lesquels «bcksp.es» ne doit pas archiver vos ratures.",
				activeLabel : "whitelisted",
				inactiveLabel : "blacklisted"
			},
			confirmation : {
				add : {
					title : "Ajout d'un champ inaccessible",
					content : "le champ : ({$field}) a été ajouté aux champs inaccessible par bcksp.es"	
				},
				remove : {
					title : "Ajout d'un champ accessible",
					content : "le champ : ({$field}) a été ajouté aux champs accessible par bcksp.es"	
				}
			}
		},
	},
	identification : {
		title : "identification",
		email : {
			label : "votre adresse eMail",
			submit : "valider",
			confirmation : {
				title : "Votre nouvelle adresse email a été enregistrée",
				content : "Un email vous a été envoyé à cette adresse pour confirmer le changement."	
			}	
		},
		password : {
			label : "changer votre mot de passe",
			submit : "modifier votre mot de passe",
			confirmation : {
				title : "Votre demande à été enregistrée",
				content : "Un email vous a été envoyé pour proceder au changement de mot de passe."	
			}	
		}
	},
	danger : {
		title : "Espace dangereux",
		deleteArchive : {
			label : "archive",
			submit : "effacer votre archive",
			confirmation : {
				title : "Votre demande à été enregistrée",
				content : "Votre archive est vide"	
			}	
		},
		deleteAccount : {
			label : "compte",
			submit : "supprimer votre compte",
			confirmation : {
				title : "Votre demande à été enregistrée",
				content : "Votre compte est supprimé"	
			}	
		}
	}
});