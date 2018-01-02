import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  TabViewAnimated,
  TabBar,
  SceneMap,
  TabViewPagerScroll,
  TabViewPagerPan
} from "react-native-tab-view";
import Tab1 from "../PlannerTabs/Tab1";
let scrollY = 0;

const SecondRoute = () => <View />;
export default class TabViewExample extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      index: 0,
      routes: [{ key: "1", title: "First" }, { key: "2", title: "Second" }],
      scroll: scrollY
    };
  }
  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props =>
    <TabBar
      {...props}
      indicatorStyle={{ height: 3, backgroundColor: "#4186F3" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ color: "black" }}
    />;

  _renderPager = props => {
    return Platform.OS === "ios"
      ? <TabViewPagerScroll {...props} />
      : <TabViewPagerPan {...props} />;
  };
  render() {
    let { navigation } = this.props;
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={SceneMap({
          "1": function() {
            return (
              <View style={[styles.container, { backgroundColor: "white" }]}>
                <Tab1
                  onVerticalScroll={value => (scrollY = value)}
                  onClick={() => console.log("Tab clicked")}
                  navigation={navigation}
                />
              </View>
            );
          },
          "2": SecondRoute
        })}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
