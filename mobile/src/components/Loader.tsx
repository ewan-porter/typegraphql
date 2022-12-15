import { Flex, Spinner } from 'native-base';
import React from 'react';

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100%">
      <Spinner accessibilityLabel="Loading posts" size="lg" color="teal.400" />
    </Flex>
  );
};

export default Loader;
