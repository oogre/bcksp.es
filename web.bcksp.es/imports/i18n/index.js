import i18n from 'meteor/universe:i18n';
import { config } from './../startup/config.js';
import './fr.js';
import './en.js';

i18n.setOptions({
	//hostUrl : process.env.ROOT_URL,
    purify: string => string,
});



//console.log(i18n.createTranslator()("extension"));
export default i18n.createComponent();

