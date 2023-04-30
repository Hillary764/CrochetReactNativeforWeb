import { StyleSheet } from "react-native";

const counterButtonStyles = StyleSheet.create({
  incrementButton: {
    backgroundColor: "#e5b3f2",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    height: "fit-content",
    borderWidth: 3,
    borderRadius: 25,
    borderColor: "#dba2eb",
    display: "flex",
    boxShadow: "0px 2px 3px rgba(74, 7, 92, 0.35)",
    flex: 1,
    paddingVertical: 8,
  },

  utilityButtons: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    minWidth: 200,
    width: "45%",
    height: "fit-content",
    borderWidth: 3,
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,

    // backgroundColor: "#e4afed",
    // borderColor: "#d395de",
    // boxShadow: "0px 2px 3px rgba(105, 8, 120, 0.2)",
    backgroundColor: "#e5b3f2",
    borderColor: "#dba2eb",
    boxShadow: "0px 2px 3px rgba(74, 7, 92, 0.35)",
  },
});

export default counterButtonStyles;
