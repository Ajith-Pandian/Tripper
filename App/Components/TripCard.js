import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import DropDown from "./DropDownLayout";
import DateSelector from "./DateSelector";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/MaterialIcons";

const TripCard = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: BASE_COLOR,
          marginLeft: 16,
          marginRight: 16,
          marginTop: 16,
          marginBottom: 16
        }}
      >
        Destination
      </Text>
      <View style={styles.cardRow}>
        <View style={styles.icon}>
          <Icon name="location-on" size={25} color={BASE_COLOR} />
        </View>
        <View style={styles.cityDropDown}>
          <DropDown
            text={"Newyork"}
            onClick={() => console.log("DropDown clicked")}
          />
        </View>
      </View>
      <View style={styles.space} />
      <View style={styles.cardRow}>
        <View style={styles.icon}>
          <Icon name="today" size={25} color={BASE_COLOR} />
        </View>
        <View style={styles.dateDropDown}>
          <DateSelector date={"20/07/2016"} flex={DATE_DROPDOWN_WIDTH} />
        </View>
        <View style={styles.space} />
        <View style={styles.dateDropDown}>
          <DateSelector date={"20/08/2016"} flex={DATE_DROPDOWN_WIDTH} />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <TouchableOpacity style={styles.cardRow}>
        <View style={styles.icon}>
          <Icon name="add-circle-outline" size={25} color={BASE_COLOR} />
        </View>
        <View style={styles.cityDropDown}>
          <Text style={{ color: BASE_COLOR }}>ADD DESTINATION </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ICON_WIDTH_PERCENTAGE = 15;
const SPACE = 10;
const CITY_DROPDOWN_WIDTH = 100 - (ICON_WIDTH_PERCENTAGE + SPACE);
const DATE_DROPDOWN_WIDTH = (CITY_DROPDOWN_WIDTH - SPACE / 4) / 2;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    paddingRight: 10
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "space-between"
  },
  icon: {
    flex: ICON_WIDTH_PERCENTAGE,
    alignItems: "center",
    justifyContent: "center"
  },
  cityDropDown: {
    flex: CITY_DROPDOWN_WIDTH
  },
  dateDropDown: {
    flex: DATE_DROPDOWN_WIDTH
  },
  space: {
    flex: SPACE / 4
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: BASE_COLOR,
    marginLeft: 10,
    marginBottom: 16
  }
});
export default TripCard;
