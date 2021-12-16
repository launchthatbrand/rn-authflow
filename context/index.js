import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useReducer, createContext, useEffect, useState } from "react";

// initial state
const intialState = {
  user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const storageData = await AsyncStorage.getItem("login");
        dispatch({
          type: "LOGIN",
          payload: JSON.parse(storageData),
        });
        console.log("local_data", storageData);
      } catch (e) {}
    };
    asyncFunctionData();
  }, [dispatch]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, AuthProvider };
