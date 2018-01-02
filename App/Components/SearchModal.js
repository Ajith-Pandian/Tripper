import React, { Component } from "react";

import {
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Platform,
  ScrollView
} from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import List from "./SearchResultList";
import { getCitiesStartsWith } from "../Utils/ApiHelper";

export default class SearchModal extends Component {
  constructor() {
    super();
    this.state = {
      modalHasText: false,
      data: []
    };
    console.log(Platform.OS);
  }
  render() {
    let data = this.state.data;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.resetState();
        }}
        onShow={() => this.setState({ overlayVisible: true })}
      >
        <View style={styles.overlay} />
        <View style={styles.modal}>
          {this.backArrow()}
          <View style={styles.modalSearchBoxContainer}>
            {this.searchBox()}
            {this.state.modalHasText ? this.closeButton() : null}
          </View>
        </View>
        <View
          style={[
            styles.modalList,
            this.getListViewHeight(
              this.state.modalHasText ? this.state.data : null
            )
          ]}
        >
          <List
            rowData={this.state.modalHasText ? data : {}}
            onListItemPressed={id => {
              this.props.navigation.navigate("Planner");
              this.resetState();
            }}
          />
        </View>
      </Modal>
    );
  }

  getListViewHeight = data => {
    let reultSize = data ? data.length : 0;
    const listItemHeight = 50;
    let listViewHeight =
      reultSize > 0
        ? reultSize <= 4 ? reultSize * listItemHeight : 4 * listItemHeight
        : 0;
    return {
      height: listViewHeight
    };
  };
  searchBox = () => {
    return (
      <View style={styles.modalTextInputContainer}>
        <TextInput
          autoFocus={true}
          style={styles.modalTextInput}
          selectionColor={BASE_COLOR}
          placeholder="Search"
          underlineColorAndroid={"transparent"}
          onChangeText={text => {
            this.setState({ modalHasText: text.length > 0 });
            if (text.length > 0)
              getCitiesStartsWith(text).then(response => {
                let data = response && response.length > 0 ? response : {};
                this.setState({ data });
              });
            else this.setState({ data: {} });
          }}
          ref={"input"}
        />
      </View>
    );
  };
  backArrow = () => {
    return (
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => this.props.onClose()}
      >
        <Icon name="arrow-back" size={25} color={BASE_COLOR} />
      </TouchableOpacity>
    );
  };

  closeButton = () => {
    return (
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => {
          this.refs.input.clear();
          this.setState({ modalHasText: false });
        }}
      >
        <Icon name="close" size={25} color={BASE_COLOR} />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  modalSearchBoxContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  modalTextInputContainer: {
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  modalTextInput: {
    fontSize: 15,
    width: DEVICE_WIDTH - 90
  },
  backIcon: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  closeIcon: {
    marginLeft: 4,
    marginRight: 4,
    position: "absolute",
    right: 0
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
