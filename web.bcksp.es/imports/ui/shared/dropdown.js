import React from 'react';
import ClickOutHandler from 'react-onclickout';

const Dropdown = (props) => {
	const [open, setOpen] = React.useState(false);
 
	const handleDropdownClick = event => {
		event.preventDefault();
		toggleDropdown();
		return false;
	}

	const clickOutsideDropdown = event => {
		event.preventDefault();
		toggleDropdown();
		return false; 
	}

	const toggleDropdown = () => setOpen(!open);
	
	// This function will be called for the 'click' event in any
	// fields rendered by any of child components.
	const handleChildClick = event => {
	// If child is a link, toggle the dropdown
	//if(event.target.tagName.toLowerCase() === 'a') {
		toggleDropdown();
	//}
	}

	let p = _.omit(props, ["active", "children", "label"]);
	p.className += " " + "dropdown" + (open ? " open" : "");
	 
	return (
		<div {...p}>
		{
			props.active ?
				<button className={'dropdown__button ' + (open ? 'open' : '')} onClick={handleDropdownClick} aria-haspopup="true">
					<div className="dropdown__button-label">
						{ props.label }
						<svg className="dropdown__button-icon" width="18" height="7" viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M9 6.962c-.271.076-.593.038-.813-.116L.22 1.269c-.293-.205-.293-.538 0-.743L.751.154a.993.993 0 0 1 1.062 0L9 5.184l7.187-5.03a.993.993 0 0 1 1.062 0l.531.372c.293.205.293.538 0 .743L9.813 6.846c-.22.154-.542.192-.813.116z" fillRule="nonzero"/></svg>
					</div>
				</button>
			:
				<div className={'dropdown__button ' + (open ? 'open' : '')} aria-haspopup="true">
					<div className="dropdown__button-label">
						{ props.label }
					</div>
				</div>
		}
		{
			open &&
			<ClickOutHandler onClickOut={clickOutsideDropdown}>
				<div className="dropdown__content" onClick={ handleChildClick }>
				{ props.children }
				</div>
			</ClickOutHandler>
		}
		</div>
	);
}

export default Dropdown;