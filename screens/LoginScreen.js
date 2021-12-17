//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

// create a component
const LoginScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Emails"
            autoFocus
            type="email"
            // value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            // value={password}
            onChangeText={(text) => setPassword(text)}
            // onSubmitEditing={signIn}
          />
          <Button
            containerStyle={styles.button}
            // onPress={signIn}
            title="Login"
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
export default LoginScreen;
