import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )
    this.setState({cartList: updatedCart})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity - 1}
        : eachItem,
    )
    this.setState({cartList: updatedCart})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCart})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isThere = cartList.find(eachItem => eachItem.id === product.id)
    if (isThere === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem =>
          eachItem.id === product.id
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
