import React from "react";
import Api from "./Api";
import { getPlaceFromResponse } from "./ResultParser";
import { getPlacesId } from "../Data";

const CITIES = "cities";
const CITY = "City";

const API_KEY = "AIzaSyAqP-GZF6rfBqL4VUNxGFxZpWGs-0gd5Y0";
const PLACE_DETAILS_PREFIX =
  "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
const PLACE_DETAILS_SUFFIX = `&key=${API_KEY}`;

const PLACE_PHOTO_PREFIX =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
const PLACE_PHOTO_SUFFIX = `&key=${API_KEY}`;

export const getPhotoUrl = photoId =>
  `${PLACE_PHOTO_PREFIX}${photoId}${PLACE_PHOTO_SUFFIX}`;

export const getCitiesStartsWith = text =>
  Api.get(`${CITIES}?${CITY}_like=${"^" + text}`);

export const fetchAllPlaceDetails = () => {
  let places = getPlacesId();
  let promises = [];
  for (var i = 0; i < places.length; i++) {
    promises.push(fetchPlaceDetails(i, places[i]));
  }
  return Promise.all(promises).then(results => results).catch(error => {
    console.log("error", error);
  });
};

export const fetchPlaceDetails = (index, placeId) => {
  return Api.getByUrl(
    PLACE_DETAILS_PREFIX + placeId + PLACE_DETAILS_SUFFIX
  ).then(result => getPlaceFromResponse(index, placeId, result));
};
