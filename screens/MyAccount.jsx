import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpecifiedView from '../components/SpecifiedView';
import { useDispatch } from 'react-redux';
import { takeToken } from '../redux/slice/parkirInSlice';
import { useEffect, useState } from 'react';
export default function MyAccount({ navigation }) {
  const dispatch = useDispatch();
  const [user,setUser] = useState({username:'',email:''})
  const handleSingOut = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      dispatch(takeToken({ token: '' }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    (async () => {
      try {
        const username = await AsyncStorage.getItem('username')
        const email = await AsyncStorage.getItem('email')
        setUser({...user,username,email})
      } catch (err) {
        console.log(err)
      }
    })()
  },[])

  return (
    <SpecifiedView className='bg-white'>
      <ScrollView className='h-full p-6'>
        <View className='border border-slate-400 h-[90px] p-4 mt-4 flex flex-row items-center rounded-xl'>
          <View className='mx-2'>
            <Image
              source={{
                uri: 'https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png',
              }}
              className='w-[60px] h-[60px] rounded-full'
            ></Image>
          </View>
          <View className=' w-fit p-2 space-y-2'>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View className='my-8 h-fit '>
          {/* <TouchableOpacity
            className='h-fit my-2 flex flex-row items-center justify-between'
            onPress={() => console.log('belom kehandle')}
          >
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={46}
                icon='account-circle-outline'
                color='#D9A14E'
                className='mx-4 bg-transparent'
              />
              <Text>Pengaturan Profil</Text>
            </View>
            <Avatar.Icon
              size={46}
              icon='chevron-right'
              color='#D9A14E'
              className='bg-transparent'
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            className='h-fit my-2 flex flex-row items-center justify-between'
            onPress={() => navigation.navigate('Garasi Saya')}
          >
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={46}
                icon='car-hatchback'
                color='#D9A14E'
                className='mx-4 bg-transparent'
              />
              <Text>Garasi Saya</Text>
            </View>
            <Avatar.Icon
              size={46}
              icon='chevron-right'
              color='#D9A14E'
              className='ml-28 bg-transparent'
            />
          </TouchableOpacity>
          <TouchableOpacity
            className='h-fit my-2 flex flex-row items-center justify-between'
            // onPress={() => console.log("KENA TOMBOL SIGN OUT")}
            onPress={() => handleSingOut()}
          >
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={46}
                icon='logout-variant'
                color='#D9A14E'
                className='mx-4 bg-transparent'
              />
              <Text>Sign Out</Text>
            </View>
            <Avatar.Icon
              size={46}
              icon='chevron-right'
              color='#D9A14E'
              className='ml-28 bg-transparent'
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
