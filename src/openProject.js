
import { TouchableOpacity, FlatList, Text, View, useWindowDimensions } from 'react-native';
import {styles} from'./styles.js';
import {firestore} from './firebaseSetup.js';
import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, query, limit, orderBy } from "firebase/firestore"; 
import {userContext} from './App.js';
import {Counter, Separator} from './counters.js';
import {Note} from './notes.js';



const OpenProject = (props) => {
    const item = props.item;
    const [name, setName] = useState(item.name);
    const [countersList, setCountersList] = useState(item.counters);
    const [notesList, setNotesList] = useState([]);
    const { height, width } = useWindowDimensions();
    const [projectWidth, setProjectWidth] = useState(200);
   
    const user = React.useContext(userContext);

    useEffect(() => {
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
    }, []);


    useEffect(() => {
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
    }, []);

    useEffect(() => {
        setProjectWidth(Math.min(width, 200));
    }, [width]);

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
        <View style={[{flex: 1, paddingHorizontal: 5, width: projectWidth}]}>
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
      </View>
    );
    
}


export {OpenProject};