import React, { useEffect, useState } from 'react';
import './Review.css';
import{getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const[cart, setCart] = useState([]);
    const[orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = ()=>{
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }
    const removeProduct =(productKey)=>{
        // console.log("remove item", productKey);
        const newCart = cart.filter(pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://shrouded-oasis-10859.herokuapp.com/productBykeys',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

        //is for fakedata
        // const cartProducts = productKeys.map( key => {
        //    const product = fakeData.find( pd => pd.key === key);
        //    product.quantity = savedCart[key];
        //    return product;
        // });
        // setCart(cartProducts);
    },[]);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src ={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
            {/* <h1>Cart Items: {cart.length}</h1> */}
            <div className="product-container">
                {
                    cart.map(pd=> <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="mainButton">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;