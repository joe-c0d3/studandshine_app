import { Link } from "react-router-dom"

const CartSumary = ({cartTotal, delivery}) => {


  const subTotal = cartTotal.toFixed(2)
  const cartDelivery = delivery.toFixed(2)
  const total = (cartTotal + delivery).toFixed(2)


  return (
    <div className="col-md-4 align-self-start">
    <div className="card">
        <div className="card-body">
            <h5 className="cart-title">Cart Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>{`N${subTotal}`}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Delivery:</span>
                <span>{`N${cartDelivery}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <strong>{`N${total}`}</strong>
            </div>
            <Link to="/checkout">
            <button
                className="btn btn-primary w-100"
                style={{ backgroundColor: "#CBD18F", borderColor: "#CBD18F", color: '#000000' }}
            >
                Proceed to Checkout
            </button>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default CartSumary