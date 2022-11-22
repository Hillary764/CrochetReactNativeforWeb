
import { TextInput, Easing, TouchableOpacity, FlatList, Modal, Text, View , useWindowDimensions} from 'react-native';
import {styles} from'./styles.js';
import { useFocusEffect } from '@react-navigation/native';
import {firebaseConfig, app, auth, firestore} from './firebaseSetup.js';

import React, { useState, useEffect, useReducer, useRef } from 'react';
import { setDoc, doc, addDoc, getDocs, deleteDoc, collection, onSnapshot, query, limit, orderBy } from "firebase/firestore"; 
import {userContext} from './App.js';
import {Counter, Separator} from './counters.js';
import {OpenProject} from './openProject.js';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";


function binarySearch(list, item, min, max){
  if(min>max){
    //we searched and its not there
    return false;
  }

  let mid = parseInt(((min+max)/2));

  if(list[mid].key == item.key){
    return mid;
  }
  else if(list[mid].key > item.key){
    //mid is too big
    return binarySearch(list, item, min, (mid-1));
  }
  else{
    //then mid isn't equal or higher
    //must be too small
    return binarySearch(list, item, (mid+1), max);
  }
}


function HomeScreen({navigation}){
    const [openProjectList, setOpenProjectList] = useState([]);
    const [updateFlatlist, setUpdateFlatlist] = useState(true);
    const [projectList, updateProjectList] = useReducer(reducer, []);

    const { height, width } = useWindowDimensions();
    const [numColumns, setNumColumns] = useState(3);
    const [flatlistHeight, setFlatlistHeight] = useState(100);
    //using these for deciding how many projects to display next to each other

    const [sidebarWidth, setSidebarWidth] = useState(384);
    const [flatlistTop, setFlatlistTop] = useState((height*-0.424));
    //const [sidebarAnim] = useState(new Animated.Value(0))
    const sidebarShown = useSharedValue(-400);
    const openItemLoc = useSharedValue(0);

    const [newProjectModalVisible, setNewProjectModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState("Untitled");
    const user = React.useContext(userContext);

    useFocusEffect(React.useCallback(() => {

        let colRef = collection(firestore, "Users", user.uid, "Projects");
        let q = query(colRef);
      
        
        const unsubscribe = onSnapshot(q, (docs) => {
          let mydl = [];

          if (docs) {
            
            docs.forEach((item, index) => {
              let data = item.data();

              console.log("Item found:", item.id, item.data());
              let newItem = {key: item.id, name: data.name, opened: false}

            mydl.push(newItem);
          });
            // mydl.push({key: "newProject"});
            updateProjectList({type: "snapshot", new: mydl});
           // setProjectList(mydl);
        }});
    
      return () => unsubscribe();
    }, []));

    useFocusEffect(React.useCallback(() => {
      navigation.setOptions({ headerLeft: () => (
        <View style={{paddingLeft: "5%"}}>
          <TouchableOpacity activeOpacity={0.8} 
          onPress={() => sidebarSlide()}
          style={[styles.menuButton2]}>
            <Text style={styles.logoutText}>Projects</Text> 
          </TouchableOpacity>
      </View>
        ) })
  }, []));

    function reducer(state, action){
      console.log("Reducer function is starting");
      console.log("State: ", state);
      console.log("action: ", action);
 
      //state is old projectList
      //action.type should be "snapshot" or "single update"

      switch(action.type){

        case "snapshot":
          let newList = action.new;
          console.log("new state: ", action.new);
          //action.new is new project list
          //want to see which in new need to be opened
          
          openProjectList.forEach((item, index) => {
            let possibleIndex = binarySearch(newList, item, 0, (newList.length -1));

            if(possibleIndex === false){
              console.error("why is this open item not in the new project list!?: ", item.key);
              console.log("the newList is: ", newList);
              console.log("the openProjectList is: ", openProjectList);
            }
            else{
              newList[possibleIndex].opened = true;
            }
          });
          // finished going through the open projects
          //so list should be correct now

          return(newList);

        case "single update":
          let copyOldState = JSON.parse(JSON.stringify(state));
          console.log("changing index ", action.index, " to ", action.project);
          copyOldState[action.index] = action.project;
          return(copyOldState);

        default:
          //if we get here, we were given a bad action.type
          throw new Error(`Unknown action type in updateProjectList reducer: ${action.type}`);
      }
     
    }

    useFocusEffect(React.useCallback(() => {
      //console.log("Window width: ", width);
      if(width<=384){
        setSidebarWidth(width);
      }

      if(width>=1500){
        setNumColumns(6);
      }
      else if(width >= 1100){
        setNumColumns(5);
      }
      else if (width >= 1000){
        setNumColumns(4);
      }
      else if(width >= 900){
        setNumColumns(3);
      }
      else{
        setNumColumns(1);
      }
  }, [width]));

  useFocusEffect(React.useCallback(() => {
    //console.log("Window height: ", height);
    setFlatlistHeight(height*.865);
    //console.log("310/731: ", 310/731);
    setFlatlistTop(height*-0.424);
}, [height]));

  const sideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sidebarShown.value }]
    };
  });

  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: openItemLoc.value }]
    };
  });


  function sidebarSlide(){
    if(sidebarShown.value == 0){
      // Animated.timing(sidebarAnim, {
      //   toValue: -325,
      //   useNativeDriver: false,
      //   duration: 3000,
      // }).start();
      sidebarShown.value = withSpring(-400);
      openItemLoc.value = withTiming(10);
    }
    else{
      sidebarShown.value = withSpring(0);
      openItemLoc.value = withTiming(sidebarWidth);
    }
  }

    async function displayProject(project){
       
        //console.log("Project: ", project);
        let copyProject = project;
        //let copyProjectList = projectList;
        //console.log("Open projects: ", openProjectList);
        //console.log("Is it already open??: ", project.opened);
        //let projectShouldDisplay = true;
        let copyOPL = JSON.parse(JSON.stringify(openProjectList));

        if(project.opened){
          //well, we need to shut it
          copyProject.opened = false;
          
          copyOPL.forEach((item, index) => {
            //I've been fighting weirdness
            //with multiple copies of a project showing up in OPL
            //so I'm scared to cut corners and not check every item in copyOPL

            if(copyProject.key == item.key){

              copyOPL.splice(index, 1);
            }
          });

        }
        else{

          //sometimes project could still be opened if user spammed "open/close" button
          //first we need to set opened to true, either way

          copyProject.opened = true;

          //now need to quickly double-check if it is open
          let itemOpened = false;

          copyOPL.forEach((item, index) => {

            if(copyProject.key == item.key){
              //item was open
              itemOpened = true;
              copyOPL.splice(index, 1);
            }
          });

          if (!itemOpened){
            //well it should really not be in open project list?
            //note to self: still an issue?

          let colRef = collection(firestore, "Users", user.uid, "Projects", project.key, "Counters");
          let q = query(colRef);
          var mydl = [];

          let snapshot = await getDocs(q);
          snapshot.forEach((item) => {
            // doc.data() is never undefined for query doc snapshots
            
            let data = item.data();
            mydl.push({key: item.id, name: data.name, count: data.count, increment: data.increment, projectID: project.key, 
              userID: user.uid});

            
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
        let indexNeeded = binarySearch(projectList, project, 0, (projectList.length-1));

        //console.log("Index?: ", indexNeeded);
        //copyProjectList[indexNeeded] = copyProject;
        //console.log("Copy project list now: ", copyProjectList);
        //setProjectList(copyProjectList);
        updateProjectList({type: "single update", index: indexNeeded, project: copyProject})
        setOpenProjectList(copyOPL);
    }

    function addProject(){
        console.log("Add project stuff here");
        setNewProjectModalVisible(true);

    }

    async function confirmAddProject(){
        console.log("Add doc to firestore here");
        setNewProjectModalVisible(false);
        try{   
            await addDoc(collection(firestore, "Users", user.uid, "Projects"), {
                name: newProjectName 
            });
          }
          catch(err){
            console.log(err);
          }
          setNewProjectName("Untitled");
    }



    async function deleteProject(project){
        try{
           let copyOPL = JSON.parse(JSON.stringify(openProjectList));

           let projectLocation = binarySearch(copyOPL, project, 0, (copyOPL.length -1));
          
           if(projectLocation !== false){
              copyOPL.splice(projectLocation, 1);
           }

            // copyOPL.forEach((item, index) => {
            //     if(project.key == item.key){
            //             copyOPL.splice(index, 1);
            //     }
            // });
            setOpenProjectList(copyOPL);
            await deleteDoc(doc(firestore, "Users", user.uid, "Projects", project.key));
          
        }
        catch(err){
            console.log(err)
        }
    }

    const ProjectItem = ({ data, pressFunction}) => {

      if(data.opened){
        return(
          <View style={styles.projectTile}>       
        <TouchableOpacity onPress={() => displayProject(data)} style={[styles.item]}>
            <Text style={styles.paragraph}>{data.name}</Text>
            <Text style={styles.paragraph}>Close Project</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProject(data)}>
            <Text style={styles.paragraph}>Delete</Text>
        </TouchableOpacity>
        </View>
        );
      }
      else{
        return(
          <View style={styles.projectTile}>       
        <TouchableOpacity onPress={() => displayProject(data)} style={[styles.item]}>
            <Text style={styles.paragraph}>{data.name}</Text>
            <Text style={styles.paragraph}>Open Project</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProject(data)}>
            <Text style={styles.paragraph}>Delete</Text>
        </TouchableOpacity>
        </View>
        );
      }
        
};


    const renderProject = ({ item }) => {
          return (
            <View style={{padding: 10}}>
            <ProjectItem data={item} pressFunction={() => displayProject(item)}/>
            </View>
          ); 
        };



  return (
  
 <View style={styles.container2}> 
    <Animated.View style={[styles.sidebar, {width: sidebarWidth, }, sideStyle]}> 
        <Text>Sidebar</Text>        

    </Animated.View>


    <Animated.View style={[styles.mainAreaTests, mainStyle, {top: flatlistTop,}]}>
      <View style={{backgroundColor:'#f7ebfc'}}>

        </View>
    </Animated.View>
</View>

  
  );
  
  }

  export {HomeScreen};