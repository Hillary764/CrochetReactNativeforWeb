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
import { styles } from "../../../styles/styles.js";
import textStyles from "../../../styles/textStyles.js";
import counterStyles from "./counterStyles.js";
import counterTextStyles from "./counterTextStyles.js";
import counterButtonStyles from "./counterButtonStyles.js";
import {
  firebaseConfig,
  app,
  auth,
  firestore,
} from "../../../firebaseSetup.js";
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
import { userContext } from "../../../App.js";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SlideInUp,
} from "react-native-reanimated";
import { buttonStyles } from "../../../styles/buttonStyles.js";
import containerStyles from "../../../styles/containerStyles.js";

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
            counterTextStyles.counterTitleEditMode,
            renameVal === ""
              ? { color: "rgba(105, 20, 128, 0.25)" }
              : { color: "#691480" },
          ]}
        />
      );
    } else {
      return <Text style={counterTextStyles.counterTitle}>{name}</Text>;
    }
  }

  function buildIncrementer() {
    if (editMode) {
      return (
        <>
          <Text
            style={[
              counterTextStyles.counterCount,
              { marginBottom: 0, fontSize: 22, fontWeight: "normal" },
            ]}
          >
            Increment by:
          </Text>
          <TextInput
            placeholder={incrementVal}
            value={newIncrement}
            onChangeText={(value) => {
              setNewIncrement(value);
            }}
            style={[
              counterTextStyles.counterCountEditMode,
              newIncrement === ""
                ? { color: "rgba(105, 20, 128, 0.25)" }
                : { color: "#691480" },
              ,
              { marginTop: 0 },
              // { width: 50, backgroundColor: "#ffffff", borderRadius: 50 },
            ]}
          />
        </>
      );
    } else {
      return (
        <>
          <Text
            style={[
              counterTextStyles.counterCount,
              { marginBottom: 0, fontSize: 22, fontWeight: "normal" },
            ]}
          >
            Increment by:
          </Text>
          <Text style={[counterTextStyles.counterCount, { marginTop: 0 }]}>
            {incrementVal}
          </Text>
        </>
      );
    }
  }

  function buildEditButton() {
    if (editMode) {
      return (
        <View>
          <TouchableOpacity
            style={counterButtonStyles.utilityButtons}
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
            <Text style={counterTextStyles.utilityButtonText}>Save</Text>
          </TouchableOpacity>

          <Separator />
          <TouchableOpacity
            style={counterButtonStyles.utilityButtons}
            onPress={() => {
              setEditMode(!editMode);
            }}
          >
            <Text style={counterTextStyles.utilityButtonText}>
              Finish Edits
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={counterButtonStyles.utilityButtons}
          onPress={() => {
            setEditMode(!editMode);
          }}
        >
          <Text style={counterTextStyles.utilityButtonText}>Edit Counter</Text>
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

      <Text style={counterTextStyles.counterSubtitleText}>Current Count:</Text>
      <Text style={counterTextStyles.counterFullCount}>{item.count}</Text>

      <Separator />
      {buildIncrementer()}
      <View style={counterStyles.counterIncrementButtonContainer}>
        {/* inside this view, I am making the increment and decrement buttons */}

        <TouchableOpacity
          style={[counterButtonStyles.incrementButton]}
          onPress={() => {
            incrementCounter("minus");
          }}
        >
          <Text style={counterTextStyles.minusIncrementText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[counterButtonStyles.incrementButton]}
          onPress={() => {
            incrementCounter("plus");
          }}
        >
          <Text style={counterTextStyles.plusIncrementText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Underneath the increment/decrement, I want an "edit" option */}
      <Separator></Separator>

      {buildEditButton()}

      {/* Probably want a "reset to 0" counter for things like stitches in a row */}

      <Separator></Separator>
      <TouchableOpacity
        style={counterButtonStyles.utilityButtons}
        onPress={() => {
          zeroOut();
        }}
      >
        <Text style={counterTextStyles.utilityButtonText}>Reset to 0</Text>
      </TouchableOpacity>

      {/*Finally, probably want a "delete counter" option*/}
      <Separator />
      <TouchableOpacity
        style={counterButtonStyles.utilityButtons}
        onPress={() => {
          deleteCounter();
        }}
      >
        <Text style={counterTextStyles.utilityButtonText}>Delete Counter</Text>
      </TouchableOpacity>
      <Separator />
      <Separator />
    </View>
  );
};

export { Counter, Separator };
