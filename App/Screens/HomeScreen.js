import React from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput
} from "react-native";

import SimplePager from "../Pagers/SimplePager";
import SearchBar from "../Components/SearchBar";

const HomeScreen = props => {
  let { navigation } = props;
  return (
    <View style={styles.container}>
      <SearchBar
        hint={"Where do you want to go?"}
        text={props.text}
        onInputChange={data => {
          props.text = data;
        }}
        navigation={navigation}
      />

      <SimplePager style={styles.viewpager} navigation={navigation} />
    </View>
  );
};
HomeScreen.navigationOptions = {
  title: "Tripper - Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  viewpager: {
    flex: 1
  }
});
export default HomeScreen;
