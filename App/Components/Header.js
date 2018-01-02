import React from "react";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import TouchableComponent from "./TouchableComponent";

import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

const BackArrow = props => {
  return (
    <TouchableOpacity style={styles.backIcon} onPress={e => props.onPress(e)}>
      <Icon name="arrow-back" size={25} color={props.color} />
    </TouchableOpacity>
  );
};
const getCardShadow = hasShadow => {
  return hasShadow ? styles.cardShadow : {};
};
const getTopMargin = hasTopMargin => {
  return hasTopMargin
    ? { marginTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight }
    : {};
};
const getHeaderHeight = headerHeight => {
  let height = headerHeight ? headerHeight : Platform.OS === "ios" ? 50 : 60;
  return { height };
};
export const Header = props => {
  let { navigation } = props;
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: props.backgroundColor },
        getCardShadow(props.hasShadow),
        getTopMargin(props.hasTopMargin),
        getHeaderHeight(props.headerHeight)
      ]}
    >
      <BackArrow
        color={props.backIconColor}
        onPress={() => navigation.goBack(null)}
      />
      <Text
        style={{
          fontSize: Platform.OS === "ios" ? 18 : 20,
          color: props.headerColor
        }}
      >
        {props.header}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    zIndex: 10,

    width: DEVICE_WIDTH,
    alignItems: "center"
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4
  },
  backIcon: {
    marginLeft: 16,
    marginRight: 16
  }
});
