import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  StatusBar
} from "react-native";
import DatePicker from "react-native-datepicker";

import { BigHeader } from "../Components/BigHeader";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

const ReservationScreen = props => {
  let { navigation } = props;
  return (
    <View style={styles.container}>
      <BigHeader
        title={'Reservations'}
        image={require("../images/ic_reservations_hero.png")}
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
ReservationScreen.navigationOptions = {
  header: null
};

export default ReservationScreen;
