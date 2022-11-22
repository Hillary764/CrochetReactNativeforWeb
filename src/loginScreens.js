
import { StyleSheet,  TextInput, TouchableOpacity, Image, Text, View } from 'react-native';
import {styles} from'./styles.js';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';
import { GoogleAuthProvider, signInWithPopup, signInWithCredential , onAuthStateChanged, User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';

//TODO add regular email login?

function SignInScreen({navigation}){

function buttonPress(){
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:", errorCode, errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
   
  return (
  
    <View style={styles.container}> 
 
<TouchableOpacity
    //this button is what tries to sign you in
    activeOpacity={0.8}
    onPress={buttonPress}
    style={styles.googleLoginButton}
    >
    <View style={{ flexDirection: 'row' }}>
    {/* <Image source={require('./assets/google.png')} style={styles.floatingButton}
        /> */}
    <Text style={styles.paragraph}>  Sign In With Google</Text>
        
    </View>
</TouchableOpacity>
 </View>
  
  );
  
  }

  export {SignInScreen};