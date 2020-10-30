import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle ={borderBottom: '1px solid gray', padding: '10px'}
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="productName">{name}</h4>
            <p>Quantity: {quantity}</p>
    <p><small>Price: {price}</small></p>
            <br/>
            <button
                 onClick={()=>props.removeProduct(key)}
                 className="mainButton">
            Remove Item</button>
            
        </div>
    );
};

export default ReviewItem;