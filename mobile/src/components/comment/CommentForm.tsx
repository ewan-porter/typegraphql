import { Box, Button, FormControl, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { useCreateCommentMutation } from '../../gql/graphql';
import { POST_COMMENTS } from '../../services/PostsQuery';
import Loader from '../Loader';

type Props = {
  post: string;
};

const CommentForm = ({ post }: Props) => {
  const [comment, setComment] = useState('');

  const [createComment, { data, loading, error }] = useCreateCommentMutation({
    refetchQueries: [{ query: POST_COMMENTS }],
  });

  const handleChange = (text: string) => {
    setComment(text);
  };

  const handleSubmit = () => {
    createComment({
      variables: {
        input: {
          comment: comment,
          post: post,
        },
      },
    });
  };

  return (
    <Box safeArea p="2" py="8" w="75%">
      {loading ? (
        <Loader />
      ) : (
        <VStack space={4}>
          <FormControl>
            <Input
              size="lg"
              color="darkText"
              onChangeText={text => handleChange(text)}
              placeholder="comment..."
              autoCorrect={false}
              autoCapitalize="none"
              focusOutlineColor="teal.400"
            />
          </FormControl>

          <Button colorScheme="teal" onPress={handleSubmit}>
            Register
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default CommentForm;
