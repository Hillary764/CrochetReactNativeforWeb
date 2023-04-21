import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { styles } from "../../../styles/styles.js";
import { buttonStyles } from "../../../styles/buttonStyles.js";
import textStyles from "../../../styles/textStyles.js";
import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

const SortButton = ({ pressFunction, sortType }) => {
  // const currentColor = useSharedValue(0);

  // const colorStyle = useAnimatedStyle(() => {
  //   const backgroundColor = interpolateColor(
  //     currentColor.value,
  //     [0, 1],
  //     ["#e0a8df", "#f7cbf7"]
  //   );

  //   return {
  //     backgroundColor,
  //   };
  // });

  return (
    <Animated.View style={[styles.sortButtonContainer]}>
      <TouchableOpacity
        style={
          sortType === "Cancel"
            ? [
                buttonStyles.touchableOpacitySort,
                buttonStyles.touchableOpacitySortCancel,
              ]
            : [buttonStyles.touchableOpacitySort]
        }
        onPress={pressFunction}
      >
        <Text style={[textStyles.sortButtonText]}>{sortType}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SortButton;
