import i18n from 'meteor/universe:i18n';

i18n.setOptions({
    purify: string => string
});

i18n.addTranslation('en-US', {
	baseline: "we archive backspace",
	archive : {
		counter : {
			title : "prints",
			left : "{$value} characters left"
		}
	},
	errors : {
		email : {
			required : "your email is require",
			"not-a-string" : "Your email is not a string",
			"not-an-email" : "Your email is wrong formatted",
			"already-exists" : "this email is already recorded",
		},
		password : {
			required : "your password is require",
			minString : "your password is too short",
			maxString : "your password is too long"
		},
		passwordConfirm : {
			required : "your password confirmation is require",
			"no-match" : "your password confirmation does not match",
		},
		login : {
			needed : "you have to be logged in to perform this action"
		},
		url : {
			"not-a-string" : "this is not a valid URL"
		}
	},
	userprofile : {
		archive : "archive",
		account : "account",
		changePassword : "change password",
		resetPassword : "send me an email",
		deleteArchive : "delete my archive",
		deleteAccount : "delete my account",
		blacklist : "blacklisted website",
		blindfield : {
			type : "blacklisted input's form type",
			class : "blacklisted class's input"
		},
	},
	methods : {
		user : {
			resetPassword : {
				success : "You'll receive soon an email to reset your password."
			},
			updateEmail : {
				success : "Your account has been updated."
			}
		}
	},
	utilities : {
		needConfirmation : "This action is matter, do you confirm?",	
	},
	forms : {
		signup : "sign up",
		login : "log in",
		loginNow : "log in now",
		signupNow : "sign up now",
		logout : "log out",
		alreadyMember : "Already have an account?",
		notMemberYet : "Don't have an account?",
		email : "email",
		password : "password",
		passwordConfirm : "password conform",
		delete : "delete",
		submit : {
			login : "log in",
			logout : "log out",
			signup : "sign up",
		}
	},
	menus: {
		open : "open menu",
		about : "about",
		profile : "profile",
		contact : "contact",
		authors : "authors",
		souvenir : "souvenir",
		login : "login",
		signup : "signup",
		download : "download",
		supportedBy : "Supported by",
		helpUs : "want to help us?",
		share : "share"
	},
	howto:{
		step : [{
			title : "get extension",
			desc : "Pour collecter vos morceaux de texte supprimé,<br/>\
					nous utilisons une extension de navigateur web.<br/>\
					La première démarche pour participer à ce projet\
					est d'installer celle-ci."
		},{
			title : "create your account",
			desc : "Le seconde étape est de vous identifier via l'extension.<br/>\
					Afin de sécuriser vos données, nous n'avons besoin que du minimum : <br/>\
					· une adresse email<br/>\
					· un mot de passe"
		},{
			title : "backspace your life",
			desc : "L'étape la plus simple.<br/>\
					Reprennez votre vie normal d'internaute.<br/>\
					En arrière plan, l'extention collecte et archive \
					sur notre serveur tout le texte qui disparetra de votre écran,<br/>\
					lorsque vous appuierez sur la touche backspace."
		},{
			title : "see your archive grow",
			desc : 	"L'extension vous aidera à connaître\
					la quantité de texte déjà archivé.<br/>\
					Vous pouvez lire votre archive à tout moment,\
					l'extension vous guidera vers votre page personnelle."
		},{
			title : "get your souvenir back",
			desc : 	"Une jauge vous indique à quel point votre archive est remplie. <br/>\
					Lorsque celle-ci atteint le maximum, <br/>\
					vous pouvez commander votre livre d'archive.<br/>\
					D'ici là, n'hésitez pas à visiter notre magasin de souvenir<br/>\
					vous y trouverez des goodies personnalisés des meilleurs mots de «bcksp.es»."
		}]
	},
	privacy : {
		title : "about privacy",
		short : 	"<p>L'aspect privé de vos donnés est un sujet que nous prennons au sérieux.\
					C'est pour cela que le code source des processus de collecte et de stockage \
					est Open Source. Il est donc soumis à un audit permanant de ses utilisateurs.\
					Vous trouverez tout cela sur https://github.com/oogre/bcksp.es\
					Dans ce projet artisitque, c'est le public qui fait œuvre. \
					Dans ce cadre plus qu'utilisateur vous êtes auteur.\
					De notre point de vue, il va de soi que rien ne sera publié \
					en votre nom sans votre accord explicite.\
					Il ne sera fait aucun usage de vos informations afin de réaliser des profils de consomateur,\
					nous ne croyons pas en les paradigmes qui font vivre les gros du web.</p>",
	},
	about : {
		title : "about",
		
		short : 	"<p>La pratique de l'écriture est pareille à un monde en formation. \
					Soumises à l'érosion, les idées s'affinent pour former des phrases. \
					Les tranches les plus sensibles de nos idées s'envolent sous la forme \
					du sable subtil pour finir dans le désert du néant. </p>\
					\
					<p>Notre souhait est de mettre en lumière une part intime et sombre \
					par nature de l'Homme. Il nous paraît que l'intérêt de ce projet \
					tient dans l'observation de la mécanique cérébrale travaillant \
					pour former une communication par l'écriture. Nous récupérons et \
					imprimons les restes des nombreux accidents de l'écriture, rien de plus. \
					Cela est déjà tout un programme...<br/> \
					La curiosité, la soif de découverte et de connaissance de soi sont des raisons \
					suffisantes pour se lancer dans l'aventure « bcksp.es ». </p>\
					\
					<p>Nous tirons notre nom de la touche « Backspace » du clavier informatique. \
					Celle-ci est située au-dessus de la touche « Enter ». Elle est utilisée \
					pour effacer les derniers caractères saisis, ceux situés à gauche \
					du curseur d’écriture. </p>\
					\
					<p>Lorsque l’on utilise la touche « Backspace », une part de nous \
					s'envole avec les mots perdus. « bcksp.es » capture ces poussières de pensée et \
					les archive. « bcksp.es » vous propose d'imprimer vos archives de textes \
					supprimés sous forme d’un livre de poche.</p>",

		long : 		"<p>« bcksp.es » est un dispositif permettant la microédition de livres touchant \
					à l’intime et l’absurde. Il s’agit aussi d’un processus dévoilant des questions \
					relatives au « big data » et à la protection des données. Ces sujets sont fondamentaux \
					dans l’expérience numérique actuelle. Ce projet ouvre des questions et les poses \
					à une part de notre réalité encore obscure que seul l’art numérique peut éclairer.</p>\
					\
					<p>Sur son ordinateur personnel un internaute arrive sur le site web http://bcksp.es. \
					Il est invité à créer un compte et à télécharger une extension de navigateur web. \
					Ces deux actions suffisent à « bcksp.es » pour enregistrer tous les caractères \
					typographiques que cet internaute supprimera à l’aide de la touche « Backspace » \
					de son clavier, durant ses navigations sur le web. L’archive de cet internaute n’est \
					consultable que par lui même. Il a la possibilité de commander l’impression de son \
					archive sous forme d’un livre format poche. Le prix demandé par « bcksp.es » \
					pour l’impression et la livraison d’un livre permet à « bcksp.es » d’imprimer \
					deux exemplaires dont un est envoyé à l’utilisateur/auteur et l’autre est conservé \
					pour le projet, cet exemplaire est susceptible d’être montré dans le cadre artistique \
					d’une exposition de la collection de livres édités par « bcksp.es ».</p>\
					\
					<p>Une version beta de « bcksp.es » a déjà vu le jour et a fonctionné durant toute\
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
					</p>",
		link : "learn more"
	},
	artists: {
		title : "the artists",
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
			message : "dsljdsf;ljdaglksghj gsd"
		}
	}
});

export default i18n.createComponent();

//i18n.setLocale('fr-FR');