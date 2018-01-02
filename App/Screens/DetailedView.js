import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../Components/Header";
import ScrollableHeader from "../Components/ScrollableHeader";
import TouchableComponent from "../Components/TouchableComponent";
import { getPhotoUrl } from "../Utils/ApiHelper";
import { addToFavs, removeFromFavs } from "../Database";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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
const Ratings = props => {
  return (
    <View style={styles.starsLayout}>
      <ReviewsAndStars stars={props.stars} />
    </View>
  );
};
const ActionButton = ({ iconName, name }) => {
  return (
    <TouchableComponent
      style={styles.actionButton}
      onPress={() => console.log(name + " clicked")}
    >
      <View style={{ alignSelf: "center", marginBottom: 8 }}>
        <Icon name={iconName} size={25} color={BASE_COLOR} />
      </View>
      <Text style={{ color: BASE_COLOR }}>
        {name}
      </Text>
    </TouchableComponent>
  );
};
const ActionButtonsLayout = () => {
  return (
    <View style={styles.actionButtonLayout}>
      <ActionButton iconName="directions" name="DIRECTIONS" />
      <ActionButton iconName="call" name="CALL" />
      <ActionButton iconName="public" name="WEBSITE" />
    </View>
  );
};
const DetailsView = ({ iconName, text }) => {
  return (
    <View style={styles.detailsView}>
      <View style={{ flex: 20 }}>
        <Icon name={iconName} size={25} color={BASE_COLOR} />
      </View>
      <Text style={{ color: BASE_COLOR, flex: 80 }}>
        {text}
      </Text>
    </View>
  );
};
class DateView extends Component {
  state = {
    expanded: false
  };
  changeState = () => {
    let expanded = !this.state.expanded;
    this.setState({ expanded });
  };
  render() {
    let { openHours } = this.props;
    let { expanded } = this.state;
    let currentDay = new Date().getDay();
    let todayString = openHours[currentDay];
    let dayString = todayString.substring(0, todayString.indexOf(":"));
    todayString = todayString.replace(dayString, "Today ");
    return (
      <TouchableComponent onPress={() => this.changeState()}>
        {expanded
          ? <View>
              {openHours.map((text, i) =>
                <View key={i} style={{ flexDirection: "row" }}>
                  <View style={{ flex: 20 }} />
                  <Text
                    style={{
                      color: BASE_COLOR,
                      flex: 80,
                      fontWeight: i == currentDay - 1 ? "700" : "normal"
                    }}
                  >
                    {text}
                  </Text>
                </View>
              )}
            </View>
          : <DetailsView iconName="query-builder" text={todayString} />}
      </TouchableComponent>
    );
  }
}
const MoreDetailsLayout = ({ details }) => {
  let { address, phoneNumber, openHours } = details;
  return (
    <View style={styles.moreDetailsLayout}>
      {address ? <DetailsView iconName="location-on" text={address} /> : null}
      {openHours ? <DateView openHours={openHours} /> : null}
      {phoneNumber ? <DetailsView iconName="call" text={phoneNumber} /> : null}
    </View>
  );
};
const InLineMapView = ({ location }) => {
  let { latitude, longitude } = location;
  console.log(location);
  return (
    <View
      style={{
        height: 200,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: -10,
        borderWidth: 1,
        borderColor: BASE_COLOR
      }}
    >
      <MapView
        style={{
          ...StyleSheet.absoluteFillObject
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.017,
          longitudeDelta: 0.042259
        }}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
      >
        <MapView.Marker coordinate={location} pinColor={"blue"} />
      </MapView>
    </View>
  );
};
const ReviewElement = ({ review }) => {
  let { name, rating, text, time } = review;
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text
        style={{
          marginTop: 4,
          marginBottom: 4
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          color: BASE_COLOR,
          marginTop: 4,
          marginBottom: 4
        }}
      >
        {time}
      </Text>
      <View style={{ flexDirection: "row" }}>
        {getFullStars(rating)}
      </View>
      <Text
        style={{
          color: BASE_COLOR,
          marginTop: 4,
          marginBottom: 4
        }}
      >
        {text}
      </Text>
    </View>
  );
};
const ReviewsLayout = ({ reviews }) => {
  return (
    <View style={{ padding: 10, backgroundColor: "rgba(242, 242, 242, 0.60)" }}>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "400",
          color: BASE_COLOR
        }}
      >
        Top reviews
      </Text>
      {reviews
        ? reviews.map((review, i) => <ReviewElement key={i} review={review} />)
        : null}
    </View>
  );
};
const DetailedView = props => {
  let {
    navigation,
    image,
    rating,
    vicinity,
    isFavorite,
    name,
    address,
    phoneNumber,
    openHours,
    reviews,
    location
  } = props;
  let { contentContainer, nameContainer, nameText } = styles;
  console.log(props);
  return (
    <View style={{ flex: 1 }}>
      <ScrollableHeader
        navigation={navigation}
        title={""}
        image={{ uri: getPhotoUrl(image) }}
        headerMaxHeight={250}
        hasBackground={false}
      >
        <View style={contentContainer}>
          <View style={nameContainer}>
            <Text style={nameText}>
              {name}
            </Text>
            <FavoriteStar
              isFavorite={props.isFavorite}
              onSelected={isSelected => {
                //  if (isSelected) addToFavs(place);
                //  else removeFromFavs(place);
                console.log("Fav clicked");
              }}
            />
          </View>
          <Ratings stars={rating} isFavorite={isFavorite} />
          <View>
            <Text style={[styles.detailsText, MARGIN]}>
              {vicinity}
            </Text>
          </View>
          <ActionButtonsLayout />
          <InLineMapView location={location} />
          <MoreDetailsLayout details={{ address, phoneNumber, openHours }} />
          <ReviewsLayout reviews={reviews} />
        </View>
      </ScrollableHeader>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    zIndex: 1
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  nameText: {
    fontSize: 18,
    padding: 4,
    flex: 80
  },
  detailsLayout: {
    padding: 4,
    flex: 20
  },
  starsLayout: {
    marginTop: 10,
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
    //backgroundColor: "#ececec",
    fontSize: FONT_SIZE * 0.8,
    marginTop: 10
  },
  actionButtonLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  actionButton: {
    flex: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  moreDetailsLayout: { flexDirection: "column", margin: 4 },
  detailsView: {
    flexDirection: "row",
    margin: 4,
    alignItems: "center"
  }
});
DetailedView.navigationOptions = { header: null };
export default DetailedView;
