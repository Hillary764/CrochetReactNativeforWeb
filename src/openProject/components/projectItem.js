import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { buttonStyles } from "../../styles/buttonStyles";
import textStyles from "../../styles/textStyles";
import { userContext } from "../../App";
import { firestore } from "../../firebaseSetup";
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
        <View style={styles.projectTile}>
          <TouchableOpacity
            onPress={() => displayProject(data)}
            style={[styles.item]}
          >
            <Text style={textStyles.paragraph}>{data.name}</Text>
            <Text style={textStyles.paragraph}>Close Project</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyles.deleteButton}
            onPress={() => deleteProject(data)}
          >
            <Text style={textStyles.paragraph}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.projectTile}>
          <TouchableOpacity
            onPress={() => displayProject(data)}
            style={[styles.item]}
          >
            <Text style={textStyles.paragraph}>{data.name}</Text>
            <Text style={textStyles.paragraph}>Open Project</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyles.deleteButton}
            onPress={() => deleteProject(data)}
          >
            <Text style={textStyles.paragraph}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProjectItem;
