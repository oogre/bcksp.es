/*----------------------------------------*\
  bcksp.es - textInput.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-19 14:49:06
  @Last Modified time: 2020-01-10 18:47:11
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';


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
				className="input--text" 
				type="text"
				name={ name }
				ref={validator}
				defaultValue={defaultValue}
			/>
			{ error }
		</div>
	);
};


export default TextInput;
/*
class TextInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			error : false
		};
	}
	validationHandler(event){
		if(_.isArray(this.props.validators)){
			this.props.validators.map(validator => {
				try{
					validator(event.target.value);
					this.setState({ error : false });
				}catch(e){
					this.setState({
						error : e.errors[0].details.value
					});
				}
			});
		}
	}
	render() {
		return (
			<div>
				{ this.props.label && 
					<label 
						htmlFor={ this.props.name } 
						className="field__label"
					>
						{ this.props.label }
					</label>
				}
				<input 
					id={ this.props.name } 
					className="input--text" 
					type={ this.props.type } 
					name={ this.props.name }
					ref={this.props.validators}
				/>
			</div>
		);
	}
}
*/