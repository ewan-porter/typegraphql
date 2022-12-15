import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import BottomTabNavigator from './navigation/BottomTabNavigator';

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
