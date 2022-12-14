import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {useTheme} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogInStack from './LogInStack';
import getLoggedUser from '../utils/isSignedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from '../screens/Register';
import CreatePost from '../screens/CreatePost';
import Account from '../screens/Account';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
// AsyncStorage.removeItem('token');
const BottomTabNavigator: React.FC = () => {
  const {colors} = useTheme();

  const [signedIn, setSignedIn] = useState(false);

  (async () => {
    console.log(await getLoggedUser());

    setSignedIn(await getLoggedUser());
  })();
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
              name="Create Post"
              component={CreatePost}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="login" color={color} size={size} />
                ),

                headerShown: false,
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
              }}
            />
          </>
        ) : (
          <BottomTab.Screen
            name="Log In"
            component={LogInStack}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="login" color={color} size={size} />
              ),

              headerShown: false,
            }}
          />
        )}
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
