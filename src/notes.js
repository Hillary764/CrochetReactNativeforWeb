
import { StyleSheet,  TextInput, TouchableOpacity, FlatList, Modal, Image, Text, View } from 'react-native';
import {styles} from'./styles.js';
import { useFocusEffect } from '@react-navigation/native';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';
import { GoogleAuthProvider, signInWithPopup, signInWithCredential , onAuthStateChanged, User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { setDoc, doc, addDoc, deleteDoc, getDoc, collection,updateDoc, onSnapshot, query, limit, orderBy } from "firebase/firestore"; 
import {userContext} from './App.js';
import {Separator} from './counters.js';


const Note = (props) => {
    const item = props.item;
    const [noteText, setNoteText] = useState(item.note);
    const docRef = doc(firestore, "Users", item.userID, "Projects", item.projectID, "Notes", item.key);

    async function saveNote(){
        try{
            await updateDoc(docRef, {
                note: noteText
            })
        }
        catch(err){
            console.log(err);
        }
    }

    async function deleteNote(){
        await deleteDoc(docRef);
    }

    return(

        <View
        style={styles.container}>
            <TextInput
            style={[styles.paragraph, {height: 300,}]}
            multiline={true}
            onChangeText={text => setNoteText(text)}
            value={noteText}
            placeholder="Place Notes Here"
            />


            <TouchableOpacity style={styles.addCounterButton}
        onPress={() => {
          saveNote();
      }}>
            <Text style={styles.paragraph}>Save Note</Text>
        </TouchableOpacity>

        <Separator/>

        <TouchableOpacity style={styles.addCounterButton}
        onPress={() => {
            deleteNote();
      }}>
            <Text style={styles.paragraph}>Delete Note</Text>
        </TouchableOpacity>
        </View>
    );
}

export {Note};