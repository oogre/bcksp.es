/*----------------------------------------*\
  bcksp.es - selfwritten.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2019-03-02 17:18:05
\*----------------------------------------*/
import React, { Component } from 'react';

export default class SelfWrittenTemplate extends Component {
	constructor(props){
		super(props);
		this.timer;
		this.cursor = 0;
		this.caretAt = 0;
		this.state = {
			text : ""
		};
	}
	componentDidMount(){
		this.updateTxt();
	}

	updateTxt(){
		let wait = parseInt(this.props.text[this.cursor]);
		Meteor.clearInterval(this.timer);
		let t = wait || 200 + (Math.random() * 2 - 1) * 100;
		this.timer = Meteor.setTimeout(()=>this.updateTxt(), t);	
		if(!wait){
			var text = this.props.text[this.cursor];
			this.caretAt = text.indexOf("^");
			this.setState({
				text : text
			});
		}
		this.cursor ++;
		this.cursor %= this.props.text.length;
	}
	render() {
		return (
			<div className="container">
				{
					React.Children.map(this.state.text.split(""), child => {
						return (
							child == "^" ? 
								<span className="caret blink"></span>
							:
								<span style={{whiteSpace: "pre"}}>{child}</span>
						);
					})
				}
			</div>
		);
	}
}
