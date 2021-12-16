import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
  useMutation,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://wordpress-360386-2306631.cloudwaysapps.com/graphql",
  cache: new InMemoryCache(),
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
  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN);
  if (loading) return <Text>"Loading..."</Text>;
  console.log(data);

  return (
    <>
      <Text>AuthContext Demo</Text>
      <Text>{data?.login.authToken}</Text>
      <Button onPress={mutateFunction} title="LOGIN">
        <Text bold size={14}>
          LOGIN
        </Text>
      </Button>
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Index />
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
