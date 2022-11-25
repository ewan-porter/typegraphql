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
import {NativeBaseProvider, stylingProps} from 'native-base';

export const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e5e4',
  },
});
