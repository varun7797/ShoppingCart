import React, {Component} from 'react';
import PropTypes from 'prop-types';
import data from '../../data/products.json'
import './Product.css';

class AddToBag extends Component {

	render() {

		return (
			<button className="addtobag">
				Add to bag
			</button>

			)
	}

}


class ChooseSize extends Component {

	render() {

		return (
			<select className="chooseSize">
				<option>S</option>
				<option>M</option>
				<option>L</option>
				<option>XL</option>				
			</select>

			)
	}

}

class Product extends Component {
  
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    freeShipping: PropTypes.bool
  };
  
  render () {
  	const {id, title, price, freeShipping} = this.props
   return (
    <div className="productWrapper">   
    	<img className="productImg" src={require(`../../data/products/${id}_1.jpg`)}/>
    	<div className="title">
    		{title}
		</div>
    	<div className="price">
    		${price.toFixed(2)}
		</div>
		{freeShipping ? <div className="freeshipping">FREE SHIPPING</div> : null}
		<ChooseSize/>
		<AddToBag/>
    </div>
  );   
  }

}

class Products extends Component {



	render() {

		const products = Object.values(data)
		return (

		<div className="productList">
		 {products.map(x => {
		 	return <Product
						id={x.sku}
						title={x.title}
						price={x.price}
						freeShipping={x.isFreeShipping}
		 				/>
		 })}
		</div>

		)

	}
}

export default Products;
