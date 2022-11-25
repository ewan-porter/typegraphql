import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {graphql} from '../gql';

const SIGNIN_MUTATION = graphql(`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`);

const LogIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [logIn, {data, loading, error}] = useMutation(SIGNIN_MUTATION, {
    async onCompleted() {
      const token = data?.login;
      try {
        await AsyncStorage.setItem('token', token!);
        console.log(token);
      } catch (err: any) {
        console.log(err.message);
      }
    },
  });

  if (error) {
    console.log('hellllo', error);
  }

  const handleChange = (fieldName: string, text: string) => {
    setValues({...values, [fieldName]: text});
  };

  const handleSubmit = () => {
    logIn({variables: {input: values}});
  };
  return (
    <View>
      <Text>Username</Text>
      <TextInput
        onChangeText={text => handleChange('email', text)}
        value={values.email}
        placeholder={'Email'}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={text => handleChange('password', text)}
        value={values.password}
        placeholder={'Password'}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleSubmit}></Button>
    </View>
  );
};

export default LogIn;
