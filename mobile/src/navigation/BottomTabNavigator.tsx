import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {useTheme} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogInStack from './LogInStack';
import CreatePost from '../screens/CreatePost';
import Account from '../screens/Account';
import {RootTabParamList} from '../types';
import {useUserContext} from '../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const INITIAL_ROUTE_NAME = 'Home';
const BottomTabNavigator: React.FC = () => {
  // AsyncStorage.removeItem('user');
  const {user} = useUserContext();
  const {colors} = useTheme();
  const signedIn = user;

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
          tabBarStyle: {backgroundColor: colors.warmGray[100]},
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({color, size}) => (
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
                tabBarIcon: ({color, size}) => (
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
                tabBarIcon: ({color, size}) => (
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
              tabBarIcon: ({color, size}) => (
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
