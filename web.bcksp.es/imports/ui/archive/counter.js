/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2018-11-25 23:21:41
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import T from './../../i18n/index.js';

class ArchiveCounter extends Component {
	constructor(props){
		super(props);
		this.bookcontent = config.book.page.count * config.book.page.line.count * config.book.page.line.char.count;
	}
	render() {
		console.log(this.props.archives);
		return (
			<div>
				{
					this.props.isReady &&
						<ul>
							<li>
								
							</li>
							<li>
								
							</li>
						</ul>
				}
			</div>
		)
	}
}

export default withTracker(self => {
	return {
		archives : Archives.find().fetch()
	};
})(ArchiveCounter);



