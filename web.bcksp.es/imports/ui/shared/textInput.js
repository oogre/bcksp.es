/*----------------------------------------*\
  bcksp.es - textInput.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-19 14:49:06
  @Last Modified time: 2020-02-24 20:50:38
\*----------------------------------------*/
import React from 'react';
import FixeError from './../fixe/error.js'

const TextInput = ({name, validator, label, error, defaultValue, onChange=()=>{}}) => {
	return (
		<div className="field">
			<label 
				htmlFor={ name } 
				className="field__label"
			>
				{ label }
			</label>
			<input 
				id={ name } 
				className={"input--text"  + (error ? " error" : "")}
				type="text"
				name={ name }
				onChange={onChange}
				ref={validator}
				defaultValue={defaultValue}
			/>
			{ 
				error && 
				<span className="input-wrapper--inline">
					<FixeError>{error}</FixeError>
				</span>
			}
		</div>
	);
};


export default TextInput;