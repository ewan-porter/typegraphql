import { Box, Center, Pressable } from 'native-base';
import React from 'react';
import { useTheme } from 'native-base';
import { Post } from '../../gql/graphql';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PostStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';

type PostScreenProps = NativeStackNavigationProp<
  PostStackParamList,
  'PostList'
>;
interface Props {
  data: Post;
}
const PostCard: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation<PostScreenProps>();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Post', {
          name: 'Help',
          post: data,
        })
      }>
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
          rounded="lg">
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
    </Pressable>
  );
};

export default PostCard;
