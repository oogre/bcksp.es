/*----------------------------------------*\
  bcksp.es - textInput.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-19 14:49:06
  @Last Modified time: 2020-01-31 12:57:37
\*----------------------------------------*/
import React from 'react';
import FixeError from './../fixe/error.js'

const TextInput = ({name, validator, label, error, defaultValue}) => {
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