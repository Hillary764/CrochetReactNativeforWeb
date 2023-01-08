import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',  
    },

    container2: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#f7ebfc',
     // alignItems: 'center',
      //justifyContent: 'center',  
      flexDirection: 'row',
      alignContent: "start",
      // height: "100%",
      // width: "100%",
      
    },

    sidebar: {
      // flex: 1,
      //width: 384,
      position: "absolute",
      flexDirection: 'column',
      backgroundColor: '#ebcdf7',
      alignItems: 'center',
      justifyContent: 'center', 
      zIndex: 10, 
      alignSelf: "stretch",
      height: "100%",
      left: 0
    },

    mainArea: {
      flex: 3,
      backgroundColor: '#f7ebfc',
      alignItems: 'center',
      //justifyContent: 'space-around',  
      alignSelf: "stretch",
    },

    mainAreaTests: {
      backgroundColor: '#f7ebfc',
      alignItems: 'center',
      justifyContent: 'center',  
      //alignSelf: "stretch",
      height: "100%",
      width: "100%",
      alignContent: "start",
      
    },

    mainAreaFlatlistTests: {
      position: "absolute",
     // alignSelf: "center",
      width: "100%",
      
      // left: 10,
    },

      touchableOpacityProfile: {
        width: 120,
        height: 35, 
        backgroundColor: "#dfc4ff",
        right: "5%",
        top: 1,
        borderRadius: 90,
        justifyContent: 'center',
      },

      touchableOpacity: {
        width: 120,
        height: 35, 
        backgroundColor: "#dfc4ff",
        borderRadius: 90,
        justifyContent: 'center',
      },

      logoutText: {
        fontSize: 14,
        textAlign: 'center',
        color: "#3f344d"
      },

      googleLoginButton:{
        width: 300,
        height: 90, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#dfc4ff",
        borderRadius: 85
      },

      paragraph: {
        fontSize: 18,
        textAlign: 'center',
      },

      projectTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },

      minusIncrementText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 5,
      },

      plusIncrementText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 3,
      },

      incrementButton: {
        backgroundColor: '#dbbae8',
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: 35,
        height: 35,
        borderRadius: 50,
      },


      floatingButton: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        borderRadius: 50
      },

      item: {
        
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        width: "100%",
      },

      projectTile: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#deb1f0',
        borderRadius: 25,

      },

      deleteButton: {
        backgroundColor: '#c284db',
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        width: 75,
        height: 25,
        borderRadius: 50,
        position: "absolute",
        right: "5%",
      },

      menuButton: {
        backgroundColor: '#dbbae8',
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        width: 30,
        height: 25,
        borderRadius: 50,
        position: "absolute",
        right: "3%",
        top: "3%",
      },

      menuButton2: {
        width: 90,
        height: 35, 
        backgroundColor: "#dfc4ff",
        borderRadius: 90,
        justifyContent: 'center',
        
      },

    

      addCounterButton: {
        backgroundColor: '#dbbae8',
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        width: 150,
        height: 35,
        borderRadius: 50,
      },

      modal: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        padding: 20,
        backgroundColor: "#f0dff7",
        height: '50%',
        width: '50%'
      },

      separator:{
        zIndex: 1,
        width: "90%",
        height: 5
      },

      loading:{
        width: 50,
        height: 50,
        borderRadius: 10,
      },

  });


export {styles};