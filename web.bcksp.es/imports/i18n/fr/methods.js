/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:36:54
  @Last Modified time: 2021-03-02 22:42:14
\*----------------------------------------*/
i18n.addTranslation('fr', "methods", {
	user : {
		HardDisconnect : {
			success : {
				title : "vous voilà déconnecté",
				content : ""
			}
		},
		language : {
			success : {
				title : "Mise à jour de votre langue.",
				content : "La langue de l'interface du site est liée à l'interface de vos extension"	
			}
		},
		resetPassword : {
			success : {
				title : "Votre demande à été enregistrée",
				content : "Un email vous a été envoyé pour proceder au changement de mot de passe."	
			}	
		},
		updateEmail : {
			success : {
				title : "Votre nouvelle adresse email a été enregistrée",
				content : "Un email vous a été envoyé à cette adresse pour confirmer le changement."	
			}	
		},
		deleteAccount : {
			success : {
				title : "Votre demande à été enregistrée",
				content : "Votre compte est supprimé"	
			}
		},
		deleteArchive : {
			success : {
				title : "Votre demande à été enregistrée",
				content : "Votre archive est vide"	
			}
		}	
	},
	settings : {
		publicFeed : {
			success : {
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
		blacklist : {
			add : {
				success : {
					title : "Ajout d'un site à la blacklist",
					content : "le site : ({$URL}) a été ajouté à la blacklist"	
				}
			},
			remove : {
				success : {
					title : "Retrait d'un site à la blacklist",
					content : "le site : ({$URL}) a été retiré de la blacklist"	
				}
			}
		},
		blindfield : {
			add : {
				success : {
					title : "Ajout d'un champ inaccessible",
					content : "bcksp.es est maintenant aveugle au contenu des champs : {$field}"	
				}
			},	
			remove : {
				success : {
					title : "Ajout d'un champ accessible",
					content : "bcksp.es est maintenant à l'écoute de vos suppressions dans les champs : {$field}"	
				}
			}
		}
	},
	archive : {
		download : {
			success : {
				title : "Merci!",
				content : "Votre demande de téléchargement à été prise en compte"
			}
		},
		edit : {
			success : {
				title : "Merci!",
				content : "Le contenu de votre archive à été mis-à-jour"
			}
		}
	},
	languages : {
		translation : {
			add : {
				success : {
					title : "Merci!",
					content : "Vos traductions ont été enregistrées"
				}
			}
		}
	},
	souvenir : {
		poster : {
			order : {
				success : {
					title : "Merci!",
					content : "Votre commande à pour identifiant : {$orderID}"
				}
			}
		},
		book : {
			order : {
				success : {
					title : "Merci!",
					content : "Votre commande à pour identifiant : {$orderID}"
				}
			}
		},
		contact : {
			order : {
				success : {
					title : "Merci!",
					content : "Votre demande à été envoyé"
				}
			}
		}
	}
});