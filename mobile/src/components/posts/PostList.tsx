import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {GetAllPostsQuery} from '../../gql/graphql';
import PostCard from './PostCard';

interface Props {
  data: GetAllPostsQuery;
}

const PostList: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        data={data.getAllPosts}
        renderItem={({item, index}) => {
          return <PostCard data={item} key={index} />;
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f4',
  },
});
export default PostList;
