/*----------------------------------------*\
  bcksp.es - souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:27:52
  @Last Modified time: 2019-03-04 21:24:08
\*----------------------------------------*/
i18n.addTranslation('fr-FR', {
	souvenir : {
		title : 	"Rendez-vous à la boutique",
		title2 : 	"matérialiser votre mémoire",
		short : 	"Faites vivre ce projet, en faisant produire via notre boutique \
					tout sorte de goodies affichants vos meilleurs mots supprimés.",
		delivery : {
			label : "adresse de livraison",
			form : {
				email : {
					label : "adress email"
				},
				adress : {
					fullname : {
						label : "nom complet"
					},
					fulladdress : {
						label : "adresse et numéros"
					},
					city : {
						label : "ville"
					},
					state : {
						label : "état"
					},
					zip : {
						label : "code postal"
					},
					country : {
						label : "pays"
					}
				}
			}
		},
		item : {
			download : {
				title : "télécharger mon archive",
				img : "/images/logo-animated.gif",
				description : 	"Nous pensons chez «bcksp.es» que toutes les données que vous nous confiez vous appartiennent.\
								Il est donc radicalement important de notre point de vue que vous puissiez récupérer <b>sans aucun frais</b>\
								l'entièreté des ces données.<br/>\
								<small><u>PS</u> : Pour supprimer tout ou en partie votre archive, rendez-vous dans votre flux privé, \
								selectionnez ce que vous voulez supprimer et appuyez sur votre touche backspace.</small>",
				price : "gratuit",
				button : "télécharger",
				file : {
					name : "archive.bcksp.es",
					content : "Date de création de votre archive : {$createdAt}\nDate de la dernière mise à jour de votre archive : {$updatedAt}\nQuantité de text de votre archive : {$count}\nVotre archive : \n{$content}"
				}
			},
			book : {
				title : "imprimer mon livre",
				img : "/images/logo-animated.gif",
				description : 	"C'est ici que «bcksp.es» prend tout son sens. \
								En participant à cette étape-ci que nous allons publier votre archive. \
								Cette publication ne sera imprimée qu'à deux exemplaires, un pour vous, un pour nous.\
								Le contenu de votre archive sera supprimé de nos serveurs après imprimession.",
				button : "passer commande",
				price : "à partir de ... €",
				form : {
					author : {
						label : "nom de l'auteur à imprimer sur la couverture",
						placeholder : "anonyme"
					},
					finishing : {
						label : "finition",
						basic : "livre de poche : production de base",
						premium : "livre d'art : relié à la main"
					}
				},
				confirmation : {
					result : "Merci!<br/>"+
							 "Un email de confirmation vous a été envoyé!<br/>"+
							 "Voici l'identifiant de votre commande : {$orderID}<br/>"
				}
			},

			poster : {
				title : "créer un poster",
				img : "/images/logo-animated.gif",
				description : "",
				button : "passer commande",
				price : "...€",
				text : 	"L'effondrement, la divination,<br/>"+
						"cet instant fragile et ténu qui<br/>"+
						"en lui seul révèle tout de quelqu'un.<br/>"+
						"Ce moment qui voit notre libre arbitre<br/>"+
						"s'auto-détruire, avant de renaître<br/>"+
						"en un changement d'avis.<br/>"+
						"Bcksp.es capture cette chose<br/>"+
						"qui nous rend si fragile dans l'écriture.<br/>"+
						"<br/>"+
						"Ces mots, ces blocs<br/>"+
						"sont les osselets divinatoires<br/>"+
						"que l'on jette et nous observons<br/>"+
						"les mouvements, les positions d'arrêt.<br/>"+
						"De là, s'ouvre à nous un point de vue,<br/>"+
						"nous accédons aux forces en présence.",
				confirmation : {
					result : "Merci!<br/>"+
							 "Un email de confirmation vous a été envoyé!<br/>"+
							 "Voici l'identifiant de votre commande : {$orderID}<br/>"
				}
			},

			contact : {
				title : "demande particulière",
				img : "/images/logo-animated.gif",
				description : "",
				button : "nous contacter"
			},
			
			almanach : {
				title : "enchérir sur un almanach",
				img : "/images/logo-animated.gif",
				description : "",
				button : "passer commande",
				price : "...€"
			}
		}
	}
});