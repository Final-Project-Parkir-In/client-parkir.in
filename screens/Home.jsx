import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home({ navigation }) {
  const [token, setToken] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');
      setToken(value);
      console.log(value, '<===');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView className='h-screen bg-white'>
      <View className='h-[50vh] bg-[#2F3B6E]'>
        <Image
          source={require('../assets/parkirin_logo2.png')}
          className='w-full h-full scale-75'
        />
      </View>
      {/* <BannerSlider className="bg-slate-400" /> */}

      <View className='h-[40vh] flex flex-row justify-center items-center'>
        <View className='flex flex-row mx-2'>
          <TouchableOpacity
            onPress={() => navigation.navigate('Parkir.In locations')}
            className='h-[200px]'
          >
            <View className='w-[180px] h-[180px] bg-white justify-center items-center '>
              <Image
                source={require('../assets/assets_1.jpg')}
                className='w-full h-full scale-75'
              />
            </View>
            <Text className='text-center'>Find Parkir.In Nearby</Text>
          </TouchableOpacity>
        </View>

        <View className='flex flex-row mx-2'>
          <TouchableOpacity
            onPress={() => navigation.navigate('Mall List')}
            className='h-[200px]'
          >
            <View className='w-[180px] h-[180px] bg-white justify-center items-center '>
              <Image
                source={require('../assets/assets_2.jpeg')}
                className='w-full h-full scale-75'
              />
            </View>
            <Text className='text-center'>Find Parkir.In Mall List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
