/*----------------------------------------*\
  bcksp.es - about.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:28:49
  @Last Modified time: 2019-11-19 18:26:02
\*----------------------------------------*/

i18n.addTranslation('fr', {
	about : {
					//"The deletion <br/>archivist manifesto",
		title : 	"manifest de l'archiviste des ratures",
		short : 	"<p>Les outils numériques ont fait émerger dans la pratique de l'écriture "+
					"de multiples erreurs, hésitations, reformulations et corrections. "+
					"Celles-çi, bien que plus nombreuses qu'à l'époque de la plume, "+
					"se font aussi plus discrète. Lorsque nous restons face à la scène, rien ne dépasse "+
					"la performance est sans accroche, lisse et sans sueur.</p>"+
					""+
					"<p><h6><i>Lorsque je supprime du texte, une part de moi s'envole avec les mots perdus.</i></h6><p>"+
					"<ul>"+
					"<li><strong>«bcksp.es»</strong> tire son nom de la touche «Backspace» du clavier informatique. "+
					"Celle-ci est située au-dessus de la touche «Enter». Elle est utilisée "+
					"pour effacer les derniers caractères saisis, ceux situés à gauche "+
					"du curseur d’écriture. C'est elle qui déclanche la mécanique d'archivage de «bcksp.es»</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> archive les mots que vous supprimez en appuyant sur la touche «Backspace».</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> est une porte vers un espace intérieur où l'erreur et le doute "+
					"sont vêtu des aprêts d'une poésie brutaliste non moins dénuée de sens.</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> organise votre archive dans l'ordre dans laquelle elle s'écrit, erreur après erreur.</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> considére ses utilisateurs comme auteurs, "+
					"en partageant les bénéfices généré par l'exploitation de leur archive.</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> chiffre vos données sur tout le chemin et au-delà.</li>"+
					""+
					"<li><strong>«bcksp.es»</strong> vous propose d'éditer le livre de votre archive.</li>"+
					""+
					"</ul>"+
					"<a href=\"/about\">pour en savoir plus</a>",
		long : [
			{
				content : [{
					text:	"<p>Jusque l'invention des caratères typographiques mobiles "+
							"et du clavier, l'écriture était exclusivement une activité de dessin. "+
							"Celle-ci ayant comme but de représenter la pensée des hommes et des femmes. "+
							"Au travers de cette technique passait quelque chose de plus que les conceptes "+
							"véhiculés par le vocabulaire, la grammaire et toutes ces choses que l'on peu appelé langue."+
							"</p>"+
							"<p>Par le biai d'outils techniques, nous avons fait comme si le schéma de Claude Shannon "+
							"était capable de synthétiser la communication écrite entre humain. "+
							"De ce fait, nous nous sommes fait déposséder de nos ratures. "+
							"Nous avons perdu le droit d'imaginer ce que l'autre/auteur voulait "+
							"nous dire avant de se rétracter en gommant, en barrant, en recouvrant, en arrachant "+
							"ce mystérieux mot. Nous n'avons plus la liberté d'entrer dans son esprit pour "+
							"y découvrir ce mot masqué, avec plus ou moins d'adresse"+
							"</p>"+
							"<p>De plus, ces objets techniques ont fait émerger dans la pratique de l'écriture "+
							"de multiples erreurs, hésitations, reformulations et corrections. "+
							"Celles-çi, bien que plus nombreuses qu'à l'époque de la plume, "+
							"se sont aussi faites radicalement plus discrète. Lorsque nous restons face à la scène, "+
							"rien ne dépasse, la performance est sans accroche, lisse et sans sueur. "+
							"Mais lorsqu'il s'agit de rédiger sur un clavier le doute, les cocquilles et l'auto-sensure "+
							"dirigent nos doigts sans tarder vers cette fameuse touche «Backspace»."+
							"</p>"+
							"<p>Le souhait de «bcksp.es» est de mettre en lumière "+
							"une part devenue intime et obscure de notre humanité. "+
							"Il nous paraît que l'archivage et la lecture "+
							"de nos ratures offre un point de vue singulier "+ 
							"sur la mécanique cérébrale travaillant pour former "+
							"la communication écrite."+
							"</p>"+
							"<p>«Bcksp.es» ouvre une porte vers un espace "+
							"intérieur où l'erreur et le doute sont vêtu des aprêts "+
							"d'une poésie brutaliste mais non moins dénuée de sens.</p>"
				}],
			}, {
				title:{
					value : "une maison d'édition",
					id : "edition"
				},
				content : [{
					text: 	"<p>«Bcksp.es» est concu pour être un dispositif "+
							"d'édition de livres intimes. Le contenu de ces livres "+
							"est constitué du texte que vous supprimez durant "+
							"votre navigation sur internet. Votre archive compile "+
							"dans l'ordre d'arrivée chaque caratères que vous supprimez "+
							"en appuyant sur la touche backspace."+
							"</p>"
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
					text :  "La taille maximum de votre archive est de {$bookMaxChar} charactères "+
							"ce qui est nécéssaire pour la production d'un livre de {$bookMaxPage} pages "+
							"au format poche. Lorsque votre archive atteint cette quantitée "+
							"Le processus d'impression à la demande s'active sur la page «souvenir». "+
							"Nous vous tiendrons informé de cet événement par un eMail. "+
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
							"sur notre service ne peut être vendue sans votre accord explicite. "+
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
							"Nous ne prétendons pas apporter de solutions à ces questions. "+
							"Tout du moins, «Bcksp.es» propose de prendre un point de vue "+
							"sur un de vos flux de données privées. Cela afin de montrer, de rendre sensible "+
							"donc pensable ce monstre informe mal perçue, angoissant ou simplement ignorée."
				}]
			}, { 
				title : {
					value : "sécurité",
					id : "security"
				},
				content : [{
					text : 	"Nous garantissons que tout est fait "+
							"pour sécurisé vos données de manière optimal. "+
							"Tous les algorithmes nécéssaire à la capture, "+
							"au transfert et au stockage de vos données sont Open Source. "+
							"De ce fait, nos activité sont donc potentiellement soumis "+
							"à un audit permanant de toutes personnes désireuses de s'assurer "+
							"de notre sérieux. Si une faille devait être signalée, "+
							"soyez certains qu'elle sera corrigée dans les plus brefs délais."
				},{
					subtitle:"les données sont chiffrées sur tout leur chemin et au-delà",
					text :  "Toutes les données gérée par bcksp.es sont transférées de façon chiffré "+
							"via les protocols HTTPS et WSS. Sur nos serveurs, les archives "+
							"sont chiffrées par l'implémentation de l'algorithme <a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">AES</a>, "+
							"de la librairie <a target=\"_blank\" href=\"https://www.npmjs.com/package/crypto-js\">CryptoJS</a>. "+
							"De plus, chaque archive est sécurisée par une clef unique. "+
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
					subtitle:"Licence",
					text: 	"Le code source de l'application web et des extensions est sous licence «creative commons» <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" rel=\"nofollow\"><img src=\"https://camo.githubusercontent.com/6dcc300ab83c479af6c1c1f004b6f9dad77e7736/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d434325323042592d2d5341253230342e302d6c69676874677265792e737667\" alt=\"License: CC BY-SA 4.0\" data-canonical-src=\"https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg\" style=\"max-width:100%;\"></a>."+
							"<p>Cela signifie que vous êtes autorisé à :</br>"+
    						"<ul>"+
    						"<li><strong>Partager</strong> — copier, distribuer et communiquer le matériel par tous moyens et sous tous formats</li>"+
							"<li><strong>Adapter</strong> — remixer, transformer et créer à partir du matériel pour toute utilisation, y compris commerciale.</li>"+
							"</ul></p>"+
    						"<p>L'Offrant ne peut retirer les autorisations concédées par la licence tant que vous appliquez les termes de cette licence.</br>"+
							"Selon les conditions suivantes :</br>"+
    						"<ul>"+
    						"<li><strong>Attribution</strong> — Vous devez créditer l'œuvre, intégrer un lien vers la licence et indiquer si des modifications ont été effectuées à l'œuvre. Vous devez indiquer ces informations par tous les moyens raisonnables, sans toutefois suggérer que l'Offrant vous soutient ou soutient la façon dont vous avez utilisé son œuvre.</li>"+
    						"<li><strong>Partage dans les Mêmes Conditions</strong> — Dans le cas où vous effectuez un remix, que vous transformez, ou créez à partir du matériel composant l'œuvre originale, vous devez diffuser l'œuvre modifiée dans les même conditions, c'est à dire avec la même licence avec laquelle l'œuvre originale a été diffusée.</li>"+
    						"<li><strong>Pas de restrictions complémentaires</strong> — Vous n'êtes pas autorisé à appliquer des conditions légales ou des mesures techniques qui restreindraient légalement autrui à utiliser l'œuvre dans les conditions décrites par la licence."+
    						"</ul></p>"+
    						"Vous pouvez trouver le code source de «bcksp.es» "+
							"sur notre page <a target=\"_blank\" href=\"https://github.com/oogre/bcksp.es\">github</a>."
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
							"à exposer ces œuvres et par la ventes de celle-ci en tant qu'objet d'art."
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