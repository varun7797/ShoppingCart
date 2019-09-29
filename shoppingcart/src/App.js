import React, {Component} from 'react';
import Products from './components/Product/Product.js'
import Nav from './components/Nav/Nav.js'
import inventory from './data/inventory.json'
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    sizes: [],
    sort: null,
    bag: null,
    inventory: inventory,
    showError: false,
    showAdded: false,
    showOutOfStock: false,
    };
  }

  filterSizes = (e) => {

    let x = document.getElementsByName("size")
    let newSizes = []
    for(let i = 0; i < x.length; i++) {
      if(x[i].checked) {
      newSizes.push(x[i].value)
      }
    }
    this.setState({
      sizes: newSizes
    })
  }

  sortPrice = (e) => {
    this.setState({
      sort: e.target.value
    })
  }

  add = (product, size) => {
    if (size) {
      let newBag = []
      if (!this.state.bag) {
        newBag.push([product, size])
      } else {
        newBag = this.state.bag
        newBag.push([product, size])
      }
      this.setState({
        bag: newBag
      })
      this.showAdded()  
    } else {
      this.showError()
    }
  }

  addToBag = (product, size) => {
    const {inventory} = this.state
    let inv = inventory[product]
    if (size === 'S') {
      if(inv.S > 0) {
        inv.S = inv.S - 1
        this.add(product, size)
      } else {
        this.outOfStock()
      }

    }
    if (size === 'M') {
      if(inv.M > 0) {
        inv.M = inv.M - 1
        this.add(product, size)
      } else {
        this.outOfStock()
      }

    }
    if (size === 'L') {
      if(inv.L > 0) {
        inv.L = inv.L - 1
        this.add(product, size)
      } else {
        this.outOfStock()
      }

    }
    if (size === 'XL') {
      if(inv.XL > 0) {
        inv.XL = inv.XL - 1
        this.add(product, size)
      } else {
        this.outOfStock()
      }

    }
    let newInv = inventory
    newInv[product] = inv
    this.setState({
      inventory: newInv
    })
  }

  outOfStock = () => {
      this.setState({
        showOutOfStock: true
      })
      setTimeout(() => {
        this.setState({
          showOutOfStock: false
        })
      }, 1500);
    }



  removeFromBag = (product) => {
    console.log('x')
  }

    showError = () => {
      this.setState({
        showError: true
      })
      setTimeout(() => {
        this.setState({
          showError: false
        })
      }, 1500);
    }

    showAdded = () => {
      this.setState({
        showAdded: true
      })
      setTimeout(() => {
        this.setState({
          showAdded: false
        })
      }, 1500);
    }


  render () {

    const {showError, bag, showAdded, showOutOfStock} = this.state

     return (
        <div>
         <Nav onRemoveItem={this.removeFromBag} bag={bag} onChangeFilter={this.filterSizes} onChangeSort={this.sortPrice}/>
         <Products inventory={this.state.inventory} onClick={this.addToBag} sort={this.state.sort} displaySizes={this.state.sizes}/> 
         {showError ? <div className="error" id="error">Please select a size.</div> : null}
         {showAdded ? <div className="added" id="added">Item added to bag.</div> : null}     
          {showOutOfStock ? <div className="error" id="error">Out of stock.</div> : null}
        </div>
    );   
  }

}

export default App;
