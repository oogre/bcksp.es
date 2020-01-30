/*----------------------------------------*\
  bcksp.es - userprofile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:32:25
  @Last Modified time: 2020-01-30 12:56:25
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
					"This archive contains at most the last {$maxCounter} characters archived.",
			confirmation : {
				active : {
					title : "Publication in the public archive is activated",
					content : "publication in the public archive is authorized"	
				},
				disactive : {
					title : "Publication in the public archive is disactivated",
					content : "publication in the public archive is not authorized"	
				}
			}
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
			inactiveLabel : "blacklisted",
			confirmation : {
				add : {
					title : "Add a website to the blacklist",
					content : "the website : ({$URL}) has been add to the blacklist"	
				},
				remove : {
					title : "Remove a website to the blacklist",
					content : "the website : ({$URL}) has been removed from the blacklist"	
				}
			}
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
			},
			confirmation : {
				add : {
					title : "Addition of an inaccessible field",
					content : "the field : ({$field}) was added to the fields inaccessible by bcksp.es"	
				},
				remove : {
					title : "Removal of an accessible field",
					content : "the field : ({$field}) has been removed from the fields accessible by bcksp.es"	
				}
			}
		},
	},
	identification : {
		title : "identification",
		email : {
			label : "your email address",
			submit : "confirm",
			confirmation : {
				title : "Your new email address has been saved",
				content : "An email has been sent to this address to confirm the change."	
			}	
		},
		password : {
			label : "Reset your password",
			submit : "Change your password",
			confirmation : {
				title : "Your request has been registered",
				content : "An email has been sent to you to change your password."	
			}	
		}
	},
	danger : {
		title : "Hazardous area",
		deleteArchive : {
			label : "archive",
			submit : "delete your archive",
			confirmation : {
				title : "Your request has been registered",
				content : "Your archive is empty"	
			}	
		},
		deleteAccount : {
			label : "account",
			submit : "delete your account",
			confirmation : {
				title : "Your request has been registered",
				content : "Your account is deleted"	
			}	
		}
	}
});