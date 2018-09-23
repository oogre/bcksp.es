import i18n from 'meteor/universe:i18n';

i18n.setOptions({
    purify: string => string
});

i18n.addTranslation('en-US', {
	baseline: "we archive backspace",
	errors : {
		email : {
			required : "your email is require",
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
		}
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
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "backspace your life",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "see your archive grow",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "get your souvenir back",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		}]
	},
	about : {
		title : "about",
		long : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
		short : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
		link : "learn more"
	},
	artists: {
		title : "the artists",
		list : [{
			name : "Vincent Evrard",
			bio : "blibloblo",
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
	},
	privacy : {
		title : "about privacy",
		short : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
	}
});

i18n.addTranslation('fr-FR', {
	baseline: "nous archivons les backspaces",
	errors : {
		email : {
			required : "votre email est requis",
			"already-exists" : "cet email est déjà utilisé",
		},
		password : {
			required : "votre mot de passe est requis",
			tooShort : "votre mot de passe est trop court",
			tooLong : "votre mot de passe est trop long"
		}
	},
	forms : {
		email : {
			name : "email",
			placeholder : "entrez votre email",
		},
		password : {
			name : "password",
			placeholder : "entrez votre mot de passe",
		},
		submit : {
			login : "connection",
			logout : "déconnection",
		}
	},
	menus: {
		open : "ouvrir menu",
		about : "description",
		contact : "contact",
		authors : "auteurs",
		souvenir : "souvenir",
		login : "login",
		signup : "signup",
		download : "téléverser",
		supportedBy : "supporté par",
		helpUs : "pour nous aider",
		share : "partager"
	}, 
	howto:{
		step : [{
			title : "installer l'extension",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "effacez du texte",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "observez votre archive grandir",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		},{
			title : "récupérez vos souvenirs",
			desc : "dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl"
		}]
	},
	about : {
		title : "description",
		long : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj. sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
		short : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
		link : "en apprendre plus"
	},
	privacy : {
		title : "vie privée",
		short : "sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.",
	}
});

export default i18n.createComponent();

//i18n.setLocale('fr-FR');