/*----------------------------------------*\
  bcksp.es - sharePopup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-05 13:57:46
  @Last Modified time: 2020-03-08 22:27:33
\*----------------------------------------*/
import React from 'react';
import ReactModal from 'react-modal';// https://reactcommunity.org/react-modal/
import {
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
  TwitterShareButton, TwitterIcon,
} from "react-share";//https://github.com/nygardk/react-share

ReactModal.setAppElement('body');

const SharePopup = ({closeRequested, quote}) => {

	const content = "We archive your deletion : " + quote.content;

	const modalStyle = {
		overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			backgroundColor   : 'rgba(40, 40, 40, 0.9)',
			zIndex            : 9999
		},
		content : {
			position                   : 'absolute',
			top                        : '50%',
			left                       : '50%',
			minWidth				   : '300px',
			maxWidth				   : '460px',
			width				   	   : '50% ',
			right                      : 'auto',
			bottom                     : 'auto',
			marginRight           	   : '-50%',
			transform                  : 'translate(-50%, -50%)',
			border                     : '0',
			backgroundColor   		   : 'rgba(255, 255, 255, 0.9)',
			color                      : '#342e30',
			overflow                   : 'auto',
			WebkitOverflowScrolling    : 'touch',
			borderRadius               : '0',
			outline                    : 'none',
			padding                    : '20px'
		}
	}
	console.log(quote);
	return (
		<ReactModal
			isOpen={true}
			style={modalStyle}
			onRequestClose={ closeRequested }
		>
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h3 className="">
							Passez le mot
						</h3>
					</div>
					<div className="share">
						<div className="share__content">
							<p>
								«{quote.content}»
							</p>
							<ul>
								<li>
									<a 	className={"menu__item-link"}
										href={FlowRouter.path("posterCreation", {quote : quote.content , startOffset:quote.startOffset, endOffset:quote.endOffset})}
									>
										poster
									</a>
								</li>
								<li>
									<FacebookShareButton url="https://bcksp.es" quote={content}>
										<FacebookIcon size={32} round={true}/>
									</FacebookShareButton>
								</li>
								<li>
									<RedditShareButton url="https://bcksp.es"  title={content}>
										<RedditIcon size={32} round={true}/>
									</RedditShareButton>
								</li>
								<li>
									<TwitterShareButton url="https://bcksp.es" title={content}>
										<TwitterIcon size={32} round={true}/>
									</TwitterShareButton>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</ReactModal>
	);
}

export default SharePopup;