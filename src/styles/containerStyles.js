import { StyleSheet } from "react-native";

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },

  container2: {
    flex: 1,
    display: "flex",
    backgroundColor: "#f7ebfc",
    // alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: "row",
    alignContent: "start",
    // height: "100%",
    // width: "100%",
  },

  mainArea: {
    backgroundColor: "#f7ebfc",
    //alignItems: 'center',
    justifyContent: "center",
    //alignSelf: "stretch",
    height: "100%",
    width: "100%",
    alignContent: "flex-start",
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
  },

  outerOpenProject: {
    flex: 1,
    height: "100%",
    borderWidth: 3,
    backgroundColor: "#f0c5fc",
    borderRadius: 10,
    borderColor: "#e3acf2",
    boxShadow: "0px 2px 4px rgba(144, 82, 157, 0.3)",
    paddingBottom: 10,
    // marginBottom: 15,
    // height: "95%",
    // alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default containerStyles;
