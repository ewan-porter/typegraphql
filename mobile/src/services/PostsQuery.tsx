import {gql} from '@apollo/client';

export const All_Posts = gql(`
query getAllPosts {
  getAllPosts {
    _id
    title
    user
    desc
  }
}
`);
