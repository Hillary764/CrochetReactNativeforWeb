import {
  TextInput,
  Easing,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles } from "../../styles/styles.js";
import { buttonStyles } from "../../styles/buttonStyles.js";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseConfig, app, auth, firestore } from "../../firebaseSetup.js";

import React, { useState, useReducer, useRef } from "react";
import {
  setDoc,
  orderBy,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { userContext } from "../../App.js";
import { Counter, Separator } from "../../openProject/components/counters.js";
import { OpenProject } from "../../openProject/openProject.js";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ProjectItem from "./components/projectItem.js";

function binarySearch(list, item, min, max) {
  if (min > max) {
    //we searched and its not there
    return false;
  }

  let mid = parseInt((min + max) / 2);

  if (list[mid].key == item.key) {
    return mid;
  } else if (list[mid].key > item.key) {
    //mid is too big
    return binarySearch(list, item, min, mid - 1);
  } else {
    //then mid isn't equal or higher
    //must be too small
    return binarySearch(list, item, mid + 1, max);
  }
}

function HomeScreen({ navigation }) {
  const [openProjectList, setOpenProjectList] = useState([]);
  const [projectList, updateProjectList] = useReducer(reducer, []);

  const { height, width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(3);
  const [flatlistHeight, setFlatlistHeight] = useState(100);
  //using these for deciding how many projects to display next to each other

  const [sidebarWidth, setSidebarWidth] = useState(384);
  const [flatlistTop, setFlatlistTop] = useState(height * -0.424);
  //const [sidebarAnim] = useState(new Animated.Value(0))
  const sidebarShown = useSharedValue(-400);
  const openItemLoc = useSharedValue(0);

  const [newProjectModalVisible, setNewProjectModalVisible] = useState(false);
  const [newProjectName, setNewProjectName] = useState("Untitled");
  const user = React.useContext(userContext);

  const colRef = collection(firestore, "Users", user.uid, "Projects");
  const [q, setQ] = useState(null);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const projectButtonRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      let query1;
      switch (q) {
        case null:
          query1 = query(colRef);
          break;

        case "createdAtDesc":
          query1 = query(colRef, orderBy("createdAt", "desc"));
          break;

        case "createdAt":
          query1 = query(colRef, orderBy("createdAt"));
          break;

        case "lastOpenedDesc":
          query1 = query(colRef, orderBy("lastOpened", "desc"));
          break;

        case "lastOpened":
          query1 = query(colRef, orderBy("lastOpened"));
          break;

        default:
          query1 = query(colRef);
      }
      const unsubscribe = onSnapshot(query1, (docs) => {
        let mydl = [];

        if (docs) {
          docs.forEach((item, index) => {
            let data = item.data();

            console.log("Item found:", item.id, item.data());

            if (!("createdAt" in data)) {
              console.log("there was no created at time here!");
              fixDoc(
                doc(firestore, "Users", user.uid, "Projects", item.id),
                "createdAt"
              );
            }

            if (!("lastOpened" in data)) {
              console.log("there was no last opened time here!");
              fixDoc(
                doc(firestore, "Users", user.uid, "Projects", item.id),
                "lastOpened"
              );
            }

            let newItem = { key: item.id, name: data.name, opened: false };

            mydl.push(newItem);
          });
          // mydl.push({key: "newProject"});
          updateProjectList({ type: "snapshot", new: mydl });
          // setProjectList(mydl);
        }
      });

      return () => unsubscribe();
    }, [q])
  );

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerLeft: () => (
          <View style={{ paddingLeft: "5%" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sidebarSlide()}
              style={[buttonStyles.menuButton]}
              ref={projectButtonRef}
              onMouseEnter={() => {
                console.log(projectButtonRef.current);
              }}
            >
              <Text style={styles.logoutText}>Projects</Text>
            </TouchableOpacity>
          </View>
        ),
      });
    }, [])
  );

  async function fixDoc(docRef, itemNeeded) {
    try {
      let date = new Date();
      switch (itemNeeded) {
        case "createdAt":
          console.log(date.getTime());
          console.log(date.getDate());
          await updateDoc(docRef, {
            createdAt: date.getTime(),
          });
          break;

        case "lastOpened":
          // console.log(date.getTime());
          // console.log(date.getDate());
          await updateDoc(docRef, {
            lastOpened: date.getTime(),
          });
          break;

        default:
          console.warn(
            "You called fixDoc with itemNeeded = ",
            itemNeeded,
            " ... what does that do?"
          );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function reducer(state, action) {
    console.log("Reducer function is starting");
    console.log("State: ", state);
    console.log("action: ", action);

    //state is old projectList
    //action.type should be "snapshot" or "single update"

    switch (action.type) {
      case "snapshot":
        let newList = action.new;
        console.log("new state: ", action.new);
        //action.new is new project list
        //want to see which in new need to be opened

        openProjectList.forEach((item, index) => {
          let possibleIndex = binarySearch(
            newList,
            item,
            0,
            newList.length - 1
          );

          if (possibleIndex === false) {
            console.error(
              "why is this open item not in the new project list!?: ",
              item.key
            );
            console.log("the newList is: ", newList);
            console.log("the openProjectList is: ", openProjectList);
          } else {
            newList[possibleIndex].opened = true;
          }
        });
        // finished going through the open projects
        //so list should be correct now

        return newList;

      case "single update":
        let copyOldState = JSON.parse(JSON.stringify(state));
        console.log("changing index ", action.index, " to ", action.project);
        copyOldState[action.index] = action.project;
        return copyOldState;

      case "open or close":
        let copyOldState2 = JSON.parse(JSON.stringify(state));
        let projectFound = false;
        for (let i = 0; i < copyOldState2.length && !projectFound; i++) {
          if (copyOldState2[i].key == action.key) {
            copyOldState2[i].opened = action.openedState;
            projectFound = true;
          }
        }
        return copyOldState2;

      default:
        //if we get here, we were given a bad action.type
        throw new Error(
          `Unknown action type in updateProjectList reducer: ${action.type}`
        );
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("Window width: ", width);
      if (width <= 384) {
        setSidebarWidth(width);
      }

      if (width >= 1500) {
        setNumColumns(6);
      } else if (width >= 1100) {
        setNumColumns(5);
      } else if (width >= 1000) {
        setNumColumns(4);
      } else if (width >= 900) {
        setNumColumns(3);
      } else {
        setNumColumns(1);
      }
    }, [width])
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("Window height: ", height);
      console.log("Flatlist height: ", height * 0.865);
      setFlatlistHeight(height * 0.865);
      //console.log("310/731: ", 310/731);
      setFlatlistTop(height * -0.424);
    }, [height])
  );

  const sideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sidebarShown.value }],
    };
  });

  function sidebarSlide() {
    //console.log("sidebar should pop up now");
    if (sidebarShown.value == 0) {
      sidebarShown.value = withSpring(-400);
      openItemLoc.value = withTiming(10);
    } else {
      sidebarShown.value = withSpring(0);
      openItemLoc.value = withTiming(sidebarWidth);
    }
  }

  async function displayProject(project) {
    //console.log("Project: ", project);
    let copyProject = project;
    let newOpenedState = false;
    //let copyProjectList = projectList;
    //console.log("Open projects: ", openProjectList);
    //console.log("Is it already open??: ", project.opened);
    //let projectShouldDisplay = true;
    let copyOPL = JSON.parse(JSON.stringify(openProjectList));

    if (project.opened) {
      //well, we need to shut it
      copyProject.opened = false;

      newOpenedState = false;

      copyOPL.forEach((item, index) => {
        //I've been fighting weirdness
        //with multiple copies of a project showing up in OPL
        //so I'm scared to cut corners and not check every item in copyOPL

        if (copyProject.key == item.key) {
          copyOPL.splice(index, 1);
        }
      });
    } else {
      //sometimes project could still be opened if user spammed "open/close" button
      //first we need to set opened to true, either way

      copyProject.opened = true;

      newOpenedState = true;

      //now need to quickly double-check if it is open
      let itemOpened = false;

      copyOPL.forEach((item, index) => {
        if (copyProject.key == item.key) {
          //item was open
          // itemOpened = true;
          copyOPL.splice(index, 1);
        }
      });

      if (!itemOpened) {
        //well it should really not be in open project list?
        //note to self: still an issue?

        let docRef = doc(firestore, "Users", user.uid, "Projects", project.key);

        try {
          let date = new Date();
          await updateDoc(docRef, {
            lastOpened: date.getTime(),
          });
        } catch (err) {
          console.warn(err);
        }

        let colRef = collection(
          firestore,
          "Users",
          user.uid,
          "Projects",
          project.key,
          "Counters"
        );
        let q = query(colRef);
        var mydl = [];

        let snapshot = await getDocs(q);
        snapshot.forEach((item) => {
          // doc.data() is never undefined for query doc snapshots

          let data = item.data();
          mydl.push({
            key: item.id,
            name: data.name,
            count: data.count,
            increment: data.increment,
            projectID: project.key,
            userID: user.uid,
          });
        });
        let finalProjectItem = JSON.parse(JSON.stringify(project));
        //console.log("Okay, mydl is: ", mydl);
        // finalProjectItem["unsubFunction"] = unsubscribeFunction;
        finalProjectItem["counters"] = mydl;

        //console.log("Okay, now finalProjectItem's list is: ", finalProjectItem["counters"]);
        //console.log("FinalProjectItem: ", finalProjectItem);
        copyOPL.push(finalProjectItem);
        //console.log("copyOPL check #1", copyOPL);
      }
    }

    // let indexNeeded = projectList.indexOf(project);
    let indexNeeded = 0;

    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i].key == project.key) {
        indexNeeded = i;
      }
    }
    // let indexNeeded = binarySearch(
    //   projectList,
    //   project,
    //   0,
    //   projectList.length - 1
    // );

    //console.log("Index?: ", indexNeeded);
    //copyProjectList[indexNeeded] = copyProject;
    //console.log("Copy project list now: ", copyProjectList);
    //setProjectList(copyProjectList);
    // updateProjectList({
    //   type: "single update",
    //   index: indexNeeded,
    //   project: copyProject,
    // });
    updateProjectList({
      type: "open or close",
      key: project.key,
      openedState: newOpenedState,
    });
    setOpenProjectList(copyOPL);
  }

  function addProject() {
    //console.log("Add project stuff here");
    setNewProjectModalVisible(true);
  }

  async function confirmAddProject() {
    setNewProjectModalVisible(false);
    let date = new Date();
    try {
      await addDoc(collection(firestore, "Users", user.uid, "Projects"), {
        name: newProjectName,
        createdAt: date.getTime(),
      });
    } catch (err) {
      console.log(err);
    }
    setNewProjectName("Untitled");
  }

  const renderProject = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <ProjectItem
          data={item}
          displayProject={displayProject}
          openProjectList={openProjectList}
          setOpenProjectList={setOpenProjectList}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container2, { width: width, height: height }]}>
      <Modal
        animationType="slide"
        transparent
        visible={newProjectModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={() => setNewProjectModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.modal}>
            <Text style={styles.paragraph}>Choose a project name:</Text>
            <Text> </Text>
            <TextInput
              style={styles.paragraph}
              placeholder="Enter Project Name"
              value={newProjectName}
              onChangeText={(value) => setNewProjectName(value)}
            />
            <Text> </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={buttonStyles.touchableOpacityModal}
                onPress={() => setNewProjectModalVisible(false)}
              >
                <Text style={styles.paragraph}>Cancel</Text>
              </TouchableOpacity>
              <Text> </Text>
              <TouchableOpacity
                style={buttonStyles.touchableOpacityModal}
                onPress={() => confirmAddProject()}
              >
                <Text style={styles.paragraph}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={sortModalVisible}
        onDismiss={() => setSortModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.sortModal}>
            <TouchableOpacity
              style={[buttonStyles.touchableOpacityModal]}
              onPress={() => {
                setQ("lastOpenedDesc");
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.paragraph}>Last Opened</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={[buttonStyles.touchableOpacityModal]}
              onPress={() => {
                setQ("lastOpened");
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.paragraph}>Last Opened {"(Reverse)"}</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={[buttonStyles.touchableOpacityModal]}
              onPress={() => {
                setQ("createdAtDesc");
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.paragraph}>Recently Created</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={[buttonStyles.touchableOpacityModal]}
              onPress={() => {
                setQ("createdAt");
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.paragraph}>
                {"Recently Created (Reverse)"}
              </Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={[buttonStyles.touchableOpacityModal]}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.paragraph}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={[styles.sidebar, { width: sidebarWidth }, sideStyle]}
      >
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 20,
            backgroundColor: "#deb1f0",
          }}
        >
          <Text style={styles.paragraph}>Sort Projects</Text>
        </TouchableOpacity>

        <FlatList
          //this builds a scrollable list of the items
          data={projectList}
          renderItem={renderProject}
          keyExtractor={(item) => item.key.toString()}
          style={{ width: "100%" }}
        />
        <TouchableOpacity onPress={() => addProject()} style={[styles.item]}>
          <Text style={styles.paragraph}>Add New Project</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={[styles.mainAreaTests /*{top: flatlistTop,}*/]}>
        <FlatList
          //this builds a scrollable list of the items
          data={openProjectList}
          numColumns={numColumns}
          key={numColumns}
          renderItem={({ item, index }) => (
            <OpenProject
              item={item}
              index={index}
              columns={Math.min(numColumns, openProjectList.length)}
            ></OpenProject>
          )}
          keyExtractor={(item) => item.key.toString()}
          style={[styles.mainAreaFlatlistTests, { height: flatlistHeight }]}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-start",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          //
        />
      </View>
    </View>
  );
}

export { HomeScreen };