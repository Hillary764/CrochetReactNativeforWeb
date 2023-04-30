import { StyleSheet } from "react-native";

const counterTextStyles = StyleSheet.create({
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

  counterSubtitleText: {
    color: "#74198c",
    fontSize: 16,
    fontWeight: "bold",
  },

  counterFullCount: {
    fontSize: 48,
    color: "#70118a",
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "center",
  },

  counterCount: {
    color: "#70118a",

    width: "fit-content",
    minWidth: 50,
    fontSize: 30,
    textAlign: "center",
    alignSelf: "center",
    padding: 7,
    fontWeight: "bold",
    marginVertical: 10,
  },

  counterCountEditMode: {
    // marginTop: 10,
    backgroundColor: "#f8e8fc",

    borderRadius: 10,
    width: "60%",
    minWidth: 50,
    fontSize: 30,
    textAlign: "center",
    alignSelf: "center",
    padding: 7,
    marginVertical: 10,
  },

  minusIncrementText: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 8,
    color: "#70118a",
  },

  plusIncrementText: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 9,
    color: "#70118a",
    justifySelf: "center",
    alignSelf: "center",
  },

  utilityButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#620670",
  },
});

export default counterTextStyles;
