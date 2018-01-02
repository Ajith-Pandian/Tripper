import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import PropTypes from "prop-types";
import { BASE_COLOR } from "../Styles";

const deviceWidth = Dimensions.get("window").width;
const DOT_SIZE = 6;
const DOT_SAPCE = 4;

const styles = StyleSheet.create({
  tab: {
    alignItems: "center"
  },

  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: BASE_COLOR,
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE
  },

  curDot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#80ACD0",
    margin: DOT_SAPCE,
  },
  container: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  }
});

export default class PageIndicator extends Component {
  constructor() {
    super();
    this.state = {
      viewWidth: 0
    };
  }

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity
        style={styles.tab}
        key={"idc_" + page}
        onPress={() => this.props.goToPage(page)}
      >
        <View style={styles.dot} />
      </TouchableOpacity>
    );
  }

  render() {
    var pageCount = this.props.pageCount;
    var itemWidth = DOT_SIZE + DOT_SAPCE * 2;
    var offset =
      (this.state.viewWidth - itemWidth * pageCount) / 2 +
      itemWidth * this.props.activePage;

    //var left = offset;
    var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [offsetX, offsetX + itemWidth]
    });

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i));
    }

    return (
      <View style={styles.container}>
        <View
          style={styles.tabs}
          onLayout={event => {
            var viewWidth = event.nativeEvent.layout.width;
            if (!viewWidth || this.state.viewWidth === viewWidth) {
              return;
            }
            this.setState({
              viewWidth: viewWidth
            });
          }}
        >
          {indicators}
          <Animated.View style={[styles.curDot, { left }]} />
        </View>
      </View>
    );
  }
}
PageIndicator.propTypes = {
  goToPage: PropTypes.func,
  activePage: PropTypes.number,
  pageCount: PropTypes.number
};
