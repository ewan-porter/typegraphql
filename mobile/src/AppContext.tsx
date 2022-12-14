import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (token: string) => void;
  signOut: () => void;
  // user: User | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  // user: null,
});
