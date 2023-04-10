import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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

  sidebar: {
    // flex: 1,
    //width: 384,
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "#ebcdf7",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    alignSelf: "stretch",
    height: "100%",
    left: 0,
  },

  mainArea: {
    flex: 3,
    backgroundColor: "#f7ebfc",
    alignItems: "center",
    //justifyContent: 'space-around',
    alignSelf: "stretch",
  },

  mainAreaTests: {
    backgroundColor: "#f7ebfc",
    //alignItems: 'center',
    justifyContent: "center",
    //alignSelf: "stretch",
    height: "100%",
    width: "100%",
    alignContent: "flex-start",
    flex: 1,
  },

  mainAreaFlatlistTests: {
    position: "absolute",
    alignSelf: "start",
    width: "100%",
    flex: 1,
    // // left: 10,
  },

  logoutText: {
    fontSize: 14,
    textAlign: "center",
    color: "#3f344d",
  },

  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },

  projectTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  minusIncrementText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 5,
  },

  plusIncrementText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 3,
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "column",
    width: "100%",
  },

  projectTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#deb1f0",
    borderRadius: 25,
  },

  modal: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f1d2f7",
    height: "50%",
    width: "40%",
    borderRadius: "5px",
  },

  sortModal: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f1d2f7",
    height: "75%",
    width: "35%",
    borderRadius: "5px",
  },

  separator: {
    zIndex: 1,
    width: "90%",
    height: 5,
  },

  loading: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export { styles };
