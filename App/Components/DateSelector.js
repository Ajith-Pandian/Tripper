import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import DropDown from "./DropDownLayout";
import DatePicker from "react-native-datepicker";

export default class DateSelector extends Component {
  render() {
    return (
      <DropDown hasView={true} onClick={() => this.dateRef.onPressDate()}>
        <DatePicker
          style={{ flex: this.props.flex }}
          date={this.props.date}
          ref={dateRef => (this.dateRef = dateRef)}
          mode="date"
          placeholder="placeholder"
          format="DD-MM-YYYY"
          minDate="01-01-2000"
          maxDate="31-12-2999"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
        />
      </DropDown>
    );
  }
}
