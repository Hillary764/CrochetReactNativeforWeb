
import { StyleSheet,  TextInput, TouchableOpacity, Image, Text, View } from 'react-native';
import {styles} from'./styles.js';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';
import { GoogleAuthProvider, signInWithPopup, signInWithCredential , onAuthStateChanged, User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {Separator} from './counters.js';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor, withTiming } from "react-native-reanimated";


function LoadingScreen({navigation}){
    const loadingText = ["loading.", "loading..", "loading..."]
    const [loadNum, setLoadNum] = useState(0);

    const currentColor = useSharedValue(0);
    const rotation = useSharedValue(0);
    const xPosition = useSharedValue(0);

    
  const cubeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      currentColor.value,
      [0, 1],
      ["#2e5bff", "#2eb9ff"]
    );

    return {
      backgroundColor,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg`}],
    };
  });

  const animatedStyleContainer = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xPosition.value}],
    };
  });



    useFocusEffect(React.useCallback(() => {
        setTimeout(() => {  setLoadNum(((loadNum+1)%3)); }, 2000);
    }, [loadNum]));


    useFocusEffect(React.useCallback(() => {
       if(currentColor.value == 0){
            currentColor.value = withSpring(1);
            xPosition.value = withSpring(100);
       }
       else{
        currentColor.value = withSpring(0);
        xPosition.value = withSpring(-100);
       }
    }, [loadNum]));


    useFocusEffect(React.useCallback(() => {
    //    rotation.value = withSpring(((rotation.value+180)%360));
        if(rotation.value == 0){
            rotation.value = withSpring(360);
        }
        else{
            rotation.value = withSpring(0);
        }

     }, [loadNum]));



    return(
        <View style={styles.container}>
            <Text>{loadingText[loadNum]}</Text>
            <View style={{height: 25}}></View>
            <Animated.View style={animatedStyleContainer}>
            <Animated.View style={[cubeStyle, animatedStyle, styles.loading]}></Animated.View>
            </Animated.View>

        </View>
    );
}

export {LoadingScreen};