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
    let newBag = []
    let quantity = 1
    if (!this.state.bag) {
      newBag.push([product, size, quantity])
    } else {
      newBag = this.state.bag
      let x = (newBag.indexOf(newBag.find(x => ((x[0] === product) && (x[1] === size)))))
      if (x >= 0) {
        newBag[x][2] = newBag[x][2] + 1
      } else {
        newBag.push([product, size, quantity])
      }
    }
    this.setState({
      bag: newBag
    })
    this.showAdded()  
  }

  addToBag = (product, size) => {
    const {inventory} = this.state
    let inv = inventory[product]
    if (size){
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
     else {
      this.showError()
    }
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
    const {bag, inventory} = this.state
    let bagItem = []
    bagItem.push(product.split(','))
    bagItem[0][0] = parseInt(bagItem[0][0], 10)
    let prod = bagItem[0][0]
    let size = bagItem[0][1]
    let newBag = bag
    let newInv = inventory
    for(let i=0; i<newBag.length; i++) {
      if ((newBag[i][0] == bagItem[0][0]) && (newBag[i][1] == bagItem[0][1])) {
        if (newBag[i][2] > 1) {
          newBag[i][2] = newBag[i][2] - 1
          if (size === 'S') {
            newInv[prod].S = newInv[prod].S + 1
          }
          if (size === 'M') {
            newInv[prod].M = newInv[prod].M + 1
          }
          if (size === 'L') {
            newInv[prod].L = newInv[prod].L + 1
          }
          if (size === 'XL') {
            newInv[prod].XL = newInv[prod].XL + 1
          }

        } else {
          newBag.splice(i, 1);
          if (size === 'S') {
            newInv[prod].S = newInv[prod].S + 1
          }
          if (size === 'M') {
            newInv[prod].M = newInv[prod].M + 1
          }
          if (size === 'L') {
            newInv[prod].L = newInv[prod].L + 1
          }
          if (size === 'XL') {
            newInv[prod].XL = newInv[prod].XL + 1
          }
        }
        break
      }
    }
    this.setState({
      bag: newBag,
      inventory: newInv
    })
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
