import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';
import { LogInStackParamList } from '../types';

const Stack = createStackNavigator<LogInStackParamList>();

const LogInStack: React.FC = () => {
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
        name="LogIn"
        component={LogIn}
        options={{ title: 'Log In' }}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default LogInStack;
