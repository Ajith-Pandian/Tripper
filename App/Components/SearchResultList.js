import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AppState,
  ListView,
  TouchableOpacity
} from "react-native";

import { BASE_COLOR } from "../Styles";
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const ResultListView = props => {
  return (
    <ListView
      style={styles.container}
      dataSource={ds.cloneWithRows(props.rowData)}
      renderRow={data =>
        <ListItem
          {...data}
          onItemPressed={Id => props.onListItemPressed(Id)}
        />}
      enableEmptySections={true}
    />
  );
};

const ListItem = props => {
  let { City } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        props.onItemPressed(props.No);
      }}
    >
      <View style={styles.listItemContainer}>
        <Text style={styles.item} maxLength={20}>
          {City}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItemContainer: {
    height: 47,
    justifyContent: "center",
    margin: 2,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: BASE_COLOR
  },
  item: {
    fontSize: 17
  }
});
export default ResultListView;
