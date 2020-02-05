/*----------------------------------------*\
  bcksp.es - sharePopup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-05 13:57:46
  @Last Modified time: 2020-02-05 15:21:48
\*----------------------------------------*/
import React from 'react';
import ReactModal from 'react-modal';// https://reactcommunity.org/react-modal/
import {
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
  TwitterShareButton, TwitterIcon,
} from "react-share";

ReactModal.setAppElement('body');

const SharePopup = ({open, setOpen, quote}) => {

	quote = "We archive your deletion : " + quote;

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
	
	return (
		<div className="container">
			<ReactModal
				isOpen={open}
				style={modalStyle}
				onRequestClose={ () => setOpen(false) }
				className="modal--tiny"
			>
				<div className="modal__wrapper">
					<div className="modal__container">
						<FacebookShareButton url="https://bcksp.es" quote={quote}>
							<FacebookIcon size={32} round={true}/>
						</FacebookShareButton>
						<RedditShareButton url="https://bcksp.es"  title={quote}>
							<RedditIcon size={32} round={true}/>
						</RedditShareButton>
						<TwitterShareButton url="https://bcksp.es" title={quote}>
							<TwitterIcon size={32} round={true}/>
						</TwitterShareButton>
					</div>
				</div>
			</ReactModal>
		</div>
	);
}

export default SharePopup;