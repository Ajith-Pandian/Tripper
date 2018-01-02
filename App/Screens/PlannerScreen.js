import React, { Component } from "react";
import {
  View,
  Text,
  ToolbarAndroid,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Gird from "../Components/Grid";
import { BigHeader } from "../Components/BigHeader";
import { Header } from "../Components/Header";
import ScrollableHeader from "../Components/ScrollableHeader";
import Grid from "../Components/Grid";
import { getData } from "../Data";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

import Tab1 from "../PlannerTabs/Tab1";
import { TabNavigator } from "react-navigation";

const handleGridItemClick = (navigation, index) => {
  let rootName = "Reservations";
  switch (index) {
    case 0:
      rootName = "Reservations";
      break;
    case 1:
      rootName = "ThingsTodo";
      break;
    case 2:
      rootName = "SavedPlaces";
      break;
  }
  navigation.navigate(rootName);
};
const CreateTripLayout = props => {
  let { navigation } = props;

  return (
    <View style={styles.createTripLayout}>
      <Text style={{ color: BASE_COLOR, margin: 4, fontSize: 14 }}>
        Add to your trips
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateTrip")}>
        <Text style={styles.createTripText}>CREATE TRIP</Text>
      </TouchableOpacity>
    </View>
  );
};
const PlannerScreen = props => {
  let { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <ScrollableHeader
        navigation={navigation}
        title={"Newyork"}
        image={require("../images/newyork.jpg")}
        headerMaxHeight={250}
        hasBackground={false}
      >
        <CreateTripLayout navigation={navigation} />
        <Gird
          data={getData()}
          onChildClick={childIndex => {
            handleGridItemClick(navigation, childIndex);
            console.log(`Item ${childIndex} clicked`);
          }}
        />
      </ScrollableHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  createTripLayout: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingLeft: 8
  },
  createTripText: {
    color: "#4186F3",
    alignSelf: "flex-end",
    margin: 4,
    fontSize: 14,
    fontWeight: "600"
  }
});

PlannerScreen.navigationOptions = {
  header: null
};

export default PlannerScreen;
