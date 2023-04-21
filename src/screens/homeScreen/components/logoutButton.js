import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import { buttonStyles } from "../../../styles/buttonStyles";
import textStyles from "../../../styles/textStyles";

import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

const LogoutButton = ({ pressFunction }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressFunction}
      style={buttonStyles.touchableOpacityProfile}
    >
      <Text style={textStyles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
