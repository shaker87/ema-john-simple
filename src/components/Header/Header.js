import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to ="/shop">Shop</Link>
                <Link to ="/review">Order Review </Link>
                <Link to ="/inventory">Manage Inventory</Link>
                {
                  loggedInUser.email? <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
                  : <Link to="/login"><button onClick={()=> setLoggedInUser({})}>Sign In</button></Link>
                }
                
            </nav>
        </div>
    );
};

export default Header;