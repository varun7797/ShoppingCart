import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Nav.css';

class Nav extends Component {


  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);

  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let nav = document.getElementById("nav")
    let sticky = nav.offsetTop
	  if (window.pageYOffset > sticky) {
	    nav.classList.add("sticky");
	  } else {
	    nav.classList.remove("sticky");
	  }
  }


	render() {
		return (
			<div id="nav" className="nav"> 
				<div>SHOPPING CART</div>
				<div className="navbuttons">
					<div className="filter">FILTER</div>
					<div className="sort">SORT</div>
					<div className="bag">BAG</div>
				</div>
			</div>

			)
	}
}

export default Nav;