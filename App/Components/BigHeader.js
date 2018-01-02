import React from "react";

import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, StyleSheet, Image } from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import { Header } from "./Header";

export const BigHeader = props => {
  let { navigation, title,image } = props;
  return (
    <View style={[styles.headerContainer, styles.cardShadow]}>
      <View style={{ flex: 1 }}>
        <Image
          source={image}
          style={{ flex: 1, height: 120, width: DEVICE_WIDTH }}
          resizeMode="stretch"
        />
      </View>
      <Header
        navigation={navigation}
        header={title}
        headerColor={"black"}
        backIconColor={BASE_COLOR}
        backgroundColor={"white"}
        hasShadow={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 200,
    marginTop: 20,
    backgroundColor: "white"
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  backIcon: {
    marginLeft: 16,
    marginRight: 16
  }
});
