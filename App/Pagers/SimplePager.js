import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";

import ViewPager from "react-native-viewpager";
import PageIndicator from "./PageIndicator";

//var ViewPager = require('./ViewPager');
let deviceWidth = Dimensions.get("window").width;

const IMGS = [
  "https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=512",
  "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=512",
  "https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=512",
  "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=512",
  "https://images.unsplash.com/photo-1441126270775-739547c8680c?h=512",
  "https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=512",
  "https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=512"
];

var count = 0;
var dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2
});
export default class SimplePager extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: dataSource.cloneWithPages(IMGS),
      page: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 190
          }}
        >
          <ViewPager
            ref={viewpager => {
              this.viewpager = viewpager;
            }}
            dataSource={this.state.dataSource}
            renderPage={this._renderPage}
            isLoop={true}
            autoPlay={false}
            renderPageIndicator={this.renderPageIndicator}
          />
        </View>
        {/*<View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.viewpager.goToPage(count + 1);
              count = count + 1;
            }}
          >
            <Text style={{ fontSize: 20 }}>Click</Text>
          </TouchableHighlight>
        </View>*/}
      </View>
    );
  }

  _renderPage = (data, pageID) => {
    let { navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Planner")}>
        <Image source={{ uri: data }} style={styles.page} />
      </TouchableWithoutFeedback>
    );
  };
  renderPageIndicator() {
    return <PageIndicator />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flex: 1
  },
  page: {
    height: 150,
    width: deviceWidth - 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3
  },
  button: {
    padding: 5,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 5
  }
});
