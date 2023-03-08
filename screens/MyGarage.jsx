import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import SpecifiedView from '../components/SpecifiedView';
import GarageCarCard from '../components/GarageCarCard';
import {
  useChangeDefaultCarMutation,
  useGetAllCarsQuery,
} from '../redux/services/parkirInApi';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { useEffect, useState } from 'react';

export default function MyGarage({ navigation, route: { params } }) {
  const { token } = useSelector((state) => state.parkirInSlice);
  const { data, isLoading, isError, error, refetch } = useGetAllCarsQuery({
    token,
  });
  const [
    changeDefaultCar,
    { isSuccess, isError: isErrorChange, isLoading: isLoadingChange },
  ] = useChangeDefaultCarMutation();
  const changeToDefault = (carId) => {
    changeDefaultCar({ token, carId });
  };
  const [starId, setStarId] = useState(0);
  // useEffect(() => {
  //   refetch();
  // }, [data]);
  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <Loader />;
  }
  if (isLoadingChange) {
    return <Loader />;
  }
  if (isErrorChange) {
    console.log(error);
    return <ErrorScreen />;
  }
  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }
  if (isSuccess) {
    refetch();
  }
  return (
    <SpecifiedView className='bg-white'>
      <View className='flex-row justify-between items-center px-8 pt-4'>
        <Button
          icon='car'
          mode='contained'
          className='w-[140px] bg-[#D9A14E]'
          onPress={() => navigation.navigate('Add New Car')}
        >
          Add New Car
        </Button>
        <Button
          mode='contained'
          onPress={() => {
            changeToDefault(starId);
          }}
          className='w-fit mb-1 bg-[#2F3B6E] rounded-3xl'
        >
          Set Default Car
        </Button>
      </View>
      <ScrollView className='h-full p-6'>
        {data.map((el) => {
          return (
            <TouchableOpacity
              key={el.id + '-garage-id'}
              className={
                starId == el.id && !el.isDefault
                  ? 'border-4 border-[#D9A14E] h-28 px-2 flex flex-row items-center rounded-xl my-2'
                  : 'border border-slate-400 h-28 px-2 flex flex-row items-center rounded-xl my-2'
              }
              onPress={() => {
                setStarId(el.id);
              }}
            >
              <View className='bborder w-[20%] h-[75%] justify-center items-center mr-2'>
                <Avatar.Icon
                  size={60}
                  icon='car-hatchback'
                  color='#2F3B6E'
                  className=' bg-white shadow-md'
                />
              </View>
              <View className='justify-center w-[200px]'>
                <View className=' flex flex-row p-1'>
                  <Text className='text-lg'>{el?.brand}</Text>
                  <Text className='text-lg mx-2'>|</Text>
                  <Text className='text-lg font-semibold'>{el?.type}</Text>
                </View>
                <View className='bborder p-1'>
                  <Text className='text-lg font-bold'>{el?.numberPlate}</Text>
                </View>
              </View>
              <View className='w-fit h-fit ml-5 justify-center items-center'>
                {el.isDefault ? (
                  <>
                  <Avatar.Icon
                    size={50}
                    icon={'star'}
                    color='#D9A14E'
                    className=' bg-white'
                  />
                  <Text className="text-slate-500">Active</Text>
                  </>
                ) : (
                  <Avatar.Icon
                    size={50}
                    icon={'star-outline'}
                    color='#D9A14E'
                    className=' bg-white'
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <ScrollView className='h-full p-6'></ScrollView> */}
    </SpecifiedView>
  );
}

//    <GarageCarCard
//   {...el}
//   key={el.id + '-id-garage'}
//   selectedDefault={selectedDefault}
//   setSelectedDefault={setSelectedDefault}
// />
