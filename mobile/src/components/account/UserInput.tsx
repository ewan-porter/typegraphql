import {FormControl, Input} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  field: string;
  handleChange: (fieldName: string, text: string) => void;
  value: string;
  icon: string;
};

function UserInput({field, handleChange, value, icon}: Props) {
  const capitalise = (s: string) => s && s[0].toUpperCase() + s.slice(1);
  return (
    <FormControl>
      <Input
        size="lg"
        color="darkText"
        onChangeText={text => handleChange(field, text)}
        value={value}
        placeholder={capitalise(field)}
        autoCorrect={false}
        autoCapitalize="none"
        focusOutlineColor="teal.400"
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
