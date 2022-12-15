import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { UserResponse } from './gql/graphql';

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (user: UserResponse) => void;
  signOut: () => void;
  activeUser: UserResponse | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  activeUser: null,
});

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [activeUser, setActiveUser] = useState<UserResponse | null>(null);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setActiveUser(null);
  }, []);

  const signIn = useCallback(async (user: UserResponse) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setActiveUser(user);
  }, []);

  useEffect(() => {
    const restoreUser = async () => {
      const loggedUser = await AsyncStorage.getItem('user');
      if (loggedUser) {
        const decodedUser: UserResponse = JSON.parse(loggedUser);
        setActiveUser(decodedUser);
      }
    };
    restoreUser();
  }, [activeUser]);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      activeUser,
    }),
    [signIn, signOut, activeUser],
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
