import React, {Component} from 'react';
import Products from './components/Product/Product.js'
import Nav from './components/Nav/Nav.js'

class App extends Component {

  render () {
     return (
        <div>

         <Nav/>
         <Products/>          
        </div>
    );   
  }

}

export default App;
