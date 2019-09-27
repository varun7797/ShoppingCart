import React, {Component} from 'react';
import Products from './components/Product/Product.js'
import Nav from './components/Nav/Nav.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    sizes: [],
    sort: null
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


  render () {
     return (
        <div>
         <Nav onChangeFilter={this.filterSizes} onChangeSort={this.sortPrice}/>
         <Products sort={this.state.sort} displaySizes={this.state.sizes}/>          
        </div>
    );   
  }

}

export default App;
