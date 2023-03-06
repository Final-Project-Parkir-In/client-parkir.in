import { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import SpecifiedView from '../components/SpecifiedView';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginUserMutation } from '../redux/services/parkirInApi';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { useDispatch } from 'react-redux';
import { takeToken } from '../redux/slice/parkirInSlice';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, data, isSuccess }] =
    useLoginUserMutation();
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('access_token', value);
      dispatch(takeToken({ token: value }));
    } catch (err) {
      // saving error
      console.log(err);
    }
  };
  const handleLogin = async () => {
    try {
      loginUser({ email, password });
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen />;
  }
  if (isSuccess) {
    storeData(data.access_token);
  }

  return (
    <SpecifiedView className='bg-[#2F3B6E] p-4 h-screen'>
      <ScrollView className='h-full'>
        <View className='justify-center items-center'>
          <Image
            source={require('../assets/parkirin_logo2.png')}
            className='w-[40vh] h-[40vh] scale-75 rounded-full'
          />
        </View>
        <View className='mx-6 h-fit p-8 bg-[#D9A14E] rounded-3xl'>
          <TextInput
            label='Email'
            mode='outlined'
            value={email}
            onChangeText={(email) => setEmail(email)}
            className='mb-3'
          />
          <TextInput
            label='Password'
            mode='outlined'
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <View className='justify-center items-center mt-8'>
            <Button
              icon='login-variant'
              mode='contained'
              className='bg-[#2F3B6E] w-[15vh]'
              onPress={() => handleLogin()}
            >
              Sign In
            </Button>
          </View>
        </View>
        <View className='justify-center items-center mt-8 '>
          <Text className='text-[#D9A14E]'>Don't have account?</Text>
          <Button
            icon='donkey'
            mode='contained'
            textColor='black'
            className='bg-[#D9A14E] w-[15vh] my-2'
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
