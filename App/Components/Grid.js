import AutoResponsive from "autoresponsive-react-native";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

const Grid = props => {
  return (
    <View style={styles.container}>
      <AutoResponsive {...getAutoResponsiveProps()}>
        {renderChildren(props.data,props.onChildClick)}
      </AutoResponsive>
    </View>
  );
};

function renderChildren(data, onChildClick) {
  return data.map((item, key) => {
    let image = item.image;
    let itemStyle = getChildrenStyle(key);
    return (
      <View style={itemStyle} key={key}>
        <TouchableWithoutFeedback
          onPress={() => {
            onChildClick(key);
          }}
        >
          <View>
            <Image
              style={(styles.itemBackgroundImage, itemStyle)}
              source={image}
              resizeMode={"stretch"}
            />
            <Text style={styles.itemTitle}>
              {item.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  });
}

function getChildrenStyle(num) {
  let height1 = 150,
    height2 = 200,
    height = 0;
  num = num % 2;
  if (num == 0) {
    height = isFirst ? height1 : height2;
    isFirst = !isFirst;
  } else {
    height = isSecond ? height2 : height1;
    isSecond = !isSecond;
  }
  return {
    width: DEVICE_WIDTH / 2 - 11,
    height: height,
    borderRadius: 3
  };
}

function getAutoResponsiveProps() {
  return {
    itemMargin: 8
  };
}

let isFirst = true,
  isSecond = true;
const getStyle = num => {
  let height1 = 100,
    height2 = 200,
    height = 0;
  num = num % 2;
  if (num == 0) {
    height = isFirst ? height1 : height2;
    isFirst = !isFirst;
  } else {
    height = isSecond ? height2 : height1;
    isSecond = !isSecond;
  }
  return height;
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8
  },

  itemBackgroundImage: {
    borderRadius: 4,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "stretch",
    zIndex: -1,
    padding: 5
  },
  itemTitle: {
    color: "white",
    alignSelf: "center",
    backgroundColor: "transparent",
    bottom: 0,
    position: "absolute",
    marginBottom: 10
  }
});
export default Grid;
