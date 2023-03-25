import { Text } from 'native-base';
import React from 'react';
import { Comment } from '../../gql/graphql';

type Props = {
  data: Comment;
};

const PostComment: React.FC<Props> = ({ data }) => {
  return <Text>{data.comment}</Text>;
};

export default PostComment;
