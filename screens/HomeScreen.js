//import liraries
import React, { Component, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Context } from "../context";

// create a component
const HomeScreen = ({ navigation }) => {
  //access to state
  const { state, dispatch } = useContext(Context);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>{state?.user?.authToken}</Text>
          <Text>{state?.user?.user?.userId}</Text>
          <Text>{state?.user?.user?.name}</Text>
          <Text>{state?.user?.user?.email}</Text>
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate("LoginScreen")}
            title="Logout"
          />
          <View style={{ height: 100 }}></View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
  },
});

//make this component available to the app
export default HomeScreen;
