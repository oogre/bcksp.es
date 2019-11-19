/*----------------------------------------*\
  bcksp.es - userprofile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:32:25
  @Last Modified time: 2019-11-19 17:54:10
\*----------------------------------------*/
i18n.addTranslation('fr', {
	userprofile : {
		title: "mon profile",
		archive : "archive",
		account : "compte",
		deleteArchive : "supprimer mon archive",
		deleteAccount : "supprimer mon compte",
		blacklist : {
			title : "sites web privés",
			desc : ""
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
				desc : "Signalez ici les champs de formulaire dans lesquels «bcksp.es» ne doit pas archiver vos ratures."
			},
			class : {
				title :  "class HTML privées",
				desc : "Pour plus de précision, signalez ici les class portées par les éléments HTML dans lesquels «bcksp.es» ne doit pas archiver vos ratures."
			}
		},
		userInfo : {
			email : "votre adresse eMail",
			resetpassword : "changer votre mot de passe",
			submit : "modifier"
		},

		publishToPublicFeed : {
			title : "publier vos suppressions dans l'archive publique",
			desc : "L'archive publique est annonyme, seul vous n'igniorez pas ce que vous y avez publié.</br>"+
					"Cette archive ne contient qu'au maximum les {$maxCounter} derniers caractères archivés."
		},
		whitelisted : "whitelisted",
		blacklisted : "blacklisted",
		yes : "oui",
		no : "non",
	}
});