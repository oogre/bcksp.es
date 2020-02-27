/*----------------------------------------*\
  bcksp.es - translations.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-26 12:43:46
  @Last Modified time: 2020-02-27 00:50:30
\*----------------------------------------*/
import React from 'react';
import { useForm } from 'react-hook-form';
import { buildObjectFromStringKey } from "./../utilities/ui.js";
import { config } from './../startup/config.js'
import { getTranslationKeys } from "./../i18n/index.js";

// App component - represents the whole app

const Translations = () => {
	const [ inputLocale, setInputLocale ] = React.useState("fr");
	const [ outputLocale, setOutputLocale ] = React.useState("en");
	const [ namespaces, keys] = getTranslationKeys();
	const [ namespace, setNamespace ] = React.useState(namespaces[0]);
	const autoSizeTextarea = () =>{
		const textAreaAdjust = (o) =>{
			o.style.height = "1px";
			o.style.height = (25+o.scrollHeight)+"px";
			o.parentElement.parentElement.querySelector("textarea.output").style.height = o.style.height;
		}
		Meteor.setTimeout(()=>{
			document.querySelectorAll("textarea.input").forEach(textAreaAdjust);
		}, 100);
	}

	React.useEffect(() => {//componentDidMount
		autoSizeTextarea();
	}, [namespace, inputLocale]); 

	
	
	const save = (targets) => {
		const translation = {};
		const local = outputLocale;
		targets.forEach(target => {
			buildObjectFromStringKey(translation, target.getAttribute("name"), target.value)
		});
		Meteor.call("Languages.methods.add.translation", {
			local, 
			namespace, 
			translation : translation[namespace]
		}, (error, result) => {
			console.log(error, result);
		})
	}

	return (
		<div className="page__content">
			<div className="container">
				<div className="shop">
					<form className="shop-creation">
						<div className="shop-creation__order">
							<div className="shop-creation__form">
								<div className="fields-row">
									<div className="field">
										<select name="input" onChange={event=>setNamespace(event.target.value)} defaultValue={namespace}>
											{
												namespaces.map((namespace, key) => (
													<option 	key={key} 
																value={namespace}
													>
													{
														namespace
													}
													</option>
												))
											}
										</select>
									</div>
									<div className="field">
										<a 	className="button button--secondary" 
											href="#" 
											onClick={event=>{event.preventDefault();save(document.querySelectorAll("textarea.output")); return false;}}
										>
											Save this
										</a>
									</div>
								</div>
								<div className="fields-row">
									<div className="field">
										<select name="input" onChange={event=>setInputLocale(event.target.value)} defaultValue={inputLocale}>
											{
												i18n.getLanguages().map((lang, key) => (
													<option 	key={key} 
																value={lang}
													>
													{
														i18n.getLanguageNativeName(lang)
													}
													</option>
												))
											}
										</select>
									</div>
									<div className="field">
										<select name="output" onChange={event=>setOutputLocale(event.target.value)} defaultValue={outputLocale}>
											{
												config.langues.map((lang, key) => (
													<option 	key={key} 
																value={lang}
													>
													{
														i18n.getLanguageNativeName(lang)
													}
													</option>
												))
											}
										</select>
									</div>
								</div>
								{	
									keys[namespace].map(key => (
										<div className="fields-row" key={key}>
											<div className="field">
												<label className="field__label"
														style={{
															maxWidth: "450px",
															overflow: "hidden",
															textOverflow: "ellipsis"
														}}>
													{key}
												</label>
												<Textarea 	readOnly={true} 
															className="textarea input--text input" 
															name={inputLocale+"_"+key} 
															value={_.isString(i18n.getTranslations(key, inputLocale)) ? i18n.getTranslations(key, inputLocale) : ""} 
												/>
											</div>
											<div className="field">
												<label className="field__label">
													-
												</label>
												<Textarea 	className="textarea input--text output" 
															name={key} 
															value={_.isString(i18n.getTranslations(key, outputLocale)) ? i18n.getTranslations(key, outputLocale) : ""} 
												/>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

const Textarea = ({name, value, ...other})=>{
	const [v, setV] = React.useState(value);
	React.useEffect(() => {//componentDidMount
		setV(value);
	}, [value]); 
	return (
		<textarea 
			{...other}
			type="text"
			name={name}
			onChange={e => setV(e.target.value)}
			value={v}
			style={{
				width: "500px",
				lineHeight: "1.2rem"
			}}
			ref={node => {this.textarea = node;}}
		/>
	);
}

export default Translations;
