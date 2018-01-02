import { AsyncStorage } from "react-native";

export async function putItem(place) {
  try {
    await AsyncStorage.setItem(place.placeId, JSON.stringify(place));
  } catch (error) {
    console.log(error);
  }
}
export async function getItem(placeId) {
  try {
    const value = await AsyncStorage.getItem(placeId);
    if (value !== null) {
      // We have data!!
      console.log(value);
    } else {
      console.log("No data in AsyncStorage");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function removeItem(placeId) {
  try {
    await AsyncStorage.removeItem(placeId);
    console.log("Item removed");
  } catch (error) {
    console.log(error);
  }
}
