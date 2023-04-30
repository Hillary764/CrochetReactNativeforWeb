import { StyleSheet } from "react-native";

const counterStyles = StyleSheet.create({
  counterContainer: {
    alignSelf: "stretch",
    // alignItems: "center",
    // justifyContent: "center",
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#e3acf2",
    // backgroundColor: "#f2d7fa",
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    margin: 10,
    //testing stuff
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 2px 4px rgba(144, 82, 157, 0.3)",
  },
  counterTitleContainer: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "#eabaf7",
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#e3acf2",
  },

  counterIncrementButtonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    paddingBottom: 30,
  },
});

export default counterStyles;
