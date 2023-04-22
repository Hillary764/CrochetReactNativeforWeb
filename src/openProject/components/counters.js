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
import textStyles from "../../styles/textStyles.js";
import counterStyles from "./counterStyles.js";
import { firebaseConfig, app, auth, firestore } from "../../firebaseSetup.js";
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
import containerStyles from "../../styles/containerStyles.js";

const Separator = () => <Text style={styles.separator}> </Text>;

const Counter = ({ item, availableWidth }) => {
  // const item = props.item;
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
        <TextInput
          placeholder={name}
          value={renameVal}
          onChangeText={(value) => {
            setRenameVal(value);
          }}
          style={[
            counterStyles.counterTitleEditMode,
            renameVal === ""
              ? { color: "rgba(105, 20, 128, 0.25)" }
              : { color: "#691480" },
          ]}
        />
      );
    } else {
      return <Text style={counterStyles.counterTitle}>{name}</Text>;
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
            textStyles.paragraph,
            { width: 50, backgroundColor: "#ffffff", borderRadius: 50 },
          ]}
        />
      );
    } else {
      return (
        <Text style={[textStyles.paragraph, { width: 50 }]}>
          {incrementVal}
        </Text>
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
            <Text style={textStyles.paragraph}>Save</Text>
          </TouchableOpacity>

          <Separator />
          <TouchableOpacity
            style={buttonStyles.addCounterButton}
            onPress={() => {
              setEditMode(!editMode);
            }}
          >
            <Text style={textStyles.paragraph}>Finish Edits</Text>
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
          <Text style={textStyles.paragraph}>Edit Counter</Text>
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
      style={[counterStyles.counterContainer]}
      //{ maxWidth: availableWidth }
    >
      <View style={counterStyles.counterTitleContainer}>{buildName()}</View>
      {/* first show the item name */}
      <Separator />
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text>Current Count:</Text>
        <Text style={textStyles.paragraph}> {item.count}</Text>
      </View>
      <Separator />

      <View style={{ flexDirection: "row" }}>
        {/* inside this view, I am making the increment and decrement buttons */}
        <TouchableOpacity
          style={buttonStyles.incrementButton}
          onPress={() => {
            incrementCounter("minus");
          }}
        >
          <Text style={textStyles.minusIncrementText}>-</Text>
        </TouchableOpacity>
        {buildIncrementer()}
        <TouchableOpacity
          style={buttonStyles.incrementButton}
          onPress={() => {
            incrementCounter("plus");
          }}
        >
          <Text style={textStyles.plusIncrementText}>+</Text>
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
        <Text style={textStyles.paragraph}>Reset to 0</Text>
      </TouchableOpacity>

      {/*Finally, probably want a "delete counter" option*/}
      <Separator />
      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => {
          deleteCounter();
        }}
      >
        <Text style={textStyles.paragraph}>Delete Counter</Text>
      </TouchableOpacity>
      <Separator />
      <Separator />
    </View>
  );
};

export { Counter, Separator };
