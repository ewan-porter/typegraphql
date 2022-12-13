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
            <FormControl>
              <Input
                size="lg"
                color="darkText"
                onChangeText={text => handleChange('email', text)}
                value={values.email}
                placeholder={'Email'}
                autoCorrect={false}
                autoCapitalize="none"
                focusOutlineColor="teal.400"
                InputLeftElement={
                  <Icon
                    name="account-circle"
                    size={24}
                    style={{
                      paddingLeft: 5,
                    }}
                  />
                }
              />
            </FormControl>

            <FormControl>
              <Input
                size="lg"
                color="darkText"
                onChangeText={text => handleChange('password', text)}
                value={values.password}
                placeholder={'Password'}
                autoCorrect={false}
                autoCapitalize="none"
                InputLeftElement={
                  <Icon
                    name="lock"
                    size={24}
                    style={{
                      paddingLeft: 5,
                    }}
                  />
                }
                isRequired
                focusOutlineColor="teal.400"
              />
            </FormControl>
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

            {!route.params?.register ? (
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
            ) : (
              <Text textAlign="center" color="darkText">
                Registration successful, please sign in.
              </Text>
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default LogIn;
