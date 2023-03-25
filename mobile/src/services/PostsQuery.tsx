import { gql } from '@apollo/client';

export const All_Posts = gql(`
query getAllPosts {
  getAllPosts {
    _id
    title
    user
    desc
    createdAt
    comments {
      _id
      user
      comment
      createdAt
      post
    }

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

export const POST_COMMENTS = gql(`
query getPostComments($postId: String!) {
  getPostComments(postId: $postId) {
    _id
    user
    comment
    createdAt
    post
  }
}
`);

export const POST_SUBMIT_COMMENT = gql(`
mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    _id
    user
    comment
    createdAt
    post
  }
}
`);
