/*----------------------------------------*\
  bcksp.es - fr.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-14 07:48:09
  @Last Modified time: 2019-01-29 19:19:13
\*----------------------------------------*/
i18n.addTranslation('fr-FR', {
	baseline: "nous archivons vos backspace",
	archive : {
		counter : {
			title : "volume de votre archive",
			now : "vous avez {$count} charactèrs enregistré"
		},
		public : {
			button : "flux public"
		},
		private : {
			button : "flux privé"
		},
		fullscreen : {
			button : "plein écran"
		}
	},
	extension : {
		login : {
			call : {
				login : "Identifiez-vous en clickant sur l'extension"
			}
		}
	},
	errors : {
		email : {
			required : "nous avons besoin de votre adresse eMail pour vous identifier",
			"not-a-string" : "nous attendons que votre eMail soit du texte",
			"not-an-email" : "votre adresse eMail ne nous paraît pas être une adresse eMail",
			"no-match" : "nous ne connaissons pas votre adresse eMail",
			"already-exists" : "nous connaissons déjà cet eMail",
		},
		password : {
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
			"not-a-string" : "nous avons besoin que cette donnée soit du texte",
			"not-a-number" : "nous avons besoin que cette donnée soit un nombre",
			"greater-than" : "{$a} est plus petit que {$b}",
		}
	},
	userprofile : {
		archive : "archive",
		account : "compte",
		deleteArchive : "supprimer mon archive",
		deleteAccount : "supprimer mon compte",
		blacklist : "liste des sites web privé",
		blindfield : {
			type : "liste des champs de formulaire privé",
			class : "liste des class privé"
		},
	},
	methods : {
		user : {
			resetPassword : {
				success : "nous vous envoyons aussi vite que possible un email pour redéfinir votre mot de passe"
			},
			updateEmail : {
				success : "nous avons mis votre compte à jour"
			}
		}
	},
	utilities : {
		needConfirmation : "cette action est irrévocable, confirmez-vous?",	
	},
	forms : {
		logout : "déconnection",
		email : "votre adresse eMail",
		password : "votre nouveau mot de passe",
		passwordConfirm : "confirmez votre nouveau mot de passe",
		submit : {
			setPassword : "enregistrez votre nouveau mot de passe"
		},
		success : {
			resetPassword : "votre nouveau mot de passe est enregistré. Vous pouvez vous reconnecter au moyen de l'extension de navigateur web."
		}
	},
	menus: {
		open : "ouvrir&nbsp;le&nbsp;menu",
		about : "à&nbsp;propos",
		profile : "vos&nbsp;paramètres",
		contact : "nous&nbsp;contacter",
		authors : "auteurs",
		souvenir : "boutique&nbsp;souvenir",
		download : "téléchargement",
		supportedBy : "Partenaires",
		helpUs : "nous&nbsp;avons&nbsp;besoin&nbsp;de&nbsp;vous",
		share : "faites&nbsp;nous&nbsp;connaîte"
	},
	howto:{
		step : {
			download : {
				title : "télécharchez l'extension",
				desc : "Nous utilisons une extension de navigateur web pour collecter les morceaux de texte que vous supprimez. \
						Participez à ce projet en installer une de nos extensions."
			},
			connect : {
				title : "identifiez-vous",
				desc : "Créez votre archive et connectez-vous au moyen de votre extension. Nous ne prenons que le minimum pour vous identifier, \
						afin de sécuriser vos données au maximum. Seul une adresse email et un mot de passe nous suffisent."
			},
			continue : {
				title : "continuez vie d'internaute",
				desc : "Naviguez, envoyez des eMails, discutez avec vos amis, bref oubliez nous. \
						Durant ce temps en arrière plan, votre extention collecte et archive de façon cryptée\
						tout le texte qui disparait lorsque vous appuiez sur la touche backspace."
			},
			souvenir : {
				title : "visitez notre boutique souvenir",
				desc : 	"Lorsque votre archive est pleine, vous êtes invité à commander votre livre d'archive intime via notre boutique.\
						D'ici là, n'hésitez pas à y faire un tour à tout moment. Vous pouvez y trouver des goodies \
						personnalisés des meilleurs mots de «bcksp.es»."
			}
		}
	},
	privacy : {
		title : 	"vie privée",
		short : 	"<p>L'aspect privé de vos donnés est un sujet que nous prennons réellement au sérieux.\
					C'est pour cela que le code source des processus de collecte et de stockage \
					sont Open Source. Il est donc soumis à un audit permanant de toute personne le souhaitant.\
					Vous trouverez tout cela sur <a href=\"https://github.com/oogre/bcksp.es\">github</a>.</p>\
					\
					<p>Nous vous garantissons que toutes les données sont transférées de façon cryptées via les protocolss HTTPS et WSS. \
					Les archives sont cryptées au moyen de la librairie <a href=\"https://www.npmjs.com/package/crypto-js\">CryptoJS</a>, de l'algorithme <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">AES</a> et \
					d'une clef sécurisée unique pour chaque utilisateur.\
					Ce triple verou vous garantit une des meilleurs sécurité à l'heure actuelle.</p>\
					\
					<p>De notre point de vue, il va de soi que rien ne sera publié en votre nom sans votre accord explicite.\
					Il ne sera fait aucun usage de vos informations afin de réaliser des profils de consomateur,\
					nous ne croyons pas en les paradigmes qui font vivre les gros du web.</p>\
					\
					<p>Nous avons créé «Bcksp.es» dans un cadre de recherche artisitque, notre vision est que le public fasse l'œuvre. \
					Ici, vous êtes plus qu'un utilisateur, vous êtes auteur!</p>",
	},
	souvenir : {
		title : 	"Rendez-vous à la boutique",
		short : 	"Faites vivre ce projet, en faisant produire via notre boutique \
					tout sorte de goodies affichants vos meilleurs mots supprimés.",
		item : {
			download : {
				badge : "gratuit",
				title : "télécharger mon archive",
				img : "/images/logo-animated.gif",
				description : 	"Nous pensons chez «bcksp.es» que toutes les données que vous nous confiez vous appartiennent.\
								Il est donc radicalement important de notre point de vue que vous puissiez récupérer <b>sans aucun frais</b>\
								l'entièreté des ces données.<br/>\
								<small><u>PS</u> : Pour supprimer tout ou en partie votre archive, rendez-vous dans votre flux privé, \
								selectionnez ce que vous voulez supprimer et appuyez sur votre touche backspace.</small>",
				button : "télécharger",
				file : {
					name : "archive.bcksp.es",
					content : "Date de création de votre archive : {$createdAt}\nDate de la dernière mise à jour de votre archive : {$updatedAt}\nQuantité de text de votre archive : {$count}\nVotre archive : \n{$content}"
				}
			},
			book : {
				title : "commander une édition de mon archive",
				img : "/images/logo-animated.gif",
				description : 	"C'est ici que «bcksp.es» prend tout son sens. \
								En participant à cette étape-ci que nous allons publier votre archive. \
								Cette publication ne sera imprimée qu'à deux exemplaires, un pour vous, un pour nous.\
								Le contenu de votre archive sera supprimé de nos serveurs après imprimession.",
				button : "passer commande",
				price : "à partir de ... €",
				countdown : "encore {$count} chraractères avant impression de votre livre",
				form : {
					author : {
						label : "nom de l'auteur à imprimer sur la couverture",
						placeholder : "anonyme"
					},
					finishing : {
						label : "finition",
						basic : "livre de poche : production de base",
						premium : "livre d'art : relié à la main"
					},
					adress : {
						name : {
							label : "nom",
							placeholder : "nom"
						},
						street : {
							label : "rue",
							placeholder : "rue"
						},
						number : {
							label : "numéros",
							placeholder : "numéros"
						},
						city : {
							label : "ville",
							placeholder : "ville"
						},
						zip : {
							label : "code postal",
							placeholder : "code postal"
						},
						country : {
							label : "pays",
							placeholder : "pays"
						},
						delivery : {
							label : "adresse de livraison",
						},
						billing : {
							label : "adresse de facturation",
							VAT : {
								label : "numéros de TVA",
								placeholder : "numéros de TVA"
							},
							sameForDelivery : {
								label : "Utiliser l'adresse de facturation pour la livraison",
							}
						}
					}
				}
			},
			poster : {
				title : "commander un poster",
				img : "/images/logo-animated.gif",
				description : "",
				button : "passer commande",
				price : "...€"
			},
			custom : {
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
	},
	about : {
		title : 	"à propos",
		short : 	"QUEL FINANCEMENT !!!<p>Nous tirons notre nom de la touche «Backspace» du clavier informatique. \
					Celle-ci est située au-dessus de la touche «Enter». Elle est utilisée \
					pour effacer les derniers caractères saisis, ceux situés à gauche \
					du curseur d’écriture. </p>\
					\
					<p>Lorsque l’on utilise la touche «Backspace», une part de nous \
					s'envole avec les mots perdus. \
					«bcksp.es» capture ces poussières de pensée et les archive. </br/>\
					«bcksp.es» à pour vocation d'éditer votre archive de texte supprimé sous forme de livre intime.\
					Nous vous proposons aussi d'imprimer les meilleurs passages de votre archive sur plusieurs supports \
					que vous retrouverez dans notre <a href=\"#\">boutique souvenir</a>.</p>",
		link : "en savoir plus",
		long : 		"<p>Notre souhait est de mettre en lumière une part intime et obscure de l'Homme. \
					Il nous paraît qu'un des intérêts de ce projet tient dans l'observation \
					de la mécanique cérébrale travaillant pour former une communication par l'écrit. \
					La curiosité, la soif de découverte et de connaissance de soi sont des raisons \
					suffisantes pour se lancer dans l'aventure «bcksp.es». </p>\
					\
					<p>«bcksp.es» est un dispositif permettant la microédition de livres touchant \
					à l’intime et l’absurde. \
					\
					Il s’agit aussi d’un processus dévoilant des questions \
					relatives au «big data» et à la protection des données. Ces sujets sont fondamentaux \
					dans l’expérience numérique actuelle. Ce projet ouvre des questions et les poses \
					à une part de notre réalité encore obscure que seul l’art numérique peut éclairer.</p>\
					\
					<p>Lorsque vous participer à «bcksp.es» vous avez la possibilité d'acheter \
					l’impression de votre \
					archive sous forme d’un livre format poche. Le prix demandé par «bcksp.es» \
					pour l’impression et la livraison d’un livre permet à «bcksp.es» d’imprimer \
					deux exemplaires dont un est envoyé à l’utilisateur/auteur et l’autre est conservé \
					pour le projet, cet exemplaire est susceptible d’être montré dans le cadre artistique \
					d’une exposition de la collection de livres édités par «bcksp.es».</p>\
					\
					<p>Une version beta de «bcksp.es» a déjà vu le jour et a fonctionné durant toute\
					l’année 2014. La production de cette version beta autofinancée a répondu aux attentes \
					déterminées au préalable. Elle a hébergé le compte d’une centaine d’utilisateurs \
					dont 30% actifs. Plus d’un million de caractères ont pu être enregistrés pour \
					l’ensemble des utilisateurs.</p>\
					\
					<p>La décision de relancer ce projet se base sur le fort potentiel de cette pièce \
					qui n’a selon moi pas encore été développé autant qu’il le mérite. \
					Les point cruciaux de la conception du projet sont :<br/>\
					· Une meilleurs intégration des interactions entre les extentions et l'application web<br/>\
					· Une amélioration de la sécurité lors du transport et du stockage des données<br/>\
					· Le processus d’impression et de livraison des livres<br/>\
					· L’actualisation du design du site web <br/>\
					· L’optimisation des extensions de navigateur<br/>\
					· La traduction en plusieurs langues du site web (FR EN NL)|<br/>\
					· La rédaction d’une charte relative aux droits d’auteur respectant les dernières législation européenne.<br/>\
					</p>"
	},
	artists: {
		title : "auteurs",
		list : [{
			name : "Vincent Evrard",
			bio : 	"<p>Celui-ci vit et travaille à Bruxelles. \
					Il enseigne la programmation à l’ESA St Luc - Bruxelles \
					et donne un cours d'image numérique à l'ESA St Luc - Liège.\
					Il est titulaire d’un Baccalauréat en Design Graphique de l'ESA St Luc - Liège \
					et d’un Master en en Art Numérique et Typographie de l'ERG - Bruxelles.\
					Il navigue entre projets personnels, collaborations ou assistance d’artistes.\
					Depuis 2012, il programme les Arduinos des installations de l’artiste Felix Luque.\
					En 2015, il participe à la résidence Vice Versa au Canada qui donna naissance \
					au projet Lighthouses en collaboration avec Alice Jarry. \
					Exposé à Mons en 2015, à Milan en 2016 et à Paris en 2017.</p>\
					\
					<p>Depuis plusieurs années, il est performer vidéo dans le groupe électro \
					acide analogique Osica. Il est aussi performer dans le groupe Visuel Hors Service, \
					apparu à de multiples reprises sur les écrans du Dour Festival. \
					Dans ces projets vidéo, il cultive une approche des machines vidéo pures analogiques \
					en contraste complet avec l'abstraction des processeurs compilant ses algorithmes.</p>",
			links : ["http://ogre.be"]
		}]
	},
	press : {
		title : "press",
		testimonies : [
			"trop cool",
			"vraiment bien"
		],
		callToAction : {
			button : "contact us",
			message : "kljghasdglkjdshlksghj gsd"
		}
	},
	mail : {
		resetPassword : {
			subject : "Password reset to bcksp.es",
			message : "Hey! Reset your password by following this link: [URL]"	
		}
	}
});