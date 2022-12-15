import { Box, Center } from 'native-base';
import React from 'react';
import { useTheme } from 'native-base';

interface Props {
  data: {
    __typename?: 'Post' | undefined;
    _id: string;
    title: string;
    user: string;
    desc: string;
  };
}
const PostCard: React.FC<Props> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <Center>
      <Box
        flex={1}
        justifyContent="center"
        bg={colors.white}
        _text={{
          color: colors.darkText,
        }}
        w="90%"
        my="2"
        rounded="lg"
        shadow="1">
        <Box
          p={4}
          roundedTop="lg"
          bg="teal.400"
          _text={{ fontSize: 'xl', fontWeight: 'bold' }}>
          {data.title}
        </Box>
        <Box
          p={4}
          roundedBottom="lg"
          _text={{ fontSize: 'md', fontWeight: 'bold' }}>
          {data.desc}
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
          {data.user}
        </Box>
      </Box>
    </Center>
  );
};

export default PostCard;
