import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sidebar: {
    // flex: 1,
    //width: 384,
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "#eecffa",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    alignSelf: "stretch",
    height: "100%",
    left: 0,
    overflow: "hidden",
    borderRightWidth: 2,
    borderColor: "#e4bff2",
  },

  sidebarTopContainer: {
    width: "100%",
    height: "fit-content",
    paddingTop: 10,
    paddingBottom: 10,
    // boxShadow: "0px 2px 4px #c598d6",
    boxShadow: "0px 2px 4px rgba(104, 41, 128, 0.3)",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
  },

  sidebarBottomContainer: {
    width: "100%",
    height: "fit-content",
    paddingTop: 10,
    paddingBottom: 10,
    boxShadow: "0px -2px 4px rgba(104, 41, 128, 0.3)",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
  },

  mainAreaFlatlist: {
    position: "absolute",
    alignSelf: "start",

    width: "100%",
    flex: 1,
  },

  openProjectFlatlists: {
    // marginTop: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#da9deb",
    boxShadow: "0px 2px 4px rgba(144, 82, 157, 0.3)",
    // paddingHorizontal: 10,
    padding: 10,
  },

  // item: {
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   flexDirection: "column",
  //   width: "100%",
  // },

  projectTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",

    borderRadius: 25,
    borderWidth: 2.5,

    overflow: "hidden",
    height: 100,
    minHeight: "fit-content",
  },

  projectTileOpenColors: {
    backgroundColor: "#e3a7f2",
    borderColor: "#d998ed",
    boxShadow: "0px 2px 1px #be81d6",
  },

  projectTileClosedColors: {
    backgroundColor: "#da98eb",
    borderColor: "#cf87e6",
    boxShadow: "0px 2px 1px #b775d1",
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
    minWidth: "fit-content",
    borderRadius: "5px",
  },

  sortModal: {
    alignItems: "center",
    justifyContent: "center",
    // alignContent: "space-between",
    textAlign: "center",
    flexDirection: "column",
    padding: 0,
    backgroundColor: "#f1d2f7",
    height: "75%",
    width: "35%",
    borderRadius: "5px",
    minWidth: "fit-content",
    borderWidth: 2,
    borderColor: "#eabdf2",
    boxShadow: "0px 4px 2px rgba(69, 2, 82, 0.2)",
  },

  sortModalOptionContainer: {
    // borderTopWidth: "1px",
    // borderBottomWidth: "1px",
    // borderColor: "#591a6e",
    height: "50%",
    display: "flex",
    alignSelf: "flex-end",
    width: "100%",
    flex: 2,
    paddingBottom: 20,
  },

  sortModalTextContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  sortButtonContainer: {
    display: "flex",
    width: "100%",
    flex: 1,
    minHeight: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    // borderTopWidth: "1px",
    // borderBottomWidth: "1px",
    // borderColor: "#591a6e",
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
