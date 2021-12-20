import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
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
