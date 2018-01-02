import React from "react";
import { BigHeader } from "../Components/BigHeader";
import { Header } from "../Components/Header";
import ScrollableHeader from "../Components/ScrollableHeader";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

import PlacesCard from "../Components/PlacesCard";
import TabView from "../Components/TabView";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ListView
} from "react-native";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let data = Array.apply(null, { length: 10 }).map(Number.call, Number);
let dataSource = ds.cloneWithRows(data);
const ThingsTodo = props => {
  let { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      {/*<ScrollableHeader
        image={require("../images/ic_nothing_saved_hero.png")}
        navigation={navigation}
        title={"ThingsTodo"}
        headerMaxHeight={200}
        hasBackground={true}
      >
        <TabView />
        {/*<ListView
          dataSource={dataSource}
          renderRow={(rowData, sectionID, rowID) => <PlacesCard />}
          showsVerticalScrollIndicator={false}
        />
      </ScrollableHeader>*/}
      <Header
        header={"ThingsTodo"}
        navigation={navigation}
        headerColor={"black"}
        backIconColor={BASE_COLOR}
        backgroundColor={"white"}
        hasShadow={true}
        hasTopMargin={true}
      />
      <TabView navigation={navigation} />
    </View>
  );
};
{
  /*<BigHeader
  title={"ThingsTodo"}
  image={require("../images/ic_nothing_saved_hero.png")}
  navigation={navigation}
/>*/
}
ThingsTodo.navigationOptions = {
  header: null
};
export default ThingsTodo;
