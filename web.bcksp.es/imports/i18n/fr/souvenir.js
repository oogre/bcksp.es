/*----------------------------------------*\
  bcksp.es - souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:27:52
  @Last Modified time: 2020-07-02 21:41:09
\*----------------------------------------*/
i18n.addTranslation('fr', "souvenir", {
	title : 	"Rendez-vous à la boutique",
	title2 : 	"matérialiser vos ratures",
	subtitle : 	"la boutique",
	short : 	"Faites vivre <i>bcksp.es</i> et ses créateurs, en faisant produire via notre boutique "+
					"tout sorte de goodies personnalisés de vos meilleurs mots supprimés.",
	item : {
		download : {
			title : "télécharger mon archive",
			img : "/images/logo-animated.gif",
			description : 	"Nous pensons que toutes les données que vous "+
							"nous confiez vous appartiennent. Il est donc "+
							"radicalement important que vous puissiez les récupérer "+
							"sans aucun frais, ceci dans les meilleurs "+
							"conditions possible.",
			price : "gratuit",
			button : {
				create : "téléchargez votre archive"
			},
			file : {
				name : "archive.bcksp.es",
				content : "Date de création de votre archive : {$createdAt}\nDate de la dernière mise à jour de votre archive : {$updatedAt}\nQuantité de text de votre archive : {$count}\nVotre archive : \n{$content}"
			}
		},
		book : {
			title : "imprimer mon livre",
			img : "/images/logo-animated.gif",
			description : 	"C'est ici que <i>bcksp.es</i> prend tout son sens. "+
							"En participant à cette étape-ci que nous allons publier votre archive. "+
							"Cette publication ne sera imprimée qu'à deux exemplaires, un pour vous, un pour nous. "+
							"Le contenu de votre archive sera supprimé de nos serveurs après imprimession.",
			button : {
				create : "créez votre livre",
				continue : "valider ce livre",
				buy : "commander votre livre"
			},
			price : "à partir de {$amount}€<br/><small>frais de port inclus</small>",
			form : {
				author : {
					label : "nom de l'auteur",
					placeholder : "anonyme"
				},
				finishing : {
					label : "finitions",
					BASIC : {
						label : "livre de poche",
						description : "couverture souple - dos carré collé",
					},
					PREMIUM : {
						label : "livre d'art",
						description : "couverture rigide - relié à la main",
					}
				},
				licence : {
					label : "le second exemplaire de votre livre est ",
					OPEN_ACCESS : {
						label : "accès libre",
						description : "sous licence CC-BY-NC-SA"
					},
					CLOSE_ACCESS : {
						label : "contenu inaccessible",
							description : "cellé et sous licence CC-BY-NC-SA"
					},
					NO_ACCESS : {
						label : "aucun accès possible",
						description : "détruit après fabrication"
					},
				}
			}
		},
		poster : {
			title : "créer un poster",
			img : "/images/souvenirs/poster.jpg",
			description : "Soutenez notre démarche en achetant un poster personalisé. "+
						  "Il vous suffit de selectionner le texte dans votre archive "+
						  "pour le voir apparaitre sur votre poster. "+
						  "Il sera imprimé sur un papier premium format 594x841mm.",
			button : {
				create : "créez votre poster",
				continue : "valider ce poster",
				buy : "commander votre poster"
			},
			price : "{$amount}€<br/><small>frais de port inclus</small>",
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
					"nous accédons aux forces en présence."
		},
		contact : {
			title : "Une demande particulière?",
			img : "/images/souvenirs/contact.1.jpg",
			description : "",
			button : "envoyer votre demande",
			form : {
				email : {
					label : "Votre adresse email"
				},
				subject : {
					label : "Sujet de votre demande"
				},
				message : {
					label : "Votre demande"
				}
			}
		},
		almanach : {
			title : "enchérir sur un almanach",
			img : "/images/logo-animated.gif",
			description : "",
			button : "passer commande",
			price : "...€"
		}
	}
});