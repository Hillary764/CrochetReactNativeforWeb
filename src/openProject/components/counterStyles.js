import { StyleSheet } from "react-native";

const counterStyles = StyleSheet.create({
  counterContainer: {
    alignSelf: "stretch",
    // alignItems: "center",
    // justifyContent: "center",
    borderWidth: 3,
    borderRadius: 5,
    // borderColor: "#eabcf7",
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
  },
  counterTitleContainer: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "#eabaf7",
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#e3acf2",
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // borderBottomWidth: 3,
    // borderBottomColor: "#da9deb",
    color: "#84249e",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    textAlign: "Center",
    width: "100%",
    // backgroundColor: "#eabaf7",
    // boxShadow: "0px 2px 4px rgba(144, 82, 157, 0.3)",
  },

  counterTitleEditMode: {
    marginTop: 10,
    backgroundColor: "#f8e8fc",
    borderRadius: 10,
    width: "95%",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
  },
});

export default counterStyles;
