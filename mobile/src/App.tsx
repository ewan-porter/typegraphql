import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppNavigator } from './AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './services/apollo';
import { NativeBaseProvider } from 'native-base';
import UserContextProvider from './AppContext';

export const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ApolloProvider client={client}>
          <UserContextProvider>
            <AppNavigator />
          </UserContextProvider>
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
