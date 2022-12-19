import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogInStack from './LogInStack';
import CreatePost from '../screens/CreatePost';
import Account from '../screens/Account';
import { RootTabParamList } from '../types';
import { useUserContext } from '../AppContext';
import PostsStack from './PostsStack';

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const INITIAL_ROUTE_NAME = 'Home';
const BottomTabNavigator: React.FC = () => {
  const { activeUser, signOut } = useUserContext();
  const { colors } = useTheme();
  const signedIn = activeUser;

  signOut();

  return (
    <BottomTab.Navigator
      sceneContainerStyle={{
        minWidth: '100%',
      }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Group
        screenOptions={{
          unmountOnBlur: false,
          headerStyle: {
            backgroundColor: colors.warmGray[100],
          },
          headerTitleStyle: {
            color: colors.teal[400],
          },
          tabBarActiveTintColor: colors.teal[400],
          tabBarInactiveTintColor: colors.warmGray[700],
          tabBarStyle: { backgroundColor: colors.warmGray[100] },
        }}>
        <BottomTab.Screen
          name="Home"
          component={PostsStack}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        {signedIn ? (
          <>
            <BottomTab.Screen
              name="CreatePost"
              component={CreatePost}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="login" color={color} size={size} />
                ),

                headerShown: false,
                title: 'Create Post',
              }}
            />
            <BottomTab.Screen
              name="Account"
              component={Account}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="login" color={color} size={size} />
                ),

                headerShown: false,
                title: 'Account',
              }}
            />
          </>
        ) : (
          <BottomTab.Screen
            name="LogIn"
            component={LogInStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="login" color={color} size={size} />
              ),

              headerShown: false,
              title: 'Log In',
            }}
          />
        )}
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
