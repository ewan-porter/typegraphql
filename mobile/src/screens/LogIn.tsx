import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginMutation} from '../gql/graphql';
import {
  Center,
  VStack,
  Box,
  FormControl,
  Input,
  Flex,
  Button,
  Text,
  Link,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogInStackParamList} from '../types';
import Loader from '../components/Loader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserInput from '../components/account/UserInput';

type Props = NativeStackScreenProps<LogInStackParamList, 'LogIn'>;

const LogIn = ({route, navigation}: Props) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [logIn, {data, loading, error}] = useLoginMutation({
    async onCompleted() {
      const token = data?.login;
      try {
        await AsyncStorage.setItem('token', token!);
        console.log(token);
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
