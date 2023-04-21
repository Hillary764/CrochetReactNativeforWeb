import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";
import { styles } from "../styles/styles.js";
import textStyles from "../styles/textStyles.js";
import { firebaseConfig, app, auth, firestore } from "../firebaseSetup.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { buttonStyles } from "../styles/buttonStyles.js";
import containerStyles from "../styles/containerStyles.js";

//TODO add regular email login?

function SignInScreen({ navigation }) {
  function buttonPress() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
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
    <View style={containerStyles.container}>
      <TouchableOpacity
        //this button is what tries to sign you in
        activeOpacity={0.8}
        onPress={buttonPress}
        style={buttonStyles.googleLoginButton}
      >
        <View style={{ flexDirection: "row" }}>
          {/* <Image source={require('./assets/google.png')} style={buttonStyles.floatingButton}
        /> */}
          <Text style={textStyles.paragraph}> Sign In With Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export { SignInScreen };
