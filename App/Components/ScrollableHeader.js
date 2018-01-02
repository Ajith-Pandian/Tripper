import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Header } from "./Header";

import Tab1 from "../PlannerTabs/Tab1";
import TabView from "./TabView";
import { TabNavigator } from "react-navigation";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import PlannerGrid from "./PlannerGrid";
import Gird from "./Grid";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 45 : 55;
const MARGIN_TOP = Platform.OS === "ios" ? 30 : 32;
const TOTAL_HEADER_HEIGHT = HEADER_MIN_HEIGHT + MARGIN_TOP;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - TOTAL_HEADER_HEIGHT;

const transparentHeader = {
  headerTextColor: "white",
  backIconColor: "white",
  backgroundColor: "transparent",
  hasShadow: false
};
const solidHeader = {
  headerTextColor: "black",
  backIconColor: BASE_COLOR,
  backgroundColor: "white",
  hasShadow: true
};
const semiTransparentHeader = {
  headerTextColor: "black",
  backIconColor: BASE_COLOR,
  backgroundColor: "transparent",
  hasShadow: false
};
export default class ScrollableHeader extends Component {
  constructor(props) {
    super(props);
    let { hasBackground } = this.props;

    this.state = {
      scrollY: new Animated.Value(0),
      header: hasBackground ? semiTransparentHeader : transparentHeader,
      statusBarColor: "transparent"
    };
  }

  componentDidMount() {
    let { hasBackground } = this.props;
    this.state.scrollY.addListener(({ value }) => {
      let hasHeader = HEADER_SCROLL_DISTANCE - 5 <= value;

      //console.log(value);
      //  console.log("hasHeader " + hasHeader);
      //  console.log("hasBackground" + hasBackground);
      header = hasHeader
        ? solidHeader
        : hasBackground ? semiTransparentHeader : transparentHeader;
      statusBarColor = hasBackground ? "white" : "#E9E9EF";

      this.setState({ header, statusBarColor });
    });
  }

  _renderScrollViewContent = children => {
    return (
      <View style={styles.scrollViewContent}>
        {children}
      </View>
    );
  };

  render() {
    let { navigation, children, header, image, title } = this.props;
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });
    return (
      <View style={[styles.fill, styles.cardShadow]}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {this._renderScrollViewContent(children)}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: this.state.statusBarColor },
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={image}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ translateY: titleTranslate }] //{ scale: titleScale },
            }
          ]}
        >
          {
            <Header
              header={title}
              navigation={navigation}
              headerColor={this.state.header.headerTextColor}
              backIconColor={this.state.header.backIconColor}
              backgroundColor={this.state.header.backgroundColor}
              hasShadow={this.state.header.hasShadow}
            />
          }
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  content: {
    flex: 1
  },
  createTripLayout: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingLeft: 8
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    //backgroundColor: "transparent",
    marginTop: MARGIN_TOP,
    //height: Platform.OS === "ios" ? 30 : 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4
  }
});
