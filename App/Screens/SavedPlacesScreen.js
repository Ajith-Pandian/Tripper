import React, { Component } from "react";
import { Header } from "../Components/Header";
import { View, ScrollView, Text } from "react-native";
import PlacesCard from "../Components/PlacesCard";
import { BASE_COLOR, DEVICE_WIDTH } from "../Styles";
import { getPhotoUrl } from "../Utils/ApiHelper";
import {
  addToFavs,
  removeFromFavs,
  getAllFavs,
  getPlacesDb
} from "../Database";
const realm = getPlacesDb();

class SavedPlacesScreen extends Component {
  state = {
    places: getAllFavs()
  };
  componentWillMount() {
    realm.addListener("change", () => {
      this.setState({ places: getAllFavs() });
    });
  }
  componentWillUnmount() {
    realm.removeAllListeners();
  }
  render() {
    let { navigation } = this.props;
    let { places } = this.state;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Header
          header={"SavedPlaces"}
          navigation={navigation}
          headerColor={"black"}
          backIconColor={BASE_COLOR}
          backgroundColor={"white"}
          hasShadow={true}
          hasTopMargin={true}
        />

        {places && places.length > 0
          ? <ScrollView scrollEventThrottle={1}>
              {places.map((place, i) => {
                console.log(place.isFavorite);
                let isLast = i == places.length - 1;

                let image = getPhotoUrl(place.image);
                return (
                  <PlacesCard
                    title={place.name}
                    image={image}
                    rating={place.rating}
                    description={place.vicinity}
                    key={i}
                    isLast={isLast}
                    onClick={() => console.log("AA")}
                    isFavorite={place.isFavorite}
                    onFavoriteClicked={isSelected => {
                      console.log("fav clicked");

                      if (isSelected) {
                        addToFavs(place);
                      } else removeFromFavs(place);
                    }}
                  />
                );
              })}
            </ScrollView>
          : <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                margin: 10
              }}
            >
              <Text style={{ fontSize: 22, color: BASE_COLOR }}>
                No Favorites
              </Text>
            </View>}
      </View>
    );
  }
}
SavedPlacesScreen.navigationOptions = {
  header: null
};
export default SavedPlacesScreen;
