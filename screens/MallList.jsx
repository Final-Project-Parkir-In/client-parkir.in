import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Loader from '../components/Loader';
import MallListCard from '../components/MallListCard';
import { useGetAllMallsQuery } from '../redux/services/parkirInApi';
import ErrorScreen from './ErrorScreen';
import { useSelector } from 'react-redux';

export default function MallList({ navigation }) {
  const { token } = useSelector((state) => state.parkirInSlice);
  // const [malls, setMalls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const onChangeSearch = (query) => {
  //   console.log(query);
  //   setSearchQuery(query);
  // };
  // get all malls query from rtk
  const { data, isLoading, error, isError, refetch } = useGetAllMallsQuery({
    token,
  });
  // useEffect(() => {
  //   if (Object.values(data).length > 0) {
  //     setMalls(data);
  //   }
  // }, [data]);
  // useEffect(() => {
  //   if (malls.length) {
  //     if (searchQuery.length) {
  //       // console.log(newMall);
  //       setMalls((prevState) => {
  //         let newMall = prevState.filter((el) => {
  //           return el.name.toLowerCase() === searchQuery.toLowerCase();
  //         });
  //         return newMall;
  //       });
  //       console.log(malls);
  //     }
  //   }
  //   console.log('masuk', searchQuery, searchQuery.length);
  //   // console.log(newMall, 'buta anda', searchQuery);
  // }, [searchQuery]);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }

  const malls = () => {
    if (searchQuery) {
      return data?.filter((el) => {
        return el.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
    return data;
  };
  return (
    <View className='bg-white'>
      <Searchbar
        placeholder='Cari Lokasi Parkir'
        onChangeText={(e) => {
          setSearchQuery(e);
        }}
        value={searchQuery}
        className='bg-slate-50 mx-3 mt-2 h-[40px] rounded-2xl'
      />

      <View className='flex flex-row justify-start p-3'>
        <Text className='text-lg font-semibold p-1'>
          Lokasi Parkir.In terdekat
        </Text>
      </View>
      <ScrollView className='h-screen'>
        {malls().map((el, i) => {
          return (
            <MallListCard navigation={navigation} key={i + 'malls'} {...el} />
          );
        })}
      </ScrollView>
    </View>
  );
}
