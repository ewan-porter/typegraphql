import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'native-base';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Post from '../screens/Post';
import { PostStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator<PostStackParamList>();

const PostsStack: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.warmGray[100],
        },
        headerTitleStyle: {
          color: colors.teal[400],
        },
        headerBackTitleStyle: {
          color: colors.teal[400],
        },
        headerTintColor: colors.teal[400],
        headerBackImage: ({ tintColor }) => (
          <Icon name="chevron-left" color={tintColor} size={32} />
        ),
      }}>
      <Stack.Screen
        name="PostList"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={({ route }) => ({ title: route.params?.post.title })}
      />
    </Stack.Navigator>
  );
};

export default PostsStack;
