import React from 'react';
import {useGetAllPostsQuery} from '../gql/graphql';
import Loader from '../components/Loader';
import PostList from '../components/posts/PostList';
import {Text} from 'native-base';

const HomeScreen: React.FC = () => {
  const {loading, error, data} = useGetAllPostsQuery();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (!data) {
    return <Text>THere are no posts :\(</Text>;
  }
  return <PostList data={data} />;
};

export default HomeScreen;
