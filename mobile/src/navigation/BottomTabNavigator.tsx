import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';
import {useTheme} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogInStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isSignedIn = AsyncStorage.getItem('token');

const Stack = createStackNavigator<LogInStackParamList>();
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const AccountStack: React.FC = () => {
  const {colors} = useTheme();
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
      }}>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        initialParams={{name: 'LogIn', register: false}}
        options={{title: 'Log In'}}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator: React.FC = () => {
  const {colors} = useTheme();

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

        <BottomTab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="login" color={color} size={size} />
            ),

            headerShown: false,
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
