//import liraries
import React, { Component, useContext, useEffect, useState } from "react";
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
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../schemas";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const LoginScreen = ({ navigation }) => {
  //access to state
  const [email, setEmail] = useState("dev");
  const [password, setPassword] = useState("password");
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user !== null) navigation.navigate("HomeScreen");
  }, [user]);

  // Login mutation with onCompleted saving data to AuthContext
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        console.log("LOGIN RESPONSE", login);
      }
      dispatch({
        type: "LOGIN",
        payload: login,
      });
      // save in local
      AsyncStorage.setItem("login", JSON.stringify(login));
    },
  });

  if (loading) return <Text>"Loading..."</Text>;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            // onSubmitEditing={signIn}
          />
          <Button
            containerStyle={styles.button}
            onPress={login}
            title="Login"
          />
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
            title="Skip"
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
