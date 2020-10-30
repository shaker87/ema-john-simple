import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({product, handleAddProduct}) => {
    // console.log(props);
    // const{product, handleAddProduct}= props;
    const{img, name, seller, price, stock, key} =product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3 className="productName"><Link to={"/product/"+key}>{name}</Link></h3>
                <br/>
                <p><small>by:{seller}</small></p>
                <p>Price: ${price}</p>
                <p>Only {stock} left in stock - order soon</p>
                {<button className="mainButton" onClick={() =>
                     handleAddProduct(product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;