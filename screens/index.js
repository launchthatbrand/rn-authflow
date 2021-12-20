import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

function AppStack(props) {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
