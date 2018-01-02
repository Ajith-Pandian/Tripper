import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import DatePicker from "react-native-datepicker";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const DropDown = props => {
  return (
    <ClickableView {...props}>
      <DropDownLayout {...props} />
    </ClickableView>
  );
};

const DropDownLayout = props => {
  return (
    <View style={[props.style, styles.dropDownContainer]}>
      {props.hasView
        ? props.children
        : <Text style={{ padding: 4 }}>
            {props.text}
          </Text>}
      <Icon name="arrow-drop-down" size={25} color={BASE_COLOR} />
    </View>
  );
};
const ClickableView = props => {
  return (
    <TouchableOpacity onPress={() => props.onClick()}>
      {props.children}
    </TouchableOpacity>
  );
};
const NonClickableView = props => {
  return (
    <View style={[props.style, styles.dropDownContainer]}>
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: BASE_COLOR
  }
});
export default DropDown;
