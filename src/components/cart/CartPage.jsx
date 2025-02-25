import CartSummary from "./CartSummary"
import CartItem from "./CartItem"
import { useEffect, useState } from "react"
import api from "../../api"
import Spinner from "../ui/Spinner"
import useCartData from "../../hooks/UseCartData"


const CartPage = ({setNumberCartItems}) => {

    const {cartitems, setCartItems, cartTotal, setCartTotal, loading, delivery} = useCartData()

    if (loading){
        return <Spinner Loading={loading} />
    }

    if (cartitems.length < 1) {
        return (<div className="alert alert-primary my-5" role="alert">
            You haven't added any item to your cart.
          </div>)
    }
    
  return (
    <div className="container my-3 py-3" style={{height: '80vh', overflow: 'scroll'}}>
        <h5 className="mb-4">Shopping Cart</h5>
        <div className="row">
            <div className="col-md-8">
                {cartitems.map(item => <CartItem key={item.id} item={item} 
                cartitems={cartitems} 
                setCartTotal={setCartTotal}
                setNumberCartItems={setNumberCartItems}
                setCartItems={setCartItems}
                    /> )}
            </div>
            <CartSummary cartTotal = {cartTotal} delivery={delivery} />
        </div>
    </div>
  )
}

export default CartPage