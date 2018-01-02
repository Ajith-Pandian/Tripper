export const getPlaceFromResponse = (index, placeId, response) => {
  let {
    name,
    photos,
    rating,
    vicinity,
    geometry,
    formatted_address,
    international_phone_number,
    reviews
  } = response.result;
  let image = photos[0].photo_reference;
  let { lat, lng } = geometry.location;
  let latitude = lat,
    longitude = lng;
  let location = { latitude, longitude };
  rating = rating ? rating : 0;
  let phoneNumber = international_phone_number;
  let address = formatted_address;
  let opening_hours = response.result.hasOwnProperty("opening_hours")
    ? response.result.opening_hours
    : null;
  let openHours = opening_hours ? opening_hours.weekday_text : null;
  reviews = reviews ? getReviewDetails(reviews) : null;
  console.log(reviews);
  return {
    index,
    placeId,
    name,
    image,
    rating,
    vicinity,
    location,
    address,
    phoneNumber,
    openHours,
    reviews
  };
};
const getReviewDetails = reviews => {
  let formattedReviews = [];
  for (var i = 0; i < reviews.length; i++) {
    let { author_name, rating, text, relative_time_description } = reviews[i];
    let name = author_name;
    let time = relative_time_description;
    formattedReviews[i] = { name, rating, text, time };
  }

  return formattedReviews;
};
const getTodayString = date => {
  var utcSeconds = 1234567890;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);

  let today = new Date();
  console.log();
};
