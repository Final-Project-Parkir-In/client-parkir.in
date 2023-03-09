import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getExactIdMall } from '../redux/slice/parkirInSlice';

export default function MallListCard({
  navigation,
  address,
  imgUrl,
  id,
  name,
  lat,
  long,
}) {
  const dispatch = useDispatch();
  const handleToDetail = (id) => {
    navigation.navigate('Mall Detail');
    dispatch(getExactIdMall({ idMall: id }));
  };
  return (
    <TouchableOpacity
      onPress={() => handleToDetail(id)}
      className='border-b-[0.5px] h-[120px] mx-3 my-1 p-2 flex flex-row'
    >
      <Image
        source={{
          uri: imgUrl,
        }}
        className='w-[140px] h-[100px] rounded-2xl '
      ></Image>
      <View className='w-[220px] mx-2 gap-y-2'>
        <Text className='font-bold'>{name}</Text>
        <Text className=''>10:00 - 22.00 WIB</Text>
        <Text className='font-semibold'>Rp. 15.000</Text>
        {/* <Text className='font-light text-right'>3.456 km</Text> */}
      </View>
    </TouchableOpacity>
  );
}
