import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import SpecifiedView from '../components/SpecifiedView';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../redux/services/parkirInApi';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';

export default function Register({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  console.log(name, email, password, phoneNumber);
  const dispatch = useDispatch();

  const [registerUser, { isLoading, isError, data, isSuccess }] =
    useRegisterUserMutation();

  const handleRegister = async () => {
    try {
      registerUser({ email, password, phoneNumber, name });
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
    navigation.navigate('Login');
  }

  return (
    <SpecifiedView className='bg-[#2F3B6E] p-4 h-screen'>
      <ScrollView className='h-full mt-2'>
        <View className='justify-center items-center'>
          <Image
            source={require('../assets/parkirin_logo2.png')}
            className='w-[15vh] h-[15vh] scale-75 rounded-full'
          />
        </View>
        <View className='p-2 justify-center items-center'>
          <Text className='text-[#D9A14E] text-3xl font-extrabold'>
            Create New Account
          </Text>
        </View>
        <View className='mx-6 h-fit p-8 bg-[#D9A14E] rounded-3xl'>
          <TextInput
            label='Name'
            mode='outlined'
            value={name}
            onChangeText={(name) => setName(name)}
            className='mb-3'
          />
          <TextInput
            label='Email'
            mode='outlined'
            inputMode='email'
            keyboardType='email-address'
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
            className='mb-3'
          />
          <TextInput
            label='Phone Number'
            mode='outlined'
            keyboardType='number-pad'
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            className='mb-3'
          />
          <View className='justify-center items-center mt-8'>
            <Button
              icon='account-check-outline'
              mode='contained'
              className='bg-[#2F3B6E] w-[15vh]'
              // onPress={() => navigation.navigate("Input Car")}
              onPress={() => handleRegister()}
            >
              Register
            </Button>
          </View>
        </View>
        <View className='justify-center items-center mt-8 '>
          <Text className='text-[#D9A14E]'>Already have account?</Text>
          <Button
            icon='login-variant'
            mode='contained'
            textColor='black'
            className='bg-[#D9A14E] w-[15vh] my-2'
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </Button>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
