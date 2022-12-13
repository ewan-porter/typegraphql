import type {StackScreenProps} from '@react-navigation/stack';

export type PostType = {
  _id: string;
  title: string;
  desc: string;
  user: string;
};

export type LogInStackParamList = {
  LogIn: {name: string; register: boolean} | undefined;
  Register: {name: string} | undefined;
};

// export type RootStackScreenProps<T extends keyof LogInStackParamList> =
//   StackScreenProps<LogInStackParamList, T>;
