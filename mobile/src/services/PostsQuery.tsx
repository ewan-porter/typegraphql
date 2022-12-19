import { gql } from '@apollo/client';

export const All_Posts = gql(`
query getAllPosts {
  getAllPosts {
    _id
    title
    user
    desc
    createdAt
  }
}
`);

export const SIGNIN_MUTATION = gql(`
mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    currentUser {
      username
      email
      fname
      lname
    }
  }
}
`);

export const REGISTER_MUTATION = gql(`
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    accessToken
    currentUser {
      username
      email
      fname
      lname
    }
  }
}
`);
