/*----------------------------------------*\
  bcksp.es - radioInput.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-22 15:11:59
  @Last Modified time: 2020-02-23 18:11:15
\*----------------------------------------*/
import React from 'react';
import FixeError from './../fixe/error.js'

const RadioInput = ({radios, name, validator, labels, error}) => {
	return (
		<div className="field">
		{
			radios.each((value, key) => (
				<label 
					key={key}
					className="input--radio"
					htmlFor={labels[key].label}
				>
					<input 
						className="input--radio__input" 
						type="radio" 
						id={labels[key].label} 
						name={name} 
						defaultChecked={value==0}
						ref={validator}
						value={value}
					/>
					<span className="input--radio__label">
						{labels[key].label}
						<div>
							<small>{labels[key].description}</small>
						</div>
					</span>
					
				</label>
			))
		}
		{ 
			error && 
			<li>
				<span className="input-wrapper--inline">
					<FixeError>{error}</FixeError>
				</span>
			</li>
		}
		</div>
	);
};


export default RadioInput;