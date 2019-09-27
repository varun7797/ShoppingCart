import React, {Component} from 'react';
import PropTypes from 'prop-types';
import data from '../../data/products.json'
import inventory from '../../data/inventory.json'
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
				<option disabled selected>Select a size</option>
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
    freeShipping: PropTypes.bool,
    stock: PropTypes.array
  };


  render () {
  	const {id, title, price, freeShipping, stock} = this.props

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

  static propTypes = {
    displaySizes: PropTypes.array,
    sort: Products.string
  };


	sortFuncLH = (a,b) => {
		if (a[1] === b[1]) {
			return 0;
		}
		else {
			return (a[1] < b[1]) ? -1 : 1;
		}
	}

	sortFuncHL = (a,b) => {
		if (a[1] === b[1]) {
			return 0;
		}
		else {
			return (a[1] > b[1]) ? -1 : 1;
		}
	}

	render() {

		const products = Object.values(data)

		const {displaySizes, sort} = this.props

		let productList = products.map(x => {
					 	return <Product
									id={x.sku}
									title={x.title}
									price={x.price}
									freeShipping={x.isFreeShipping}
									stock={[inventory[x.sku].S,
											inventory[x.sku].M,
											inventory[x.sku].L,
											inventory[x.sku].XL,]}
					 				/>})
		


		let filteredProductList = []

		if (displaySizes.length > 0) {
			for(let i = 0; i < displaySizes.length; i++) {
				for(let j = 0; j < productList.length; j++) {
					if (displaySizes[i] === 'S') {
						if (productList[j].props.stock[0] > 0) {
							if (!filteredProductList.includes(productList[j])) {
								filteredProductList.push(productList[j])
							}
						}
					}
					if (displaySizes[i] === 'M') {
						if (productList[j].props.stock[1] > 0) {
							if (!filteredProductList.includes(productList[j])) {
								filteredProductList.push(productList[j])
							}
						}
					}
					if (displaySizes[i] === 'L') {
						if (productList[j].props.stock[2] > 0) {
							if (!filteredProductList.includes(productList[j])) {
								filteredProductList.push(productList[j])
							}
						}
					}
					if (displaySizes[i] === 'XL') {
						if (productList[j].props.stock[3] > 0) {
							if (!filteredProductList.includes(productList[j])) {
								filteredProductList.push(productList[j])
							}
						}
					}
				}
			}
		} else {
			filteredProductList = productList
		}

		let sorted = []
		let sortedFilteredProductList = []

		if (sort) {
			for(let i = 0; i < filteredProductList.length; i++) {
				sorted.push([filteredProductList[i].props.id, filteredProductList[i].props.price])
			}
			if (sort === 'lh'){
				sorted.sort(this.sortFuncLH)
			}
			if (sort === 'hl'){
				sorted.sort(this.sortFuncHL)
			}
			for(let i = 0; i < filteredProductList.length; i++) {
				for(let j = 0; j < sorted.length; j++) {
					if (sorted[i][0] === filteredProductList[j].props.id) {
						sortedFilteredProductList.push(filteredProductList[j])
					}
				}
			}

		} else {
			sortedFilteredProductList = filteredProductList
		}

			return (

					<div className="productList">
						{sortedFilteredProductList}
					</div>

			)	



	}
}

export default Products;
