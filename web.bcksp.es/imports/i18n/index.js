import i18n from 'meteor/universe:i18n';

i18n.setOptions({
    purify: string => string
});

i18n.addTranslation('en-US', {
	error : {
		email : {
			required : "your email is require",
			"already-exists" : "this email is already recorded",
		},
		password : {
			required : "your password is require",
			tooShort : "your password is too short",
			tooLong : "your password is too long"
		}
	}
});
