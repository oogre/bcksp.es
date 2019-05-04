import i18n from 'meteor/universe:i18n';

import './fr.js';



//i18n.setLocale('en-US');
i18n.setOptions({
	//hostUrl : process.env.ROOT_URL,
    purify: string => string,
    defaultLocale: 'fr-FR',
});

export default i18n.createComponent();

