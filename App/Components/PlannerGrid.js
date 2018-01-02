import React from "react";
import {
  TextInput,
  Text,
  View,
  ListView,
  StyleSheet,
  Image
} from "react-native";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import { getData } from "../Data";
const PlannerGrid = () => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  let data = Array.apply(null, { length: 20 }).map(Number.call, Number);
  let dataSource = ds.cloneWithRows(getData());
  return (
    <View style={styles.container}>
      <ListView
        contentContainerStyle={styles.list}
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) => {
          let image = rowData.image;
          let itemStyle = getStyle(rowID, data.length);
          return (
            <View style={(styles.defaultItem, itemStyle)}>
              <Image
                style={
                  (
                    {
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
                    itemStyle
                  )
                }
                source={image}
                resizeMode={"stretch"}
              />
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  backgroundColor: "transparent",
                  bottom: 0,
                  position: "absolute",
                  marginBottom: 10
                }}
              >
                {rowData.name}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

let isFirst = true,
  isSecond = true;
const getStyle = (num, size) => {
  let { item1, item2 } = styles;
  let itemStyle = null;
  num = num % 2;
  if (num == 0) {
    itemStyle = isFirst ? item1 : item2;
    isFirst = !isFirst;
  } else {
    itemStyle = isSecond ? item2 : item1;
    isSecond = !isSecond;
  }
  return itemStyle;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5
  },
  defaultItem: {
    margin: 3
  },
  item1: {
    height: 200,

    width: DEVICE_WIDTH / 2 - 11
  },
  item2: {
    height: 100,
    width: DEVICE_WIDTH / 2 - 11
  }
});
export default PlannerGrid;
