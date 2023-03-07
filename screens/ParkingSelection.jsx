import {
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Badge } from 'react-native-paper';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import SpecifiedView from '../components/SpecifiedView';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetParkingSpotQuery,
  usePostBookingSpotMutation,
} from '../redux/services/parkirInApi';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { getParkingTransactionId } from '../redux/slice/parkirInSlice';

export default function ParkingSelection({ navigation }) {
  const { idMall, token } = useSelector((state) => state.parkirInSlice);
  const [spotData, setSpotData] = useState({});
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  // get parking spot data
  const {
    data: parkingSpots,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetParkingSpotQuery({ idMall, token });
  useEffect(() => {
    refetch();
  }, []);
  const [
    postBookingSpot,
    { isLoading: postLoading, isError: postError, data, isSuccess },
  ] = usePostBookingSpotMutation();
  if (isLoading) {
    return <Loader />;
  }
  if (postLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }

  if (postError) {
    return <ErrorScreen />;
  }
  if (isSuccess) {
    dispatch(getParkingTransactionId({ parkingTransactionId: data.id }));
    navigation.navigate('My Ticket');
    // console.log(data, 'ini dat');
  }

  const handleBooking = () => {
    if (spotData.isAvailable) {
      postBookingSpot({ token, parkingId: spotData?.id });
    } else {
      alert('spot udah di booking');
    }
  };
  console.log(parkingSpots, '<===');

  return (
    <SpecifiedView style={{ flex: 1 }} className='bg-[#D9A14E]'>
      <ScrollView>
        <View className='h-16 justify-center items-center'>
          <Text className='mt-4 text-xl font-bold'>Lippo Mall Kemang</Text>
        </View>
        <View className='mt-4 h-[150%] p-4 items-center rounded-t-3xl bg-white'>
          <View className='my-4'>
            <Text className='text-base'>Select your parking spot</Text>
          </View>
          <View className='mt-10 p-4 w-[90%] flex flex-row flex-wrap justify-center rounded-xl bg-white shadow-2xl'>
            {parkingSpots.map((el, i) => {
              let selectedSpot = '';
              if (el.id === selected) {
                selectedSpot = 'border border-2';
              }
              return (
                <TouchableOpacity
                  key={el.id + '-id-park'}
                  className={
                    el.isAvailable
                      ? `w-20 h-20 m-2 rounded-xl bg-amber-100 shadow-lg` +
                        selectedSpot
                      : 'w-20 h-20 m-2 rounded-xl bg-slate-400 shadow-lg '
                  }
                  onPress={() => {
                    setSelected(el.id);
                    setSpotData({ ...el });
                  }}
                >
                  <Text>{el.spot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className='flex flex-row items-center p-4 mt-8'>
            <View className='items-center gap-1 flex flex-row'>
              <Badge className='bg-amber-300' />
              <Text>Tersedia</Text>
            </View>
            <View className='items-center gap-1 flex flex-row mx-4'>
              <Badge className='bg-slate-400' />
              <Text>Tidak Tersedia</Text>
            </View>
            <View className='items-center gap-1 flex flex-row'>
              <View className='bg-amber-300 border-2 border-[#2F3B6E] rounded-full h-6 w-6' />
              {/* <Badge className="bg-[#D9A14E] border-[#2F3B6E]" /> */}
              <Text>Dipilih</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className='w-full justify-center items-center absolute bottom-0 bg-white'>
        <View className='h-14 p-4 w-full flex flex-row justify-between items-center'>
          <Text className='font-bold'>Price (per hour)</Text>
          <Text className='font-bold'>Rp 15.000</Text>
        </View>
        <Button
          mode='contained'
          onPress={() => {
            handleBooking();
          }}
          className='w-80 mb-10 mt-4 bg-[#2F3B6E] rounded-xl'
        >
          Booking
        </Button>
      </View>
    </SpecifiedView>
  );
}
