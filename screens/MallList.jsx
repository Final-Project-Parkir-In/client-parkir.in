import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Loader from '../components/Loader';
import MallListCard from '../components/MallListCard';
import { useGetAllMallsQuery } from '../redux/services/parkirInApi';
import ErrorScreen from './ErrorScreen';
import { useSelector } from 'react-redux';

export default function MallList({ navigation }) {
  const { token } = useSelector((state) => state.parkirInSlice);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  // get all malls query from rtk
  const { data: malls, isLoading, error, isError } = useGetAllMallsQuery(token);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }
  return (
    <View className='bg-white'>
      <Searchbar
        placeholder='Cari Lokasi Parkir'
        onChangeText={onChangeSearch}
        value={searchQuery}
        className='bg-slate-50 mx-3 mt-2 h-[40px] rounded-2xl'
      />

      <View className='flex flex-row justify-between p-3'>
        <Text className='text-lg font-semibold p-1'>
          Lokasi Parkir.In terdekat
        </Text>
        <Button
          icon='map-marker-radius-outline'
          mode='contained'
          className='bg-amber-500'
          onPress={() => console.log('Pressed')}
        >
          <Text>Petunjk</Text>
        </Button>
      </View>
      <ScrollView className='h-screen'>
        {malls?.map((el, i) => {
          return (
            <MallListCard navigation={navigation} key={i + 'malls'} {...el} />
          );
        })}
      </ScrollView>
    </View>
  );
}
