import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../styles/styles.js";
import textStyles from "../../styles/textStyles.js";
import { firestore } from "../../firebaseSetup.js";
import React, { useState, useEffect } from "react";
import {
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  collection,
  updateDoc,
  onSnapshot,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { userContext } from "../../App.js";
import { Separator } from "./counters/counters.js";
import { buttonStyles } from "../../styles/buttonStyles.js";
import containerStyles from "../../styles/containerStyles.js";

const Note = (props) => {
  const item = props.item;
  const [noteText, setNoteText] = useState(item.note);
  const docRef = doc(
    firestore,
    "Users",
    item.userID,
    "Projects",
    item.projectID,
    "Notes",
    item.key
  );

  async function saveNote() {
    try {
      await updateDoc(docRef, {
        note: noteText,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote() {
    await deleteDoc(docRef);
  }

  return (
    <View style={containerStyles.container}>
      <TextInput
        style={[textStyles.paragraph, { height: 300, width: "90%" }]}
        multiline={true}
        onChangeText={(text) => setNoteText(text)}
        value={noteText}
        placeholder="Place Notes Here"
      />

      <Separator />
      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => {
          saveNote();
        }}
      >
        <Text style={textStyles.paragraph}>Save Note</Text>
      </TouchableOpacity>

      <Separator />

      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => {
          deleteNote();
        }}
      >
        <Text style={textStyles.paragraph}>Delete Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Note };
