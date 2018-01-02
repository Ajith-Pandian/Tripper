import Realm from "realm";
const PLACES_DB = "Places";

class Places {}
Places.schema = {
  name: PLACES_DB,
  primaryKey: "placeId",
  properties: {
    index: "int",
    placeId: "string",
    name: "string",
    image: "string",
    rating: "float",
    vicinity: "string",
    isFavorite: { type: "bool", default: false }
  }
};

const realm = new Realm({
  schema: [Places]
});

export const getPlacesDb = () => {
  return realm;
};
export const addPlaces = places => {
  for (var i = 0; i < places.length; i++) {
    addPlace(places[i]);
  }
};
export const addPlace = place => {
  let { index, placeId, name, image, rating, vicinity } = place;
  let realm = getPlacesDb();
  realm.write(() => {
    realm.create(PLACES_DB, {
      placeId,
      index,
      name,
      image,
      rating,
      vicinity
    });
    console.log("written");
  });
};
export const addToFavs = place => {
  updatePlace(place, true);
};
export const removeFromFavs = place => {
  updatePlace(place, false);
};
export const getAllFavs = () => {
  let allPlaces = getAllPlaces();
  let favs = [];
  for (var i = 0; i < allPlaces.length; i++) {
    let place = allPlaces[i];
    if (place.isFavorite) favs.push(place);
  }
  return favs;
};
export const updatePlace = (place, isFavorite) => {
  let { index, placeId, name, image, rating, vicinity } = place;
  let updatedData = {
    index,
    placeId,
    name,
    image,
    rating,
    vicinity,
    isFavorite
  };
  console.log(updatedData.isFavorite);
  let realm = getPlacesDb();
  realm.write(() => {
    realm.create(PLACES_DB, updatedData, true);
  });
};
export const getPlaceById = placeId => {
  let realm = getPlacesDb();
  let record = realm.objectForPrimaryKey(PLACES_DB, placeId);
  return record;
};

export const deletePlacesById = placeId => {
  let realm = getPlacesDb();
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey(PLACES_DB, placeId));
  });
};

export const getAllPlaces = () => {
  let realm = getPlacesDb();
  return realm.objects(PLACES_DB);
};
