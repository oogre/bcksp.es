/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2020-02-14 11:17:29
\*----------------------------------------*/


import React, { useEffect, useState } from 'react';
import Tooltip from './../shared/tooltip.js';
import { lerp, nf } from './../../utilities/math.js';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';

const ArchiveCounter = ({handle, archive, isReady}) => {
	
	const [ locale, setLocale ] = useState(i18n.getLocale());
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
			handle && handle.stop();
		}
	}, []); 

	const T2 = i18n.createTranslator("archive");
	const T = i18n.createComponent(T2);
	

	const getCharCount = () => {
		if(!archive || !isReady || archive.count < 0)return 0 ;
		return archive.count;
	}
	const getPerCent = () => {
		if(!archive || !isReady || archive.count < 0)return 0;
		return (getCharCount() / config.book.getMaxChar()) * 100 ;
	}
	const getJaugeTooltipText = () => {
		let jaugeTextAbailable = Object.values(T2("jauge.tooltip.custom"));
		let r = getCharCount() / config.book.getMaxChar();
		let id = Math.floor(lerp(0, jaugeTextAbailable.length-1, r));
		return (
			<span>
				<strong>
					<T>{"jauge.tooltip.custom."+id}</T>
				</strong>
				<br/>
				<T 	current={nf(getCharCount())} 
					target={nf(config.book.getMaxChar())}
				>
					jauge.tooltip.default
				</T>
			</span>
		);
	}

	return (
		<div className="counter">
			<span className="counter__total-character">
				<T count={nf(getCharCount())}>counter</T>
			</span>
			<span className="counter__total-percentage">
				{
					((getPerCent()).toFixed(2)).split(".").shift()
				}
				<span className="counter__total-percentage-float">
				{
					"."+((getPerCent()).toFixed(2)).split(".").pop()
				}
				</span>
				%
			</span>
			<svg width="100%" height="24px" data-tip data-for="counter-tooltip">
				<rect rx="3" ry="3" x="0" y="0" width="100%" height="100%" fill={"#D8D8D8"} />
				<rect rx="3" ry="3" x="0" y="0" width={getPerCent()+"%"} height="100%" fill={"#fff123"} />
			</svg>
			<Tooltip id="counter-tooltip">
				{ getJaugeTooltipText() }
			</Tooltip>
		</div>
	)
}

export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private.counter');
	return {
		isReady : 	handle && handle.ready() && Meteor.userId(),
		handle : 	handle,
		archive : 	Archives.findOne({ type : Archives.Type.PRIVATE, owner :  Meteor.userId() })
	};
})(ArchiveCounter);



