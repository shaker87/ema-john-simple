import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const intializeLoginFramework = ()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSignIn = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const signedIn = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        success : true
      }
      setUserToken();
      return signedIn;
    //   console.log(signedIn);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  export const handleSignOut = ()=> {
    return firebase.auth().signOut()
    .then(result => {
      const signedOut = {
        isSignedIn: false,
        name : '',
        email : '',
        photo : '',
        error : '',
        success : false
      }
      return signedOut;
    })
    .catch(error => {
      console.log(error.message);
    })
  }
  
  const setUserToken = ()=> {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem('token', idToken)
    })
    .catch(function(error) {
      // Handle error
    });
  }

  export const facebookLogIn = () =>{
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }


  export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUser = res.user;
      newUser.error = '';
      newUser.success = true;
      updateUserName(name);
      return newUser;
    //   console.log(res.user);
    })
    .catch(error => {
      // Handle Errors here.
      const newUser = {};
      newUser.error = error.message;
      newUser.success = false;
      return newUser;
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ...
    });
  }

  export const signInWithEmailAndPassword = (email, password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUser = res.user;
      newUser.error = '';
      newUser.success = true;
      return newUser;
    //   console.log('sign in user info', res.user);
    })
    .catch(function(error) {
      // Handle Errors here.
      const newUser = {};
      newUser.error = error.message;
      newUser.success = false;
      return newUser;
   
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully');
    }).catch(function(error) {
      console.log('updated failed')
    });
  }

