// Write your code here

import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <div className="check-out-container">
          <h3 className="check-title-element">
            Order Total:{' '}
            <span className="title-span-element">
              Rs{' '}
              {cartList.reduce(
                (accumulator, item) => accumulator + item.quantity * item.price,
                0,
              )}
            </span>
          </h3>
          <p className="check-description">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
