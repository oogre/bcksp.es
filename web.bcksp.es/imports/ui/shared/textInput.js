/*----------------------------------------*\
  bcksp.es - textInput.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-19 14:49:06
  @Last Modified time: 2019-12-23 15:14:08
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

export default class TextInput extends Component {
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
					onChange={this.validationHandler.bind(this)}
					required={ this.props.required }
				/>
				{
					(this.props.error || this.state.error) &&
						<span>
							{ (this.props.error || this.state.error) }
						</span>
				}
			</div>
		);
	}
}