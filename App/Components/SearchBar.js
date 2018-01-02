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
import Icon from "react-native-vector-icons/MaterialIcons";
import List from "./SearchResultList";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import { getCitiesStartsWith } from "../Utils/ApiHelper";
const initialState = {
  modalVisible: false,
  modalHasText: false,
  data: []
};
class SearchBar extends Component {
  constructor() {
    super();
    this.state = initialState;
    console.log(Platform.OS);
  }
  resetState = () => {
    this.setState(initialState);
  };
  render() {
    let props = this.props;
    let state = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ modalVisible: true });
        }}
        activeOpacity={0}
        focusedOpacity={0}
      >
        <View style={styles.container}>
          {this.text(props.hint)}
          {this.searchIcon()}
          {this.modal()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
  modal = () => {
    let data = this.state.data;
    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.resetState();
          }}
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
      </View>
    );
  };

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
              getCitiesStartsWith(text)
                .then(response => {
                  let data = response && response.length > 0 ? response : {};
                  this.setState({ data });
                })
                .catch(err => console.log(err));
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
        onPress={() => this.resetState()}
      >
        <Icon name="arrow-back" size={25} color={BASE_COLOR} />
      </TouchableOpacity>
    );
  };
  searchIcon = () => {
    return (
      <View style={styles.icon}>
        <Icon name="search" size={25} color={BASE_COLOR} />
      </View>
    );
  };
  text = text => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.input}>
          {text}
        </Text>
      </View>
    );
  };
}

let deviceWidth = Dimensions.get("window").width;

const containerMargin = 10;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - containerMargin * 2,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginRight: containerMargin,
    marginLeft: containerMargin,
    marginTop: 10,
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 0.2
  },
  inputContainer: {
    width: deviceWidth - 70,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15
  },
  icon: {
    padding: 5,
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  modal: {
    height: 47,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    borderRadius: 3,
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  modalList: {
    width: DEVICE_WIDTH - 16,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 8,
    borderRadius: 3
  },
  modalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center"
  },
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
export default SearchBar;
