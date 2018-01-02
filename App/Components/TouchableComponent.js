import React, { Component } from "react";

import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
const TouchableComponent = props => {
  return Platform.OS == "ios"
    ? <IosTouchable {...props} />
    : <AndroidTouchable {...props} />;
};

const AndroidTouchable = props =>
  <TouchableNativeFeedback
    onPress={() => props.onPress()}
    background={TouchableNativeFeedback.SelectableBackground()}
  >
    <View>
      {props.children}
    </View>
  </TouchableNativeFeedback>;

const IosTouchable = props =>
  <TouchableOpacity onPress={() => props.onPress()} activeOpacity={0.7}>
    {props.children}
  </TouchableOpacity>;

export default TouchableComponent;
