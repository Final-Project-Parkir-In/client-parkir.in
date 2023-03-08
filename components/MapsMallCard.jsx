import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { getExactIdMall } from '../redux/slice/parkirInSlice';

export default function MapsMallCard({ navigate, imgUrl, address, name, id }) {
  const dispatch = useDispatch();
  const toDetail = (id) => {
    dispatch(getExactIdMall({ idMall: id }));
    navigate('Mall Detail');
  };
  return (
    <TouchableOpacity
      className='h-fit border border-slate-300 rounded-2xl my-4'
      onPress={() => {
        toDetail(id);
      }}
    >
      <Image
        source={{
          uri: imgUrl,
        }}
        className='w-full h-[280px] rounded-t-2xl'
      />
      <View className='gap-2 p-2'>
        <Text className='text-3xl'>{name}</Text>
        <Text className='text-xs'>
          {address}
        </Text>
        <View className='flex flex-row justify-between items-center px-1'>
          <View className='flex flex-row items-center'>
            <Avatar.Icon
              size={24}
              color='black'
              icon='clock-outline'
              className='bg-transparent'
            />
            <Text className='text-xs'>10:00 - 22:00</Text>
          </View>
          <View className='flex flex-row items-center'>
            <Avatar.Icon
              size={24}
              color='black'
              icon='map-marker-radius-outline'
              className='bg-transparent'
            />
            <Text className='text-xs'>approx 5 km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
