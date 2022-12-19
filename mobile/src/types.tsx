import { Post } from './gql/graphql';

export type LogInStackParamList = {
  LogIn: { name: string } | undefined;
  Register: { name: string } | undefined;
};

export type PostStackParamList = {
  PostList: { name: string } | undefined;
  Post: { name: string; post: Post } | undefined;
};

export type RootTabParamList = {
  Home: { name: string } | undefined;
  LogIn: { name: string } | undefined;
  Register: { name: string } | undefined;
  CreatePost: { name: string } | undefined;
  Account: { name: string } | undefined;
};

type userDetails = {
  __typename?: string;
  email: string;
  username: string;
  fname: string;
  lname: string;
};
export type User = {
  __typename?: string;
  accessToken: string;
  currentUser: userDetails;
};

// export type RootStackScreenProps<T extends keyof LogInStackParamList> =
//   StackScreenProps<LogInStackParamList, T>;
