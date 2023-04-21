import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import { buttonStyles } from "../../../styles/buttonStyles";
import textStyles from "../../../styles/textStyles";
import { userContext } from "../../../App";
import { firestore } from "../../../firebaseSetup";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

const ProjectItem = ({
  data,
  displayProject,
  openProjectList,
  setOpenProjectList,
}) => {
  const user = React.useContext(userContext);

  async function deleteProject(project) {
    try {
      let copyOPL = JSON.parse(JSON.stringify(openProjectList));

      let projectLocation = false;

      for (let i = 0; i < copyOPL.length && projectLocation === false; i++) {
        if (copyOPL[i].key == project.key) {
          projectLocation = i;
        }
      }

      if (projectLocation !== false) {
        copyOPL.splice(projectLocation, 1);
      }

      setOpenProjectList(copyOPL);
      await deleteDoc(
        doc(firestore, "Users", user.uid, "Projects", project.key)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {data.opened ? (
        <View style={[styles.projectTile, styles.projectTileClosedColors]}>
          <TouchableOpacity
            onPress={() => displayProject(data)}
            style={[buttonStyles.openCloseProjectButton]}
          >
            <Text
              style={[
                textStyles.sidebarButtonText,
                { paddingLeft: 5, paddingRight: 6 },
              ]}
              numberOfLines={2}
            >
              {data.name}
            </Text>
            <Text style={[textStyles.sidebarButtonText, { fontSize: 18 }]}>
              Close Project
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.deleteButton, { backgroundColor: "#c97be0" }]}
            onPress={() => deleteProject(data)}
          >
            <Text style={textStyles.sidebarButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.projectTile, styles.projectTileOpenColors]}>
          <TouchableOpacity
            onPress={() => displayProject(data)}
            style={[buttonStyles.openCloseProjectButton]}
          >
            <Text
              style={[
                textStyles.sidebarButtonText,
                { paddingLeft: 5, paddingRight: 5 },
              ]}
              numberOfLines={2}
            >
              {data.name}
            </Text>
            <Text style={[textStyles.sidebarButtonText, { fontSize: 18 }]}>
              Open Project
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyles.deleteButton}
            onPress={() => deleteProject(data)}
          >
            <Text style={textStyles.sidebarButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProjectItem;
