import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// screens
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

export default function AppStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
