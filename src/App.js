
import { StyleSheet,  TouchableOpacity, Text, View } from 'react-native';
import {styles} from'./styles.js';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';
import {SignInScreen} from './loginScreens.js';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from './homeScreen.js';
import {LoadingScreen} from './loadingscreen.js';
import { getAuth, onAuthStateChanged, User, signOut  } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

const userContext = React.createContext(undefined);

function AuthStack(){
  //creating a navigation stack that is only accessed when user is logged out
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Sign-In" >
          <Stack.Screen name="Sign-In" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

function LoadingStack(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen name='Loading' component={LoadingScreen}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


function UserStack(){
  //creating a navigation stack that is only accessed when user is logged out
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={({navigation}) => ({
             headerRight: () => (<TouchableOpacity activeOpacity={0.8} 
              onPress={() => signOut(auth)}
              style={styles.touchableOpacityProfile}>
               <Text style={styles.logoutText}>Logout</Text> 
              </TouchableOpacity>)
          })}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

function useAuthentication() {
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}



export default function App() {
  const { user } = useAuthentication();


  return user===undefined ? <LoadingStack/> : user===null ? <AuthStack/> : <userContext.Provider value={user}><UserStack /></userContext.Provider>
 // return <LoadingStack/>

}

export {userContext};