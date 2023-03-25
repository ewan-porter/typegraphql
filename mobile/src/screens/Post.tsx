import { RouteProp, useRoute } from '@react-navigation/native';
import { Center, Box, useTheme } from 'native-base';

import React from 'react';
import CommentForm from '../components/comment/CommentForm';
import CommentSection from '../components/comment/CommentSection';

import { PostStackParamList } from '../types';

type PostProps = RouteProp<PostStackParamList, 'Post'>;
const Post = () => {
  const route = useRoute<PostProps>();
  const { colors } = useTheme();
  const data = route.params!.post;

  return (
    <Center>
      <Box
        justifyContent="center"
        bg={colors.white}
        _text={{
          color: colors.darkText,
        }}
        w="95%"
        my="2"
        rounded="lg">
        <Box
          p={4}
          roundedTop="lg"
          bg={colors.white}
          _text={{ fontSize: 'xl', fontWeight: 'bold' }}>
          {data?.title}
        </Box>
        <Box
          p={4}
          roundedBottom="lg"
          _text={{ fontSize: 'md', fontWeight: 'bold' }}>
          {data?.desc}
        </Box>
        <Box
          p={4}
          roundedBottom="lg"
          _text={{
            fontSize: 'sm',
            color: 'warmGray.600',
            fontWeight: 'bold',
            textAlign: 'right',
          }}>
          {data?.user}
        </Box>
      </Box>

      <CommentForm post={data._id} />
      <CommentSection post={data._id} />
    </Center>
  );
};

export default Post;
