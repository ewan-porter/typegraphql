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
import {useCreateUserMutation} from '../gql/graphql';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserInput from '../components/account/UserInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {LogInStackParamList} from '../types';

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
      navigation.navigate('LogIn', {name: 'Login', register: true});
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
              handleChange={handleChange}
              value={values.username}
              icon={'account-circle'}
            />
            <UserInput
              field={'email'}
              handleChange={handleChange}
              value={values.email}
              icon={'at'}
            />
            <UserInput
              field={'fname'}
              handleChange={handleChange}
              value={values.fname}
              icon={'account-question'}
            />
            <UserInput
              field={'lname'}
              handleChange={handleChange}
              value={values.lname}
              icon={'account-question'}
            />
            <UserInput
              field={'password'}
              handleChange={handleChange}
              value={values.password}
              icon={'lock'}
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
