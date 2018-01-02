import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import PlannerScreen from "./Screens/PlannerScreen";
import CreateTripScreen from "./Screens/CreateTripScreen";
import ReservationScreen from "./Screens/ReservationScreen";
import ThingsTodoScreen from "./Screens/ThingsTodo";
import SavedPlacesScreen from "./Screens/SavedPlacesScreen";
import DetailedViewScreen from "./Screens/DetailedView";

import { StackNavigator } from "react-navigation";
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

const App = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Planner: {
    screen: PlannerScreen
  },
  CreateTrip: {
    screen: CreateTripScreen
  },
  Reservations: {
    screen: ReservationScreen
  },
  ThingsTodo: {
    screen: ThingsTodoScreen
  },
  SavedPlaces: {
    screen: SavedPlacesScreen
  },
  DetailedView: {
    screen: withMappedNavigationProps(DetailedViewScreen)
  }
});

export default App;
