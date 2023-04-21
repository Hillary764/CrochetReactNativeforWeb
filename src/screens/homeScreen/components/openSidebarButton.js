import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import { buttonStyles } from "../../../styles/buttonStyles";
import textStyles from "../../../styles/textStyles";
import { userContext } from "../../../App";
import { firestore } from "../../../firebaseSetup";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

const OpenSidebarButton = ({ pressFunction }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressFunction}
      style={[buttonStyles.touchableOpacityProfile]}
    >
      <Text style={textStyles.logoutText}>Projects</Text>
    </TouchableOpacity>
  );
};

export default OpenSidebarButton;
