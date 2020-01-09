/*----------------------------------------*\
  bcksp.es - selfwritten.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2020-01-09 23:20:41
\*----------------------------------------*/
import React, { Component } from 'react';
import {lerp} from './../../utilities/math.js';
export default class SelfWritten extends Component {
	constructor(props){
		super(props);
		this.timer;
		this.cursor = 0;
		this.state = {
			text : ""
		};
	}
	componentDidMount(){
		this.updateTxt();
	}
	componentWillUnmount(){
		Meteor.clearInterval(this.timer);
	}

	updateTxt(){
		let wait = parseInt(this.props.text[this.cursor]);
		Meteor.clearInterval(this.timer);
		let t = (wait || 200) * lerp(0.5, 1.5, Math.random());// + (Math.random() * 2 - 1) * 100;
		this.timer = Meteor.setTimeout(()=>this.updateTxt(), t);	
		if(!wait){
			var text = this.props.text[this.cursor];
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
								<span className="caret blink">|</span>
							:
								<span className="char">{child}</span>
						);
					})
				}
			</div>
		);
	}
}
