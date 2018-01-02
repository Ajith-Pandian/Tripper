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

import { Header } from "../Components/Header";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import TripCard from "../Components/TripCard";

class CreateTrip extends Component {
  state = { text: "Trip to Newyork" };
  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          header={"Create trip"}
          headerColor={"black"}
          backIconColor={BASE_COLOR}
          backgroundColor={"white"}
          hasShadow={true}
          hasTopMargin={true}
        />
        <View style={styles.titleContainer}>
          <Text>Trip name</Text>
          <TextInput
            style={styles.inputContainer}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            selectionColor={BASE_COLOR}
            underlineColorAndroid={BASE_COLOR}
          />
        </View>
        <TripCard />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight
  },
  titleContainer: {
    margin: 20
  },
  inputContainer: {
    marginBottom: 5,
    marginTop: 5
  }
});
CreateTrip.navigationOptions = {
  header: null
};

export default CreateTrip;
