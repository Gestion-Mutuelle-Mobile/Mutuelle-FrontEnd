import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import PinScreen from "../screens/auth/PinScreen";
import HomeScreen from "../screens/shared/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Pin" component={PinScreen} />
      <Stack.Screen name="Home" component={HomeScreen} /> 
    </Stack.Navigator>
  );
}