import i18n from 'meteor/universe:i18n';

i18n.setOptions({
    purify: string => string
});

i18n.addTranslation('en-US', {
	errors : {
		email : {
			required : "your email is require",
			"already-exists" : "this email is already recorded",
		},
		password : {
			required : "your password is require",
			tooShort : "your password is too short",
			tooLong : "your password is too long"
		}
	},
	forms : {
		email : {
			name : "email",
			placeholder : "type your email",
		},
		password : {
			name : "password",
			placeholder : "type your password",
		},
		submit : {
			login : "Log in",
			logout : "Log out",
		}
	}
});

i18n.addTranslation('fr-FR', {
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
	}
});

//i18n.setLocale('fr-FR');