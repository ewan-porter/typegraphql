import React from 'react';
import { FlatList, Text } from 'native-base';
import { useGetPostCommentsQuery } from '../../gql/graphql';
import Loader from '../Loader';
import PostComment from './PostComment';

type Props = {
  post: string;
};
const CommentSection = ({ post }: Props) => {
  const { loading, error, data } = useGetPostCommentsQuery({
    variables: { postId: post },
  });

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (data?.getPostComments.length === 0 || !data) {
    return <Text>There are no comments</Text>;
  }
  return (
    <FlatList
      keyExtractor={(item, index) => `${index}`}
      data={data.getPostComments}
      renderItem={({ item, index }) => {
        return <PostComment data={item} key={index} />;
      }}
    />
  );
};

export default CommentSection;
