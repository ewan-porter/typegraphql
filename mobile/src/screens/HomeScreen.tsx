import React from 'react';
import { useGetAllPostsQuery } from '../gql/graphql';
import Loader from '../components/Loader';
import PostList from '../components/posts/PostList';
import { Text } from 'native-base';

const HomeScreen = () => {
  const { loading, error, data } = useGetAllPostsQuery();
  console.log(data?.getAllPosts);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (!data) {
    return <Text>There are no posts :\</Text>;
  }
  return <PostList data={data} />;
};

export default HomeScreen;
