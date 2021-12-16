import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
  useMutation,
} from "@apollo/client";

import { AuthProvider, Context } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = new ApolloClient({
  uri: "https://wordpress-360386-2306631.cloudwaysapps.com/graphql",
  cache: new InMemoryCache(),
});

const LOGIN_USER = gql`
  mutation LoginUser {
    login(
      input: {
        clientMutationId: "uniqueId"
        username: "dev"
        password: "password"
      }
    ) {
      authToken
      refreshToken
      user {
        userId
        name
        email
        roles {
          nodes {
            id
            capabilities
            name
          }
        }
      }
    }
  }
`;

const GET_COURSES = gql`
  {
    courses(where: { orderby: { field: DATE, order: ASC } }) {
      edges {
        node {
          title
          postExcerpt
          id
          databaseId
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

function Index() {
  //access to state
  const { state, dispatch } = useContext(Context);

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

  const logout = async () => {
    AsyncStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Text>AuthContext Demo</Text>
      <Text>{state?.user?.authToken}</Text>
      <Text>{state?.user?.user?.userId}</Text>
      <Text>{state?.user?.user?.name}</Text>
      <Text>{state?.user?.user?.email}</Text>

      <Button onPress={login} title="LOGIN">
        <Text bold size={14}>
          LOGIN
        </Text>
      </Button>
      <Button onPress={logout} title="LOGOUT">
        <Text bold size={14}>
          LOGOUT
        </Text>
      </Button>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Index />
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
