import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles } from "../styles/styles.js";
import textStyles from "../styles/textStyles.js";
import { firestore } from "../firebaseSetup.js";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { userContext } from "../App.js";
import { Counter, Separator } from "./components/counters.js";
import { Note } from "./components/notes.js";
import { buttonStyles } from "../styles/buttonStyles.js";

const OpenProject = (props) => {
  const item = props.item;
  const index = props.index;
  const columns = props.columns;

  const [name, setName] = useState(item.name);
  const [countersList, setCountersList] = useState(item.counters);
  const [notesList, setNotesList] = useState([]);
  const { height, width } = useWindowDimensions();
  const [projectWidth, setProjectWidth] = useState(200);

  const [numCounterColumns, setNumCounterColumns] = useState(1);

  const user = React.useContext(userContext);

  useEffect(() => {
    let colRef = collection(
      firestore,
      "Users",
      user.uid,
      "Projects",
      item.key,
      "Counters"
    );

    const unsubscribe = onSnapshot(colRef, (docs) => {
      let tempCounters = [];
      if (docs) {
        docs.forEach((doc) => {
          let data = doc.data();

          //console.log("Item found:", doc.id, doc.data());

          tempCounters.push({
            key: doc.id,
            name: data.name,
            count: data.count,
            increment: data.increment,
            projectID: item.key,
            userID: user.uid,
          });
        });
        //console.log("tempCounters now: ", tempCounters);
        setCountersList(tempCounters);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let colRef = collection(
      firestore,
      "Users",
      user.uid,
      "Projects",
      item.key,
      "Notes"
    );

    const unsubscribe = onSnapshot(colRef, (docs) => {
      let tempNotes = [];
      if (docs) {
        docs.forEach((doc) => {
          let data = doc.data();

          //console.log("Item found:", doc.id, doc.data());

          tempNotes.push({
            key: doc.id,
            note: data.note,
            projectID: item.key,
            userID: user.uid,
          });
        });
        //console.log("tempCounters now: ", tempCounters);
        setNotesList(tempNotes);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setProjectWidth(width / columns);
  }, [width]);

  function changeNumCounterColumns(layout) {
    const { width } = layout;
    console.warn("Width of single project: ", width);
    console.log(Math.floor(width / 160));
    setNumCounterColumns(Math.floor(width / 160));
  }

  async function addCounter() {
    try {
      await addDoc(
        collection(
          firestore,
          "Users",
          user.uid,
          "Projects",
          item.key,
          "Counters"
        ),
        {
          name: "untitled",
          increment: 1,
          count: 0,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function addNote() {
    try {
      await addDoc(
        collection(firestore, "Users", user.uid, "Projects", item.key, "Notes"),
        {
          name: "untitled",
          note: "",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View
      style={[
        { flex: 1, height: "100%", width: projectWidth },
        // justifyContent: "center",
        index > 0 && columns > 1
          ? {
              borderLeftWidth: 5,
              borderStyle: "dotted",
              borderColor: "#c094d1",
            }
          : { borderWidth: 0 },
      ]}
      onLayout={(event) => {
        changeNumCounterColumns(event.nativeEvent.layout);
      }}
    >
      <Text style={textStyles.projectTitleText}>{name}</Text>

      <FlatList
        data={countersList}
        renderItem={({ item }) => <Counter item={item}></Counter>}
        keyExtractor={(item) => item.key.toString()}
        numColumns={numCounterColumns}
        key={item.key.toString() + numCounterColumns.toString()}
        listKey={item.key.toString() + numCounterColumns.toString()}
        // style={{justifyContent: "center", justifySelf: "center"}}
      ></FlatList>

      <FlatList
        data={notesList}
        renderItem={({ item }) => <Note item={item} />}
        keyExtractor={(item) => item.key.toString()}
        listKey={item.key.toString() + "1234"}
      ></FlatList>

      <Separator />

      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => addCounter(item)}
      >
        <Text style={textStyles.paragraph}>Add Counter</Text>
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        style={buttonStyles.addCounterButton}
        onPress={() => addNote()}
      >
        <Text style={textStyles.paragraph}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export { OpenProject };
