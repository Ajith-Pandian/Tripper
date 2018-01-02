import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import ViewPager from "react-native-viewpager";
//var ViewPager = require('./ViewPager');
let deviceWidth = Dimensions.get("window").width;

let IMGS = [
  "https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024",
  "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024",
  "https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024",
  "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024",
  "https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024",
  "https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024",
  "https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024"
];

var count = 0;
var dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2
});
export default class TopPager extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: dataSource.cloneWithPages(IMGS),
      page: 0
    };
  }

  render() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        isLoop={true}
        autoPlay={true}
        renderPageIndicator={this.renderPageIndicator}
      />
    );
  }

  renderPage(data, pageID) {
    return <Image source={{ uri: data }} style={styles.page} />;
  }

}

const styles = StyleSheet.create({
  page: {
    width: deviceWidth
  }
});
