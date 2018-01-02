import React, { Component } from "react";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground
} from "react-native";
import TouchableComponent from "./TouchableComponent";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
let starColor = "#E07201";
const FONT_SIZE = 15;

const starHalf = <Icon name="star-half" size={FONT_SIZE} color={starColor} />;
const MARGIN = {
  marginLeft: 4,
  marginRight: 4
};
const getFullStars = size => {
  let stars = [];
  for (var i = 0; i < size; i++) {
    stars.push(<Icon name="star" key={i} size={FONT_SIZE} color={starColor} />);
  }
  return stars;
};
const ReviewsAndStars = props => {
  let { stars } = props;
  stars = +stars.toFixed(5);
  let fullStars = Math.floor(stars);
  return (
    <View style={styles.ratingsLayout}>
      <Text style={[{ color: starColor, fontSize: FONT_SIZE * 0.8 }, MARGIN]}>
        {stars}
      </Text>
      <View style={{ flexDirection: "row" }}>
        {getFullStars(fullStars)}
        {starHalf}
      </View>
      {/*<Text style={[{ fontSize: FONT_SIZE * 0.8 }, MARGIN]}>14087 reviews</Text>*/}
    </View>
  );
};
const Ratings = props => {
  return (
    <View style={styles.detailsLayout}>
      <View style={styles.starsLayout}>
        <ReviewsAndStars stars={props.stars} />
        <FavoriteStar
          isFavorite={props.isFavorite}
          onSelected={state => props.onFavoriteClicked(state)}
        />
      </View>
      <View>
        {/*<Text style={[styles.availabilityText, MARGIN]}>
          OPEN UNTILL 1:00 AM
        </Text>*/}
        <Text style={[styles.detailsText, MARGIN]}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};
class FavoriteStar extends Component {
  state = { isSelected: this.props.isFavorite };
  render() {
    let { isSelected } = this.state;

    const solidStar = (
      <Icon name="star" size={FONT_SIZE * 1.5} color={starColor} />
    );
    const borderStar = (
      <Icon name="star-border" size={FONT_SIZE * 1.5} color={BASE_COLOR} />
    );
    return (
      <TouchableComponent
        onPress={() => {
          isSelected = !isSelected;
          this.props.onSelected(isSelected);
          this.setState({ isSelected });
        }}
      >
        {isSelected ? solidStar : borderStar}
      </TouchableComponent>
    );
  }
}

const getContainerStyle = isLast => {
  return {
    marginTop: CARD_MARGIN,
    marginRight: CARD_MARGIN,
    marginLeft: CARD_MARGIN,
    marginBottom: isLast ? CARD_MARGIN : 0,
    height: 250,
    backgroundColor: "white",
    borderRadius: 4
  };
};

const PlacesCard = props => {
  let placeImage = props.image
    ? { uri: props.image }
    : require("../images/newyork.jpg");
  console.log(props.isLast);
  return (
    <TouchableComponent onPress={() => props.onClick()}>
      <View style={[styles.cardShadow, getContainerStyle(props.isLast)]}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={placeImage}
            style={styles.image}
            resizeMode="cover"
          >
            <Text style={styles.titleText}>
              {props.title}
            </Text>
          </ImageBackground>
        </View>
        <Ratings
          stars={props.rating}
          description={props.description}
          isFavorite={props.isFavorite}
          onFavoriteClicked={isSelected => props.onFavoriteClicked(isSelected)}
        />
      </View>
    </TouchableComponent>
  );
};
const CONTENT_PADDING = 8,
  CARD_MARGIN = 12;
const IMAGE_WIDTH = DEVICE_WIDTH - 2 * CARD_MARGIN;
const styles = StyleSheet.create({
  container: {
    marginTop: CARD_MARGIN,
    marginRight: CARD_MARGIN,
    marginLeft: CARD_MARGIN,
    height: 250,
    backgroundColor: "white",
    borderRadius: 4
  },
  imageContainer: {
    flex: 1,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    overflow: "hidden",
    height: 150
  },
  image: {
    flex: 1,
    height: 160,
    width: IMAGE_WIDTH,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  titleText: {
    position: "absolute",
    backgroundColor: "transparent",
    color: "white",
    bottom: 0,
    margin: 8,
    fontWeight: "700",
    fontSize: 18
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4
  },
  detailsLayout: {
    padding: CONTENT_PADDING
  },
  starsLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ratingsLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  availabilityText: {
    color: "green",
    fontSize: FONT_SIZE * 0.7,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 4
  },
  detailsText: {
    fontSize: FONT_SIZE * 0.8
  }
});

export default PlacesCard;
