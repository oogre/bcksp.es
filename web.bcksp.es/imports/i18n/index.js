import i18n from 'meteor/universe:i18n';
import { config } from './../startup/config.js';
import './fr.js';
import './en.js';
import { propertiesToObject, propertiesToArray } from "./../utilities/ui.js";

i18n.setOptions({
	//hostUrl : process.env.ROOT_URL,
    purify: string => string,
    defaultLocale : "fr"
});

const getAllKeysForLocale = (local) => {
	return propertiesToArray(propertiesToObject(_i18n.getAllKeysForLocale(local)));
}

export const getTranslationKeys = () => {
	let [namespaces, keys] = _.zip.apply(_, getAllKeysForLocale("fr").map(key=>{
		const namespace = key.split(".")[0];
		return [namespace, {namespace, key}]
	}));
	namespaces = _.uniq(namespaces);
	keys = _.reduce(keys, (memo, {namespace, key})=>{
		memo[namespace] = memo[namespace] || [];
		memo[namespace].push(key);
		return memo;
	}, {});

	return [namespaces, keys];
}

export const getTranslation = (namespace) => {
	const translator = i18n.createTranslator(namespace);
	const component = i18n.createComponent(translator);
	return [component, translator];
}

export const getTranslations = (...namespaces) => {
	const data = {};
	namespaces.map((namespace, k) => {
		const translator = i18n.createTranslator(namespace);
		const component = i18n.createComponent(translator);
		data["C" + (k!=0 ? k : "")] = component;
		data["T" + (k!=0 ? k : "")] = translator;
	})
	data.E = i18n.createTranslator("errors");
	
	return data;
}
