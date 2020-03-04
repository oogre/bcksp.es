/*----------------------------------------*\
  bcksp.es - userprofile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:32:25
  @Last Modified time: 2020-03-04 19:37:21
\*----------------------------------------*/
i18n.addTranslation('fr', "userprofile", {
	title: "mon profile",
	settings : {
		title : "vie privée",
		publishToPublicFeed : {
			title : "publier vos suppressions dans l'archive publique",
			inactiveLabel : "non",
			activeLabel : "oui",
			desc : "L'archive publique est anonyme, seul vous n'ignorez pas ce que vous y avez publié.</br>"+
					"Cette archive ne contient qu'au maximum les {$maxCounter} derniers caractères archivés."
		},
		blacklist : {
			title : "sites web privés",
			desc : "",
			activeLabel : "whitelisted",
			inactiveLabel : "blacklisted",
			label : {
				activeLabel : "Archive sur ce site : activée",
				inactiveLabel : "Archive sur ce site : désactivée"
			}
		},
		noBlacklist : {
			title : "aucun site web privé",
			desc :  "Cliquez sur l'icone <img rel=\"icon\" src=\"/images/favicons/favicon-16x16.png\"> dans votre browser toolbar </br>"+
					"selectionnez «Blacklisted» pour signaler à «bcksp.es» de ne pas archiver </br>"+
					"vos ratrues sur le site web courrant."
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
			}
		},
	},
	identification : {
		title : "identification",
		email : {
			label : "votre adresse eMail",
			submit : "valider"
		},
		password : {
			label : "changer votre mot de passe",
			submit : "modifier votre mot de passe",
		}
	},
	danger : {
		title : "Espace dangereux",
		deleteArchive : {
			label : "archive",
			submit : "effacer votre archive"
		},
		deleteAccount : {
			label : "compte",
			submit : "supprimer votre compte"
		}
	}
});