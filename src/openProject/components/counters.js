import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  Text,
  View,
} from "react-native";
import { styles } from "../../styles/styles.js";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseConfig, app, auth, firestore } from "../../firebaseSetup.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SlideInUp,
} from "react-native-reanimated";
import { buttonStyles } from "../../styles/buttonStyles.js";

const Separator = () => <Text style={styles.separator}> </Text>;

const Counter = (props) => {
  const item = props.item;
  const docRef = doc(
    firestore,
    "Users",
    item.userID,
    "Projects",
    item.projectID,
    "Counters",
    item.key
  );
  const [name, setName] = useState(item.name);
  const [incrementVal, setIncrementVal] = useState(item.increment);
  const [renameVal, setRenameVal] = useState("");
  const [newIncrement, setNewIncrement] = useState("");
  const [editMode, setEditMode] = useState(false);

  function buildName() {
    if (editMode) {
      return (
        <View style={styles.container}>
          <TextInput
            placeholder={name}
            value={renameVal}
            onChangeText={(value) => {
              setRenameVal(value);
            }}
            style={[
              styles.paragraph,
              { backgroundColor: "#ffffff", borderRadius: 50 },
            ]}
          />
        </View>
      );
    } else {
      return <Text style={styles.paragraph}>{name} Counter</Text>;
    }
  }

  function buildIncrementer() {
    if (editMode) {
      return (
        <TextInput
          placeholder={incrementVal}
          value={newIncrement}
          onChangeText={(value) => {
            setNewIncrement(value);
          }}
          style={[
            styles.paragraph,
            { width: 50, backgroundColor: "#ffffff", borderRadius: 50 },
          ]}
        />
      );
    } else {
      return (
        <Text style={[styles.paragraph, { width: 50 }]}> {incrementVal} </Text>
      );
    }
  }

  function buildEditButton() {
    if (editMode) {
      return (
        <View>
          <TouchableOpacity
            style={buttonStyles.addCounterButton}
            onPress={() => {
              let updateData = {};
              let weShouldUpdate = false;
              if (renameVal) {
                updateData.name = renameVal;
                weShouldUpdate = true;
              }
              if (parseInt(newIncrement)) {
                console.log(
                  "newIncrement should be good? it is: ",
                  newIncrement
                );
                console.log("newIncrement check is: ", newIncrement !== "");
                updateData.increment = parseInt(newIncrement);
                weShouldUpdate = true;
              }
              // console.log("New data: ", updateData);
              if (weShouldUpdate) {
                //  console.log("Trying to update with this info: ", updateData);
                try {
                  updateDoc(docRef, updateData).then(() => {
                    if (updateData.name) {
                      setName(renameVal);
                    }
                    if (updateData.increment) {
                      setIncrementVal(newIncrement);
                    }
                  });
                } catch (err) {
                  console.log("Error: ", err);
                }
              }
            }}
          >
            <Text style={styles.paragraph}>Save</Text>
          </TouchableOpacity>

          <Separator />
          <TouchableOpacity
            style={buttonStyles.addCounterButton}
            onPress={() => {
              setEditMode(!editMode);
            }}
          >
            <Text style={styles.paragraph}>Finish Edits</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={buttonStyles.addCounterButton}
          onPress={() => {
            setEditMode(!editMode);
          }}
        >
          <Text style={styles.paragraph}>Edit Counter</Text>
        </TouchableOpacity>
      );
    }
  }

  async function incrementCounter(direction) {
    let newCount;
    if (direction == "plus") {
      newCount = item.count + item.increment;
    } else {
      newCount = item.count - item.increment;
    }

    try {
      await updateDoc(docRef, {
        count: newCount,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function deleteCounter() {
    await deleteDoc(docRef);
  }

  async function zeroOut() {
    try {
      await updateDoc(docRef, {
        count: 0,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <View
      key={item.key}
      style={[styles.container, { width: 160, alignSelf: "center" }]}
    >
      <View>{buildName()}</View>
      {/* first show the item name */}
      <Separator></Separator>
      <View>
        <Text style={styles.paragraph}> {item.count}</Text>
      </View>
      <Separator></Separator>

      <View style={{ flexDirection: "row" }}>
        {/* inside this view, I am making the increment and decrement buttons */}
        <TouchableOpacity
          style={buttonStyles.incrementButton}
          onPress={() => {
            incrementCounter("minus");
          }}
        >
          <Text style={styles.minusIncrementText}>-</Text>
        </TouchableOpacity>
        {buildIncrementer()}
        <TouchableOpacity
          style={buttonStyles.incrementButton}
          onPress={() => {
            incrementCounter("plus");
          }}
        >
          <Text style={styles.plusIncrementText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Underneath the increment/decrement, I want an "edit" option */}
      <Separator></Separator>

      {buildEditButton()}

      {/* Probably want a "reset to 0" counter for things like stitches in a row */}

      <Separator></Separator>
      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => {
          zeroOut();
        }}
      >
        <Text style={styles.paragraph}>Reset to 0</Text>
      </TouchableOpacity>

      {/*Finally, probably want a "delete counter" option*/}
      <Separator />
      <TouchableOpacity
        style={styles.addCounterButton}
        onPress={() => {
          deleteCounter();
        }}
      >
        <Text style={styles.paragraph}>Delete Counter</Text>
      </TouchableOpacity>
      <Separator />
      <Separator />
    </View>
  );
};

export { Counter, Separator };
