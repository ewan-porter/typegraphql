import {View, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PostCard from '../components/posts/PostCard';
import {GetAllPostsQuery, useGetAllPostsQuery} from '../gql/graphql';
import Loader from '../components/Loader';
import PostList from '../components/posts/PostList';

const HomeScreen: React.FC = () => {
  const {loading, error, data} = useGetAllPostsQuery();

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Loader />;
  }
  return <PostList data={data} />;
};

export default HomeScreen;
