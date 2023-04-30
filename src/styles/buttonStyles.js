import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  touchableOpacityProfile: {
    width: "fit-content",
    paddingRight: 30,
    paddingLeft: 30,
    height: 35,
    backgroundColor: "#dfc4ff",
    // right: "5%",
    marginRight: 20,
    marginLeft: 20,
    top: 1,
    borderRadius: 15,
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#c9afed",
    boxShadow: "0px 2px 1px #9a7fba",
  },

  touchableOpacityModal: {
    display: "flex",
    width: 120,
    height: 35,
    backgroundColor: "#e0a8df",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  touchableOpacityInnerSidebar: {
    marginTop: 10,
    marginBottom: 10,
    padding: 25,
    borderRadius: 20,
    width: "90%",
    height: "fit-content",
    backgroundColor: "#e0aaf2",
    borderWidth: 2,
    borderColor: "#bd8cd1",
    boxShadow: "0px 2px 1px #cb96e0",
  },

  // touchableOpacitySortModal: {
  //   display: "flex",
  //   width: "fit-content",
  //   paddingLeft: "10px",
  //   paddingRight: "10px",
  //   height: 35,
  //   backgroundColor: "#e0a8df",
  //   borderRadius: 90,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  googleLoginButton: {
    width: 300,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfc4ff",
    borderRadius: 85,
  },

  floatingButton: {
    resizeMode: "contain",
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  openCloseProjectButton: {
    flex: 2,
    // backgroundColor: "lime",
  },

  deleteButton: {
    backgroundColor: "#d998ed",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    // width: 75,
    height: "100%",
    flex: 1,
  },

  menuButton: {
    // width: 90,
    // height: 35,
    // backgroundColor: "#dfc4ff",
    // borderRadius: 90,
    // justifyContent: "center",
    width: 100,
    height: "60px",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    // top: 0,
  },

  addCounterButton: {
    backgroundColor: "#dbbae8",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: 150,
    height: 35,
    borderRadius: 50,
  },

  touchableOpacitySort: {
    height: "90%",
    minHeight: "fit-content",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: "10px",
    backgroundColor: "#e9b1f0",
    borderRadius: 25,
    borderColor: "#e1a2eb",
    borderWidth: 3,
    boxShadow: "0px 2px 1px #cb96e0",
  },

  touchableOpacitySortCancel: {
    backgroundColor: "#e0a6ed",
    boxShadow: "0px 2px 1px #cb96e0",
    borderColor: "#ca92de",
  },
});

export { buttonStyles };
