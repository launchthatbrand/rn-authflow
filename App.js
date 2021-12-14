import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ApolloClient, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://wordpress-360386-2306631.cloudwaysapps.com/graphql",
});

const LOGIN = gql`
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

const [loginUser, { loading }] = useMutation(LOGIN);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>{state.user.userId}</Text>
        <Text>{state.user.name}</Text>
        <Text>{state.user.email}</Text>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
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
