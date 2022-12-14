import AsyncStorage from '@react-native-async-storage/async-storage';

const getLoggedUser = async () => {
  try {
    const user = await AsyncStorage.getItem('token');
    return user !== null ? true : false;
  } catch (e) {
    return false;
  }
};

export default getLoggedUser;
