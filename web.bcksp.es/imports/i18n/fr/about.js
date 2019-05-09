/*----------------------------------------*\
  bcksp.es - about.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:28:49
  @Last Modified time: 2019-05-04 19:31:15
\*----------------------------------------*/
i18n.addTranslation('en', {
	about : {
		title : 	"the deletion archivist manifesto"
	}
});
i18n.addTranslation('fr', {
	about : {
					//"The deletion <br/>archivist manifesto",
		title : 	"manifest de l'archiviste des textes effacés",
		subtitle :  "le projet",
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
		long : [
			{
				content : [{
					text:	"Le souhait de bcksp.es est de mettre en lumière "+
							"une part intime et obscure de notre humanité. "+
							"Il nous paraît que l'archive et la lecture "+
							"de nos suppressions offre un point de vue singulier "+ 
							"sur la mécanique cérébrale travaillant pour former "+
							"nos communications écrites. "+
							"L'aventure «bcksp.es» est une porte vers un espace "+
							"intérieur où l'erreur et le doute sont vêtu des aprêts "+
							"d'une poésie brutaliste mais non moins dénuée de sens."
				}],
			}, {
				title:{
					value : "une maison d'édition",
					id : "edition"
				},
				content : [{
					text: 	"Nous avons conçu «bcksp.es» pour être un dispositif "+
							"d'édition de livres uniques. Le contenu de ces livres "+
							"est constitué du texte que vous supprimez après l'avoir écrit. "+
							"Le processus de rédaction de ces livres est rendu possible "+
							"par l'installation volontaire d'un logiciel de capture "+
							"du texte supprimé."
				},{
					subtitle:"votre archive",
					text :  "La constitution de votre archive est un processus lent, "+
							"durant lequel votre relation à l'écriture et particulièrement "+
							"à la touche backspace de votre clavier évoluera. "+
							"À certain moment méfiant, vous développerez des astuces "+
							"pour supprimer vos mots sans qu'ils ne soient capturé. "+
							"À d'autre vous serez confiant et ne penserez plus à nous. "+
							"C'est alors que les parties les plus belles et sensibles "+
							"de votre archive se constitueront."
				},{
					text :  "La taille maximum de votre archive est de 131.072 charactères "+
							"ce qui est nécéssaire pour la production d'un livre de 128 pages "+
							"au format poche. Lorsque votre archive atteint cette quantitée "+
							"Le processus d'impression à la demande s'active sur la page «souvenir». "+
							"Vous avez alors la possibilité de commander l'impression de votre livre. "
					}
				],
			}, {
				title:{
					value : "vie privée",
					id : "privacy"
				},
				content : [{
					text: 	"Nous vous garrantissons que dans notre projet, vous n'êtes pas "+
							"le produit. Bcksp.es à l'ambition de vous considérer comme auteur. "+
							"De notre point de vue, il va de soi que aucune donné stockée "+
							"sur notre service ne peut être publié sans votre accord explicite. "+
							"Il ne sera fait aucun usage de vos informations afin de réaliser des "+
							"profits à votre encontre. Nous croyons que les paradigmes qui font "+
							"vivre les gros du web sont inéquitable et donc périmé."+
							"À tout moment, vous êtes considéré par bcksp.es comme auteur, propriétaire "+
							"et pocesseur de vos suppressions même une fois archivée par nos serveurs. "+
							"Bcksp.es vous offre de ce fait les outils vous permettant d'en jouir "+
							"comme bon vous semble (suppression, diffusion, partage)."
				},{
					subtitle:"une histoire sensible",
					text :  "Il s’agit aussi d’un processus dévoilant des questions sensibles "+
							"relatives au «Big Data» et à la protection des données. "+
							"Nous ne prétendons pas apporter de solutions aux questions "+
							"relative à cette thématique. Nous faisons juste la proposition "+
							"d'un mode de fonctionnement basé sur les principes de paternité "+
							"et de cession des oeuvres d'art."
				},{
					text :  "Par ce projet, nous souhaitons livrer aux yeux du plus grand nombre, "+
							"une représentation de ce à quoi peut ressembler le flux de données"+
							"et de bruits que constitue ce fameux «Big Data» monstre informe de notre temps."
				}]
			}, { 
				title : {
					value : "sécurité",
					id : "security"
				},
				content : [{
					text : 	"Nous garantissons que tout est fait en notre pouvoir "+
							"pour sécurisé vos données de manière optimal."+
							"Tous les algorithmes nécéssaire à la capture, "+
							"au transfert et au stockage de vos données sont Open Source."+
							"De ce fait, nos activité sont donc potentiellement soumis "+
							"à un audit permanant de toutes personnes désireuses de s'assurer "+
							"de notre sérieux. Si une faille devait remontée via ce canal, "+
							"soyez certains qu'elle sera corrigée dans les plus brefs délais."
				},{
					subtitle:"crypté sur tout le chemin et au-delà",
					text :  "Toutes les données gérée par bcksp.es sont transférées de façon cryptées "+
							"via les protocolss HTTPS et WSS. Sur nos serveurs, les archives "+
							"sont cryptées au moyen de la librairie <a target=\"_blank\" href=\"https://www.npmjs.com/package/crypto-js\">CryptoJS</a>, "+
							"de l'algorithme <a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">AES</a> "+
							"et d'une clef sécurisée unique pour chaque utilisateur. "+
							"Ce triple verou vous garantit une des meilleurs sécurité accessible "+
							"à notre connaissance."
					}
				],
			}, {
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
				}]
			}, {
				title:{
					value : "financement",
					id : "money"
				},
				content : [{
					subtitle:"votre participation",
					text: 	"La capture et l'archivage de vos textes supprimés est gratuite. "+
							"Le montant qui vous est demandé pour impression de votre archive "+
							"correspond au budget nécéssaire pour la production de deux exemplaires, "+
							"une pour vous, une pour nous. Les frais relatif à l'envoi "+
							"sont égallement à votre charge."
				},{
					subtitle:"objet d'art",
					text :  "Nous avons pour ambition d'exposer l'exemplaire en notre possession "+
							"comme objet d'art. Au moment de la commande, vous avez l'oportunité "+
							"de faire jouer vos droit de paternité sur l'exemplaire en notre possession. "+
							"Cela en réclamant que l'exemplaire en notre possession ne puise qu'être vu, "+
							"ou qu'il puisse être lu, ou qu'il soit détruit par le feu, tout cela dans "+
							"un context d'exposition."
				},{
					text :  "En tant qu'objet d'art et à la condition que vous n'ayez pas réclamé "+
							"la destruction de l'exemplaire en notre possession, celui-ci aura le potentiel "+
							"d'être acheté pour ses valeurs de pièce d'art. Dans ce cas, vous serez convié "+
							"à participer à une négociation sur les conditions de vente, ainsi qu'à jouir "+
							"en tant que co-auteur d'une partie -à définir ensemble- des bénéfices engendré."
				},{
					text :  "Notre projet bcksp.es ne génère de bénéfice qu'au travers de la transformation "+
							"de votre archive en objet d'art, nous sommes donc financé par invitation payante "+
							"à exposer ces oeuvres et par la ventes de celle-ci en tant qu'objet d'art."
				},{
					subtitle:"subsides et donnations",
					text :  "De plus bcksp.es peut-être financé également au travers de dont ou de subsides. "+
							"Nous avons d'ores et déjà bénéficié d'un subside de 3.000€ via la Commision "+
							"des Arts Numériques de la Fédération Wallonie-Bruxelles."
					}
				],
			}, {
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
				}]
			}
		]
	}
});