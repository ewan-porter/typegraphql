import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  Observable,
  Operation,
} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Subscription} from 'zen-observable-ts';

const BASE_URL = 'http://localhost:4000/graphql';

export const link = createHttpLink({
  uri: BASE_URL,
  credentials: 'include',
});

const request = async (operation: Operation) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: Subscription;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

export const client = new ApolloClient({
  link: ApolloLink.from([requestLink, link]),
  cache: new InMemoryCache(),
});
