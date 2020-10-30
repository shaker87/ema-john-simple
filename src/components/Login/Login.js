import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { intializeLoginFramework, handleGoogleSignIn, handleSignOut, facebookLogIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  
  
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : ''
  })
  intializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const googleSignIn = ()=>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = ()=>{
    handleSignOut()
    .then(res =>{
      handleResponse(res, false);
    })
  }

  const fbSignIn = ()=>{
    facebookLogIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
     isFieldValid = (isPasswordValid && passwordHasNumber);
    }
    if(isFieldValid){
      const newUser = {...user}
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }
  const handleSubmit = (event)=> {
    // console.log(user.email, user.password);
    if( newUser && user.email && user.password){
      // console.log('submitted')
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
      
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  }


  return (
    <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign Out</button>
          :<button onClick={googleSignIn}>Sign In</button>
        }
        <br/>
        {
          <button onClick ={fbSignIn}>Log In Using Facebook</button>
        }
        {
          user.isSignedIn && <div>
            <h1>Welcome, {user.name}</h1>
            <p>{user.email}</p>
            <img src={user.photo} alt="" srcset=""/>
          </div>
        }

        <h1>Our own authentication</h1>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}

        <input type="checkbox" onChange ={ ()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign Up</label>
        
       <form onSubmit={handleSubmit}>
            { newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Enter your name" required/>}
            <br/>
            <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email" required/>
            <br/>
            <input type="password" onBlur={handleBlur} name="password" placeholder="Enter your password" required/>
            <br/>
            <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
       </form>
       <p style={{color: 'red'}}>{user.error}</p>
       
       {
         user.success && <p style={{color: 'green'}}>user { newUser ? "created" : "log in"} successfully</p>
         
       }
    </div>
  );
}

export default Login;
