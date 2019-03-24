import React from 'react';
import ClickOutHandler from 'react-onclickout';

export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    // State
    this.state = {
      open: false
    };

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.clickOutsideDropdown = this.clickOutsideDropdown.bind(this);
  }

  handleDropdownClick() {
    this.toggleDropdown();
  }

  clickOutsideDropdown() {
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.setState({
      open: !this.state.open
    });
  }

  // This function will be called for the 'click' event in any
  // fields rendered by any of child components.
  handleChildClick(event) {
    // If child is a link, toggle the dropdown
    //if(event.target.tagName.toLowerCase() === 'a') {
      this.toggleDropdown();
    //}
  }

  render() {
    return (
      <div className={'dropdown ' + this.props.className + (this.state.open ? ' open' : '')}>
        <button className={'dropdown__button ' + (this.state.open ? 'open' : '')} onClick={() => this.handleDropdownClick()} aria-haspopup="true">
          <div className="dropdown__button-label">
            {this.props.label}
            <svg className="dropdown__button-icon" width="18" height="7" viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M9 6.962c-.271.076-.593.038-.813-.116L.22 1.269c-.293-.205-.293-.538 0-.743L.751.154a.993.993 0 0 1 1.062 0L9 5.184l7.187-5.03a.993.993 0 0 1 1.062 0l.531.372c.293.205.293.538 0 .743L9.813 6.846c-.22.154-.542.192-.813.116z" fillRule="nonzero"/></svg>
          </div>
        </button>

        {this.state.open === true &&
          <ClickOutHandler onClickOut={this.clickOutsideDropdown}>
            <div className="dropdown__content" onClick={this.handleChildClick.bind(this)}>
              {this.props.children}
            </div>
          </ClickOutHandler>
        }
      </div>
    );
  }
}