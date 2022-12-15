import { FormControl, Input } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  field: string;
  handleChange: (fieldName: string, text: string) => void;
  value: string;
  icon: string;
  title: string;
  password?: boolean;
};

function UserInput({
  field,
  handleChange,
  value,
  icon,
  title,
  password,
}: Props) {
  return (
    <FormControl>
      <Input
        size="lg"
        color="darkText"
        onChangeText={text => handleChange(field, text)}
        value={value}
        placeholder={title}
        autoCorrect={false}
        autoCapitalize="none"
        focusOutlineColor="teal.400"
        type={password ? 'password' : 'text'}
        InputLeftElement={
          <Icon
            name={icon}
            size={24}
            style={{
              paddingLeft: 5,
            }}
          />
        }
      />
    </FormControl>
  );
}

export default UserInput;
