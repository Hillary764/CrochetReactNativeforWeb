
import { StyleSheet,  TextInput, TouchableOpacity, FlatList, Modal, Image, Text, View } from 'react-native';
import {styles} from'./styles.js';
import { useFocusEffect } from '@react-navigation/native';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';
import { GoogleAuthProvider, signInWithPopup, signInWithCredential , onAuthStateChanged, User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { setDoc, doc, addDoc, deleteDoc, getDoc, collection,updateDoc , onSnapshot, query, limit, orderBy } from "firebase/firestore"; 
import {userContext} from './App.js';
import {Counter, Separator} from './counters.js';
import {Note} from './notes.js';
import Animated, { Layout, useSharedValue, useAnimatedStyle, withTiming, ZoomIn } from "react-native-reanimated";



const OpenProject = (props) => {
    const item = props.item;
    const [name, setName] = useState(item.name);
    const [countersList, setCountersList] = useState(item.counters);
    const [notesList, setNotesList] = useState([]);
    
    //const opacity = useSharedValue(1);
   
    const user = React.useContext(userContext);

    useFocusEffect(React.useCallback(() => {
        let colRef = collection(firestore, "Users", user.uid, "Projects", item.key, "Counters");
        
        const unsubscribe = onSnapshot(colRef, (docs) => {
            let tempCounters = [];
            if (docs) {
              
              docs.forEach((doc) => {
                let data = doc.data();
  
                //console.log("Item found:", doc.id, doc.data());
                  
                tempCounters.push({key: doc.id, name: data.name, count: data.count, increment: data.increment, projectID: item.key, 
                    userID: user.uid});
  
              });
              //console.log("tempCounters now: ", tempCounters);
              setCountersList(tempCounters);
            }
          }
          );
    
      return () => unsubscribe();
    }, []));


    useFocusEffect(React.useCallback(() => {
        let colRef = collection(firestore, "Users", user.uid, "Projects", item.key, "Notes");
        
        const unsubscribe = onSnapshot(colRef, (docs) => {
            let tempNotes = [];
            if (docs) {
              
              docs.forEach((doc) => {
                let data = doc.data();
  
                //console.log("Item found:", doc.id, doc.data());
                  
                tempNotes.push({key: doc.id, note: data.note, projectID: item.key, 
                    userID: user.uid});
  
              });
              //console.log("tempCounters now: ", tempCounters);
              setNotesList(tempNotes);
            }
          }
          );
    
      return () => unsubscribe();
    }, []));

    // useFocusEffect(React.useCallback(() => {
    //     opacity.value = withTiming(1, { duration: 300 });

    //     return () => {
    //       opacity.value = withTiming(0, { duration: 400 });
    //     }
    // }, []));

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //       opacity: opacity.value,
    //     };
    //   });

  

    async function addCounter(){
        try{
          await addDoc(collection(firestore, "Users", user.uid, "Projects", item.key,"Counters"), {
              name: "untitled",
              increment: 1,
              count: 0
          });

          
    }
        catch(err){
            console.log(err);
        }
    }

    async function addNote(){
        try{
          await addDoc(collection(firestore, "Users", user.uid, "Projects", item.key,"Notes"), {
              name: "untitled",
              note: "",
          });
    }
        catch(err){
            console.log(err);
        }
    }

    return(
        <Animated.View style={[{flex: 1, paddingHorizontal: 5}]} entering={ZoomIn}>
            <Text style={styles.projectTitleText}>{name}</Text>
        
             <FlatList
                data={countersList}
                renderItem={({item}) => <Counter item={item}></Counter>}
                keyExtractor={(item) => item.key.toString()}
                listKey={item.key.toString()}>
                
             </FlatList>

             <FlatList
                data={notesList}
                renderItem={({item}) => <Note item={item}/>}
                keyExtractor={(item) => item.key.toString()}
                listKey={item.key.toString()+"1234"}>
                
             </FlatList>

             <Separator/>

             <TouchableOpacity 
                style={styles.addCounterButton} 
                onPress={() => addCounter(item)}>
                <Text style={styles.paragraph}>Add Counter</Text>
            </TouchableOpacity>
            <Separator/>
            <TouchableOpacity 
                style={styles.addCounterButton} 
                onPress={() => addNote()}>
                <Text style={styles.paragraph}>Add Note</Text>
            </TouchableOpacity>
      </Animated.View>
    );
    
}


export {OpenProject};