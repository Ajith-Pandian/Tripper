import React from "react";

const NAMES = [
  "Reservations",
  "Things to do",
  "Saved places",
  "Day plans",
  "Food & Drink",
  "Getting around",
  "Need to know"
];
const IMAGES = {
  Reservations: require("./images/ic_reservations.png"),
  "Things to do": require("./images/ic_things_to_do.png"),
  "Saved places": require("./images/ic_your_places.png"),
  "Day plans": require("./images/ic_day_plan.png"),
  "Food & Drink": require("./images/food_drinks.png"),
  "Getting around": require("./images/around.png"),
  "Need to know": require("./images/need_to_know.png")
};
export const getData = () => {
  let Places = [];
  for (var i = 0; i < NAMES.length; i++) {
    Places.push({ name: NAMES[i], image: IMAGES[NAMES[i]] });
  }
  return Places;
};
export const getPlacesId = () => {
  return [
    "ChIJLW5zQGUWrjsRcqab123bwqY",
    "ChIJwcIQBncWrjsRBW85WB5ndYk",
    "ChIJ1VBjZk0UrjsR6-VtGF4hCPc",
    "ChIJY8UqQBBwrzsRUA60iKH1ciU"
  ];
};
