import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Nav.css';

class FilterMenu extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onChange: PropTypes.func
    }

	render () {

		let sizes = ['S', 'M','L', 'XL']
		return(
			<div className={`floatMenu ${this.props.show}`}>
				SIZES:
				<form id="sizes" onChange={this.props.onChange} className="filterform">
					<label class="container">S
					  <input name='size' value='S' type="checkbox"/>
					  <span class="checkmark"></span>
					</label>
					<label class="container">M
					  <input name='size' value='M' type="checkbox"/>
					  <span class="checkmark"></span>
					</label>
					<label class="container">L
					  <input name='size' value='L' type="checkbox"/>
					  <span class="checkmark"></span>
					</label>
					<label class="container">XL
					  <input name='size' value='XL' type="checkbox"/>
					  <span class="checkmark"></span>
					</label>
				</form>

			</div>

			)
	}
}

class SortMenu extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onChange: PropTypes.func
    }




	render () {
		return(
			<div className={`floatMenu ${this.props.show}`}> 
				<select onChange={this.props.onChange} id="sort" className="chooseSize">
					<option disabled selected>Sort</option>
					<option value="lh">Low-High</option>
					<option value="hl">High-Low</option>
				</select>
			</div>

			)
	}
}

class BagMenu extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onChange: PropTypes.func
    }

	render () {
		return(
			<div className={`floatMenu ${this.props.show}`}> bag menu </div>

			)
	}
}


class Nav extends Component {


   static propTypes = {
    show: PropTypes.bool,
    onChangeFilter: PropTypes.func,
    onChangeSort: PropTypes.func,
    onChangeBag: PropTypes.func,
   }

  constructor(props) {
    super(props);

    this.state = {
		showFilter: false,
		showSort: false,
		showBag: false
    };
  }

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

	toggleFilter = () => {
		this.setState({
			showFilter: !this.state.showFilter
		})
	}

	toggleSort = () => {
		this.setState({
			showSort: !this.state.showSort
		})
	}

	toggleBag = () => {
		this.setState({
			showBag: !this.state.showBag
		})
	}	

	render() {

		const {showBag, showSort, showFilter} = this.state

		return (
			<div id="nav" className="nav"> 
				<div>SHOPPING CART</div>
				<div className="navbuttons">
					<div 
						onMouseEnter={this.toggleFilter} 
						onMouseLeave={this.toggleFilter} 
						className="filter">
							FILTER
							<FilterMenu onChange={this.props.onChangeFilter} show={showFilter}/>
					</div>
					<div 
						onMouseEnter={this.toggleSort} 
						onMouseLeave={this.toggleSort} 
						className="sort">
							SORT
							<SortMenu onChange={this.props.onChangeSort} show={showSort}/>
					</div>
					<div 
						onMouseEnter={this.toggleBag}
						onMouseLeave={this.toggleBag} 
						className="bag">
							BAG
							<BagMenu  onChange={this.props.onChangeBag} show={showBag}/>
					</div>
				</div>
			</div>

			)
	}
}

export default Nav;