/*----------------------------------------*\
  bcksp.es - about.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:28:49
  @Last Modified time: 2019-03-27 17:45:14
\*----------------------------------------*/
i18n.addTranslation('fr-FR', {
	about : {
		short : 	"<p>Lorsque l’on supprime du texte quand nous écrivons, une part de nous "+
					"s'envole avec les mots perdus.</p>"+
					""+
					"<p>«bcksp.es» fournit un outils permettant d'attraper ces poussières de pensée et les archive. "+
					"La vocation de «bcksp.es» est d'éditer votre archive de texte supprimé sous forme de livre intime.</p>"+
					""+
					"<p>Nous tirons notre nom de la touche «Backspace» du clavier informatique. "+
					"Celle-ci est située au-dessus de la touche «Enter». Elle est utilisée "+
					"pour effacer les derniers caractères saisis, ceux situés à gauche "+
					"du curseur d’écriture. C'est elle qui déclanche la mécanique d'archivage de «bcksp.es»</p>"+
					"<a href=\"{$about}\">en savoir plus</a></p>",
		
		title : "The deletion <br/>archivist manifesto",
		subtitle : "ABOUT THE PROJECT",
		long : [
			{
				content : [{
					text:"Chapeau"
					}
				],
			},
			{
				title:{
					value : "positionnement artistique",
					id : "art"
				},
				content : [{
					text: 	"Notre souhait est de mettre en lumière une part intime et obscure de l'Homme. "+
							"Il nous paraît qu'un des intérêts de ce projet tient dans l'observation "+
							"de la mécanique cérébrale travaillant pour former une communication par l'écrit. "+
							"La curiosité, la soif de découverte et de connaissance de soi sont des raisons "+
							"suffisantes pour se lancer dans l'aventure «bcksp.es».<br/>"+
							""+
							"«bcksp.es» est un dispositif permettant la microédition de livres touchant "+
							"à l’intime et l’absurde.<br/>"+
							""+
							"Il s’agit aussi d’un processus dévoilant des questions "+
							"relatives au «big data» et à la protection des données. Ces sujets sont fondamentaux "+
							"dans l’expérience numérique actuelle. Ce projet ouvre des questions et les poses "+
							"à une part de notre réalité encore obscure que seul l’art numérique peut éclairer."
					}
				],
			},
			{
				title:{
					value : "financement",
					id : "money"
				},
				content : [{
					text: 	"Lorsque vous participer à «bcksp.es» vous avez la possibilité d'acheter "+
							"l’impression de votre "+
							"archive sous forme d’un livre format poche. Le prix demandé par «bcksp.es» "+
							"pour l’impression et la livraison d’un livre permet à «bcksp.es» d’imprimer "+
							"deux exemplaires dont un est envoyé à l’utilisateur/auteur et l’autre est conservé "+
							"pour le projet. Cet exemplaire est susceptible d’être exposé dans un cadre artistique. "+
							"Il aura aussi la possibilité d'être vendu comme objet d'art.<br/>"+
							"<br/>"+
							"À l'heure actuelle, «bcksp.es» a bénéficié d'un financement de 3.000€ via la commision "+
							"des arts numériques de la Fédération Wallonie-Bruxelles."
					}
				],
			},
			{
				title:{
					value : "histoire",
					id : "hitory"
				},
				content : [{
					text: 	"Une version beta de «bcksp.es» a déjà vu le jour et a fonctionné durant toute "+
							"l’année 2014. La production de cette version beta autofinancée a répondu aux attentes "+
							"déterminées au préalable. Elle a hébergé le compte d’une centaine d’utilisateurs "+
							"dont 30% actifs. Plus d’un million de caractères ont pu être enregistrés pour "+
							"l’ensemble des utilisateurs.<br/>"+
							"La décision de relancer ce projet se base sur le fort potentiel de cette pièce "+
							"qui n’a selon moi pas encore été développé autant qu’il le mérite. "+
							"Les point cruciaux de la conception du projet sont :"+
							"<ul>"+
							"<li>Une optimisation des interactions entre les extentions et l'application web</li>"+
							"<li>Une amélioration de la sécurité lors du transport et du stockage des données</li>"+
							"<li>La mise en place du processus d’impression et de livraison des livres</li>"+
							"<li>L’actualisation du design du site web</li>"+
							"<li>L’optimisation des extensions de navigateur</li>"+
							"<li>La traduction en plusieurs langues du site web (FR EN NL)</li>"+
							"<li>La rédaction d’une charte relative aux droits d’auteur respectant les dernières législation européenne.</li>"+
							"</ul>"
					}
				],
			},
			{
				title:{
					value : "vie privée",
					id : "privacy"
				},
				content : [{
					text: 	"Nous vous garantissons que toutes les données sont transférées de façon cryptées via les protocolss HTTPS et WSS. "+
							"Sur nos serveurs, les archives sont cryptées au moyen de la librairie "+
							"<a target=\"_blank\" href=\"https://www.npmjs.com/package/crypto-js\">CryptoJS</a>, de l'algorithme "+
							"<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">AES</a> et "+
							"d'une clef sécurisée unique pour chaque utilisateur. "+
							"Ce triple verou vous garantit une des meilleurs sécurité accessible.<br/>"+
							"De notre point de vue, il va de soi que rien ne sera publié en votre nom sans votre accord explicite. "+
							"Il ne sera fait aucun usage de vos informations afin de réaliser des profils de consomateur, "+
							"nous ne croyons pas en les paradigmes qui font vivre les gros du web."
					
					}
				],
			},
			{
				title:{
					value : "droit d'auteur",
					id : "licence"
				},
				content : [{
					subtitle:"open source",
					text: 	"L'application web et des extensions sont open source, "+
							"vous pouvez trouver l'entièreté de nos algorithmes "+
							"sur <a target=\"_blank\" href=\"https://github.com/oogre/bcksp.es\">github</a>. "+
							"Ce code source est protégé par la licence <a target=\"_blank\" href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.fr\">CC-BY-SA 4.0</a>."
					},{
					subtitle:"les livres, les posters, ...",
					text: 	"Toutes les éditions produites par «bcksp.es» ont un status standard d'œuvre d'art."+
							"Toutes les éditions réalisées par «bcksp.es» ont comme co-auteur "+
							"Vincent Evrard (auteur de «bcksp.es») et l'utilisateur ayant produit le contenu imprimé. "+
							"Les auteurs/ayants droits seront toujours mentionné sur l'objet."
					
					},{
					subtitle:"vos données",
					text: 	"Les données que vous sotockez sur nos serveur, en tout temps, sont votre propriété."+
							"Vous avez la possibilité de consulter et de <a href=\"{$download}\">télécharger vos données</a> "+
							"sans frais et dans la forme que nous possédons. "+
							"Vous avez aussi à tout moment la possibilité de supprimer définitivement "+
							"toute donnée vous appartenant et étant présente sur nos serveurs. "+
							"Néanmoins, vous cédez à «bcksp.es» le droit d'imprimer "+
							"votre archive suivant le protocol décrit ICI."
					}
				]
			},
		]
	}
});