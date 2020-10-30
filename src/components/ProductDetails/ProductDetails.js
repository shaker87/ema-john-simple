import React from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetails = () => {
    const {productKey} =useParams();
    const[loading, setLoading] = useState(true);
    const [product, setProduct] = useState([])
    document.title = "Product Details"

    useEffect(()=>{
        fetch(`https://shrouded-oasis-10859.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => {
            
            setProduct(data)
            setLoading(false)
        })
    },[productKey])
    // const product = fakeData.find(pd=> pd.key === productKey);
    // console.log(product);
    return (
        <div>
            <h1>{productKey} details comming soooon.....</h1>
            {
                loading ? <p>Loading...</p> :
                <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;