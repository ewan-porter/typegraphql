/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppNavigator} from './AppNavigator';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './services/apollo';

const BASE_URL = 'http://localhost:4000';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
