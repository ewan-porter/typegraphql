import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  post: Scalars['String'];
  user: Scalars['String'];
};

export type CreateCommentInput = {
  comment: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  post: Scalars['String'];
};

export type CreatePostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  desc: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String'];
  createComment: Comment;
  createPost: Post;
  createUser: UserResponse;
  login: UserResponse;
  logout: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  desc: Scalars['String'];
  title: Scalars['String'];
  user: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getMyPosts: Array<Post>;
  getPostComments: Array<Comment>;
  getUsersPosts: Array<Post>;
  me: User;
};

export type QueryGetPostCommentsArgs = {
  postId?: InputMaybe<Scalars['String']>;
};

export type QueryGetUsersPostsArgs = {
  user?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  posts: Array<Post>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  currentUser?: Maybe<User>;
};

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPostsQuery = {
  __typename?: 'Query';
  getAllPosts: Array<{
    __typename?: 'Post';
    _id: string;
    title: string;
    user: string;
    desc: string;
    createdAt: any;
    comments: Array<{
      __typename?: 'Comment';
      _id: string;
      user: string;
      comment: string;
      createdAt: any;
      post: string;
    }>;
  }>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    accessToken?: string | null;
    currentUser?: {
      __typename?: 'User';
      username: string;
      email: string;
      fname: string;
      lname: string;
    } | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserResponse';
    accessToken?: string | null;
    currentUser?: {
      __typename?: 'User';
      username: string;
      email: string;
      fname: string;
      lname: string;
    } | null;
  };
};

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;

export type GetPostCommentsQuery = {
  __typename?: 'Query';
  getPostComments: Array<{
    __typename?: 'Comment';
    _id: string;
    user: string;
    comment: string;
    createdAt: any;
    post: string;
  }>;
};

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: {
    __typename?: 'Comment';
    _id: string;
    user: string;
    comment: string;
    createdAt: any;
    post: string;
  };
};

export const GetAllPostsDocument = gql`
  query getAllPosts {
    getAllPosts {
      _id
      title
      user
      desc
      createdAt
      comments {
        _id
        user
        comment
        createdAt
        post
      }
    }
  }
`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(
    GetAllPostsDocument,
    options,
  );
}
export function useGetAllPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(
    GetAllPostsDocument,
    options,
  );
}
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<
  typeof useGetAllPostsLazyQuery
>;
export type GetAllPostsQueryResult = Apollo.QueryResult<
  GetAllPostsQuery,
  GetAllPostsQueryVariables
>;
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      currentUser {
        username
        email
        fname
        lname
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      accessToken
      currentUser {
        username
        email
        fname
        lname
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const GetPostCommentsDocument = gql`
  query getPostComments($postId: String!) {
    getPostComments(postId: $postId) {
      _id
      user
      comment
      createdAt
      post
    }
  }
`;

/**
 * __useGetPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPostCommentsQuery,
    GetPostCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(
    GetPostCommentsDocument,
    options,
  );
}
export function useGetPostCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostCommentsQuery,
    GetPostCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPostCommentsQuery,
    GetPostCommentsQueryVariables
  >(GetPostCommentsDocument, options);
}
export type GetPostCommentsQueryHookResult = ReturnType<
  typeof useGetPostCommentsQuery
>;
export type GetPostCommentsLazyQueryHookResult = ReturnType<
  typeof useGetPostCommentsLazyQuery
>;
export type GetPostCommentsQueryResult = Apollo.QueryResult<
  GetPostCommentsQuery,
  GetPostCommentsQueryVariables
>;
export const CreateCommentDocument = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      _id
      user
      comment
      createdAt
      post
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
