import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LogIn from '../screens/LogIn';
import {Box} from 'native-base';
import {useTheme} from 'native-base';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

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
          name="Login"
          component={LogIn}
          options={{
            title: 'Log In',
            tabBarIcon: ({color, size}) => (
              <Icon name="login" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
