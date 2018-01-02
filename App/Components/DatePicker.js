import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  Modal,
  Animated
} from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import DropDown from "./DropDownLayout";
import Icon from "react-native-vector-icons/MaterialIcons";
export class IosDatePickerModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      modalVisible: props.modalVisible,
      animatedHeight: new Animated.Value(0),
      date: new Date()
    };
  }
  setModalVisible(visible) {
    const { height, duration } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration
      }).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }
  render() {
    console.log("Modal");
    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => this.setState({ overlayVisible: true })}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.overlay} />
          <View style={styles.datePickerContainer}>
            <DatePickerIOS
              style={{ height: 150 }}
              date={this.state.date}
              onDateChange={date => this.setState({ date })}
              mode="date"
            />
          </View>
        </Modal>
      </View>
    );
  }
}
export default class DatePicker extends Component {
  constructor() {
    super();
    this.state = { date: new Date(), isIos: false };
    this.showAndroidDatePicker = this.showAndroidDatePicker.bind(this);
    this.showIosDatePicker = this.showIosDatePicker.bind(this);
  }
  async showAndroidDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dateSetAction) {
        console.log("selected");
      }
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log("cancelled");
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }
  showIosDatePicker() {}
  openDatePicker = () => {
    if (Platform.OS === "ios") this.setState({ isIos: true });
    else {
      this.showAndroidDatePicker();
    }
  };

  render() {
    return (
      <View>
        <DropDown text={"Thu, Jul 20"} onClick={() => this.openDatePicker()} />
        {this.state.isIos
          ? <IosDatePickerModal modalVisible={this.state.isIos} />
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  datePickerContainer: {
    backgroundColor: "white"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});
