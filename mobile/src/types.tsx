export type PostType = {
  _id: string;
  title: string;
  desc: string;
  user: string;
};

export type LogInStackParamList = {
  LogIn: {name: string} | undefined;
  Register: {name: string} | undefined;
};

export type RootTabParamList = {
  Home: undefined;
  LogIn: {name: string} | undefined;
  CreatePost: {name: string} | undefined;
  Account: {name: string} | undefined;
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
