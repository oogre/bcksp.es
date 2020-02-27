import i18n from 'meteor/universe:i18n';
import { config } from './../startup/config.js';
import './fr.js';
import './en.js';

i18n.setOptions({
	//hostUrl : process.env.ROOT_URL,
    purify: string => string,
    defaultLocale : "fr"
});

export const getTranslationKeys = () => {
	let [namespaces, keys] = _.zip.apply(_, _i18n.getAllKeysForLocale("fr").map(key=>{
		const namespace = key.split(".")[0];
		return [namespace, {namespace, key}]
	}));
	namespaces = _.uniq(namespaces);
	keys = _.reduce(keys, (memo, {namespace, key})=>{
		memo[namespace] = memo[namespace] || [];
		memo[namespace].push(key);
		return memo;
	}, {})
	return [namespaces, keys];
}

 