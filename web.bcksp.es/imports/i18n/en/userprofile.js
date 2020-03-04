/*----------------------------------------*\
  bcksp.es - userprofile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:32:25
  @Last Modified time: 2020-03-04 19:43:03
\*----------------------------------------*/
i18n.addTranslation('en', "userprofile", {
	title: "my profile",
	settings : {
		title : "privacy",
		publishToPublicFeed : {
			title : "publish your deletions in the public archive",
			inactiveLabel : "no",
			activeLabel : "yes",
			desc : "The public archive is anonymous, only you are aware of what you have published there.</br>"+
					"This archive contains at most the last {$maxCounter} characters archived."
		},
		language : {
			confirmation : {
				title : "Update your language.",
				content : "The language of the website interface is linked to the interface of your extensions"	
			}
		},
		blacklist : {
			title : "private websites",
			desc : "",
			activeLabel : "whitelisted",
			inactiveLabel : "blacklisted"
		},
		noBlacklist : {
			title : "no private website",
			desc :  "Click on the icon <img rel=\"icon\" src=\"/images/favicons/favicon-16x16.png\"> in your browser toolbar </br>"+
					"to tell bcksp.es not to archive </br>"+
					"your mistakes on the displayed site."
		},
		blindfield : {
			type : {
				title : "private form fields",
				desc : "Point out here the form fields in which bcksp.es should not archive your erasures.",
				activeLabel : "whitelisted",
				inactiveLabel : "blacklisted"
			},
			class : {
				title :  "private HTML class",
				desc : "For more precision, indicate here the classes carried by the HTML elements in which bcksp.es should not archive your erasures.",
				activeLabel : "whitelisted",
				inactiveLabel : "blacklisted"
			}
		},
	},
	identification : {
		title : "identification",
		email : {
			label : "your email address",
			submit : "confirm"
		},
		password : {
			label : "Reset your password",
			submit : "Change your password"
		}
	},
	danger : {
		title : "Hazardous area",
		deleteArchive : {
			label : "archive",
			submit : "delete your archive"
		},
		deleteAccount : {
			label : "account",
			submit : "delete your account"
		}
	}
});