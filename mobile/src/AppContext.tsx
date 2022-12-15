import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {UserResponse} from './gql/graphql';
// import {User} from './types';

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (user: UserResponse) => void;
  signOut: () => void;
  user: UserResponse | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

const UserContextProvider = ({children}: Props): JSX.Element => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }, []);

  const signIn = useCallback(async (user: UserResponse) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }, []);

  useEffect(() => {
    const restoreUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const decodedUser: UserResponse = JSON.parse(user);
        setUser(decodedUser);
      }
    };
    restoreUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [signIn, signOut, user],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export default UserContextProvider;
