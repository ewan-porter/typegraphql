import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {PostType} from '../types';

const data: PostType[] = [
  {
    _id: '637654e4cb7a3186aa67b3fd',
    title: 'some text',
    user: 'johnM',
    desc: 'some more text',
  },
];

type Props = {};

const Posts: React.FC = (props: Props) => {
  // const {navigation} = props;
  const posts: PostType[] = data;
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

export default Posts;
