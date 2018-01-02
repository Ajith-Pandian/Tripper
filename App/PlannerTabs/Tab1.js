import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PlacesCard from "../Components/PlacesCard";
import { fetchAllPlaceDetails, getPhotoUrl } from "../Utils/ApiHelper";
import {
  addToFavs,
  removeFromFavs,
  getPlacesDb,
  addPlaces,
  getAllPlaces
} from "../Database";
import { getPlacesId } from "../Data";
const realm = getPlacesDb();
class Tab1 extends Component {
  state = {
    //places: getAllPlaces()
    places: []
  };
  componentWillMount() {
    realm.addListener("change", () => {
      this.setState({ places: getAllPlaces() });
    });
  }
  componentWillUnmount() {
    realm.removeAllListeners();
  }
  componentDidMount() {
    let { places } = this.state;
    // if (
    //   !(places && places.length > 0) //|| places.length < getPlacesId().length)
    // )
    fetchAllPlaceDetails().then(places => {
      //addPlaces(places);
      this.setState({ places });
    });
  }
  render() {
    let { places } = this.state;
    let { navigation } = this.props;
    return (
      <ScrollView scrollEventThrottle={1}>
        {places
          ? places.map((place, i) => {
              console.log(place);
              let isLast = i == places.length - 1;
              let image = getPhotoUrl(place.image);
              return (
                <PlacesCard
                  title={place.name}
                  image={image}
                  rating={place.rating}
                  description={place.vicinity}
                  key={i}
                  onClick={() =>
                    navigation.navigate("DetailedView", { ...place })}
                  isLast={isLast}
                  isFavorite={place.isFavorite}
                  onFavoriteClicked={isSelected => {
                    console.log("fav clicked");
                    if (isSelected) {
                      addToFavs(place);
                    } else removeFromFavs(place);
                  }}
                />
              );
            })
          : null}
      </ScrollView>
    );
  }
}

export default Tab1;
