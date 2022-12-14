import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import Loader from '../components/Loader';
import {useCreateUserMutation, useLoginMutation} from '../gql/graphql';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserInput from '../components/account/UserInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {LogInStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterScreenNavProp = StackNavigationProp<LogInStackParamList>;

type Props = {
  navigation: RegisterScreenNavProp;
};

const Register = ({navigation}: Props) => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    fname: '',
    lname: '',
    password: '',
  });

  const [createUser, {data, loading, error}] = useCreateUserMutation({
    async onCompleted() {
      const token = data?.createUser;
      try {
        await AsyncStorage.setItem('token', token!);
        console.log(token);
      } catch (err: any) {
        console.log(err.message);
        throw err;
      }
    },
    async onError(err) {
      console.log('here', err);
    },
  });

  const handleChange = (fieldName: string, text: string) => {
    setValues({...values, [fieldName]: text});
  };

  const handleSubmit = () => {
    createUser({variables: {input: values}});
  };
  return (
    <Flex align="center" justify="center" h="100%">
      {loading ? (
        <Loader />
      ) : (
        <Box safeArea p="2" py="8" w="75%">
          <VStack space={4}>
            <UserInput
              field={'username'}
              title={'Username'}
              handleChange={handleChange}
              value={values.username}
              icon={'account-circle'}
            />
            <UserInput
              field={'email'}
              title={'Email'}
              handleChange={handleChange}
              value={values.email}
              icon={'at'}
            />
            <UserInput
              field={'fname'}
              title={'First name'}
              handleChange={handleChange}
              value={values.fname}
              icon={'account-question'}
            />
            <UserInput
              field={'lname'}
              title={'Last name'}
              handleChange={handleChange}
              value={values.lname}
              icon={'account-question'}
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
              Register
            </Button>
          </VStack>
          <Box pt="3">
            {error && (
              <Text textAlign="center" color="danger.600">
                {error.message}
              </Text>
            )}
            <Text textAlign="center" color="darkText">
              Already registered?{' '}
              <Link
                justifyContent="center"
                onPress={() => navigation.goBack()}
                _text={{
                  color: 'teal.400',
                }}>
                Go Back
              </Link>
            </Text>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Register;
