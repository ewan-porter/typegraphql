import React, {useState} from 'react';
import {useLoginMutation, UserResponse} from '../gql/graphql';
import {VStack, Box, Flex, Button, Text, Link} from 'native-base';
import {LogInStackParamList, RootTabParamList} from '../types';
import Loader from '../components/Loader';
import UserInput from '../components/account/UserInput';
import {useUserContext} from '../AppContext';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';

// type Props = NativeStackScreenProps<LogInStackParamList, 'LogIn'>;
type LogInScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'LogIn'>,
  StackScreenProps<LogInStackParamList>
>;

const LogIn = ({navigation}: LogInScreenProps) => {
  const {signIn} = useUserContext();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [logIn, {data, loading, error}] = useLoginMutation({
    async onCompleted() {
      const user: UserResponse = data?.login as UserResponse;
      try {
        signIn(user);
        navigation.navigate('Home');
      } catch (err: any) {
        console.log(err.message);
        throw err;
      }
    },
    async onError(err) {
      console.log(err);
    },
  });

  const handleChange = (fieldName: string, text: string) => {
    setValues({...values, [fieldName]: text});
  };

  const handleSubmit = () => {
    logIn({variables: {input: values}});
  };
  return (
    <Flex align="center" justify="center" h="100%">
      {loading ? (
        <Loader />
      ) : (
        <Box safeArea p="2" py="8" w="75%">
          <VStack space={4}>
            <UserInput
              field={'email'}
              title={'Email'}
              handleChange={handleChange}
              value={values.email}
              icon={'account-circle'}
            />

            <UserInput
              field={'password'}
              title={'Password'}
              handleChange={handleChange}
              value={values.password}
              icon={'lock'}
              password={true}
            />
            <Button colorScheme="teal" onPress={handleSubmit}>
              Log In
            </Button>
          </VStack>
          <Box pt="3">
            {error && (
              <Text textAlign="center" color="danger.600">
                {error.message}
              </Text>
            )}

            <Text textAlign="center" color="darkText">
              Not registered?{' '}
              <Link
                justifyContent="center"
                onPress={() => navigation.navigate('Register')}
                _text={{
                  color: 'teal.400',
                }}>
                Sign Up
              </Link>{' '}
            </Text>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default LogIn;
