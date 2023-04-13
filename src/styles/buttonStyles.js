import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  touchableOpacityProfile: {
    width: 120,
    height: 35,
    backgroundColor: "#dfc4ff",
    right: "5%",
    top: 1,
    borderRadius: 90,
    justifyContent: "center",
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
  incrementButton: {
    backgroundColor: "#dbbae8",
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
    resizeMode: "contain",
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  deleteButton: {
    backgroundColor: "#c284db",
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
    width: 90,
    height: 35,
    backgroundColor: "#dfc4ff",
    borderRadius: 90,
    justifyContent: "center",
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
    height: "100%",
    minHeight: "fit-content",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: "10px",
  },
});

export { buttonStyles };
