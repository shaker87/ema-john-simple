import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        console.log(product.price , product.quantity)
        totalPrice = totalPrice + product.price * product.quantity || 1;
        
    }

    let shipping = 0;
    if(totalPrice> 35){
        shipping = 0;
    }

    else if(totalPrice>15){
        shipping = 4.99;
    }
    else if(totalPrice> 0){
        shipping = 12.99;
    }

    const formatNumber = (num)=>{
        const precision = (num).toFixed(2);
        return Number(precision);
    }

    const tax = (totalPrice / 10).toFixed(2);
    const grandTotal = (shipping + Number(tax) + totalPrice).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(totalPrice)}</p>
            <p><small>shipping cost: {shipping}</small></p>
            <p>Tax: {tax}</p>
            <p>Total: {Number(grandTotal)}</p>
            <br/>
            
            {
                props.children
            }

        </div>
    );
};

export default Cart;