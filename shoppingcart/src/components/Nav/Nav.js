import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Nav.css';
import data from '../../data/products.json'

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
					<label className="container">S
					  <input name='size' value='S' type="checkbox"/>
					  <span className="checkmark"></span>
					</label>
					<label className="container">M
					  <input name='size' value='M' type="checkbox"/>
					  <span className="checkmark"></span>
					</label>
					<label className="container">L
					  <input name='size' value='L' type="checkbox"/>
					  <span className="checkmark"></span>
					</label>
					<label className="container">XL
					  <input name='size' value='XL' type="checkbox"/>
					  <span className="checkmark"></span>
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
    onChange: PropTypes.func,
    items: PropTypes.array,
    bag: PropTypes.array,
    onRemoveItem: PropTypes.func
    }


	render () {

		const {bag} = this.props

		let bagItems = []
		let total = 0


		if (bag) {
			bagItems = bag.map(x => {
				return <div className="bagItem">
				    	<img className="bagImg" src={require(`../../data/products/${x[0]}_2.jpg`)}/>
						<div className="bagItemInfo">
							<div>{data[x[0]].title}</div>
							<div>Size: {x[1]}</div>
							<div>${data[x[0]].price.toFixed(2)}</div>
							<button className="removeItem">X</button>
						</div>
				</div>
			})
			for(let i = 0; i < bag.length; i++) {
				total = total + data[bag[i][0]].price
			}
		} else {
			bagItems = "Your shopping bag is empty."
		}

	
		
		return(
			<div className={`bagMenu ${this.props.show}`}>
				<div className="bagItems">{bagItems}</div>
				<div className="bagTotal">
					<div className="total">Total:</div> 
					<div className="totalValue">${total.toFixed(2)}</div>
				</div>
				<button className="bagCheckout">CHECKOUT</button>
			</div>

			)
	}
}


class Nav extends Component {


   static propTypes = {
    show: PropTypes.bool,
    onChangeFilter: PropTypes.func,
    onChangeSort: PropTypes.func,
    onChangeBag: PropTypes.func,
    bag: PropTypes.array,
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
							<BagMenu bag={this.props.bag} onChange={this.props.onChangeBag} show={showBag}/>
					</div>
				</div>
			</div>

			)
	}
}

export default Nav;