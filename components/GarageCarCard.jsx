import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetAllCarsQuery } from '../redux/services/parkirInApi';
import ErrorScreen from '../screens/ErrorScreen';
import Loader from './Loader';
export default function GarageCarCard({
  brand,
  numberPlate,
  type,
  id,
  isDefault,
}) {
  // const [isDefault, setIsDefault] = useState('star-outline');
  const [defaultStarId, setDefaultStartId] = useState(0);
  // const { token } = useSelector((state) => state.parkirInSlice);
  // const { data, isLoading, isError, error } = useGetAllCarsQuery({ token });
  const handleSelect = (carId) => {
    console.log(carId, 'uhi', defaultStarId);
    setDefaultStartId(carId);
    // setSelectedDefault(!selectedDefault);
  };
  console.log(id, defaultStarId);

  return (
    <TouchableOpacity
      className={
        defaultStarId == id
          ? 'border border-red-400 h-28 px-2 flex flex-row items-center rounded-xl my-2'
          : 'border border-blue-400 h-28 px-2 flex flex-row items-center rounded-xl my-2'
      }
      onPress={() => {
        setDefaultStartId(id);
      }}
    >
      <View className='bborder w-[25%] h-[75%] justify-center items-center'>
        <Avatar.Icon
          size={70}
          icon='car-hatchback'
          color='#2F3B6E'
          className=' bg-white shadow-md'
        />
      </View>
      <View className='border justify-center'>
        <View className='border flex flex-row p-1'>
          <Text className='text-lg'>{brand}</Text>
          <Text className='text-lg mx-2'>|</Text>
          <Text className='text-lg font-semibold'>{type}</Text>
        </View>
        <View className='bborder p-1'>
          <Text className='text-lg font-bold'>{numberPlate}</Text>
        </View>
      </View>
      <View className='border w-[25%] h-[75%] ml-5 justify-center items-center'>
        {isDefault ? (
          <Avatar.Icon
            size={70}
            icon={'star'}
            color='#D9A14E'
            className=' bg-white'
          />
        ) : (
          <Avatar.Icon
            size={70}
            icon={'star-outline'}
            color='#D9A14E'
            className=' bg-white'
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
