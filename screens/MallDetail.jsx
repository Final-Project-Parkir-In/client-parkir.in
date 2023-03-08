import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Button, List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useGetMallByIdQuery } from '../redux/services/parkirInApi';
import ErrorScreen from './ErrorScreen';

export default function MallDetail({ navigation }) {
  const [expanded, setExpanded] = useState('chevron-down');
  const handlePress = () => setExpanded('chevron-up');
  const { idMall, token } = useSelector((state) => state.parkirInSlice);
  const { data, isLoading, isError, error, refetch } = useGetMallByIdQuery({
    id: idMall,
    token,
  });
  useEffect(() => {
    refetch();
  }, [idMall]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen />;
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={{
            uri: data?.imgUrl,
          }}
          className='w-full h-[200px]'
        />
        <View className='bg-white rounded-t-3xl relative mt-[-16]'>
          <View className='h-[180%] gap-2'>
            <View className='gap-2 p-2'>
              <Text className='text-3xl'>{data?.name}</Text>
              <Text className='text-xs'>
                {data?.address}
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
                {/* <View className='flex flex-row items-center'>
                  <Avatar.Icon
                    size={24}
                    color='black'
                    icon='map-marker-radius-outline'
                    className='bg-transparent'
                  />
                  <Text className='text-xs'>3.5 km</Text>
                </View> */}
              </View>
            </View>
            {/* <View className='p-4 h-fit bg-slate-100'>
              <View className='flex flex-row justify-between'>
                <Text>Booking Fee</Text>
                <Text className='font-bold text-red-600'>Rp. 15.000*</Text>
              </View>
              <Text className='text-xs'>*belum termasuk biaya parkir</Text>
            </View> */}

            <List.Section title='' className='px-3'>
              <List.Accordion
                title='User Guide'
                right={(props) => <List.Icon {...props} icon={expanded} />}
                onPress={handlePress}
                className='bg-white'
              >
                <View className='gap-2 px-4'>
                  <Text className='text-xs'>
                    1. User hanya dapat booking untuk maksimal 2 jam kedepan
                  </Text>
                  <Text className='text-xs'>
                    2. User tidak dapat membatalkan booking
                  </Text>
                  <Text className='text-xs'>
                    3. Aplikasi Parkir.In blablabla, belum termasuk{' '}
                  </Text>
                  <Text className='text-xs'>4. Lorem ipsum blabla blabla</Text>
                </View>
              </List.Accordion>
            </List.Section>

            <List.Section title='' className='px-3'>
              <List.Accordion
                title='Syarat & Ketentuan'
                right={(props) => <List.Icon {...props} icon={expanded} />}
                onPress={handlePress}
                className='bg-white'
              >
                <View className='gap-2 mb-[120px] px-4'>
                  <Text className='text-xs'>
                    1. User hanya dapat booking untuk maksimal 2 jam kedepan
                  </Text>
                  <Text className='text-xs'>
                    2. User tidak dapat membatalkan booking
                  </Text>
                  <Text className='text-xs'>
                    3. Aplikasi Parkir.In blablabla, belum termasuk{' '}
                  </Text>
                  <Text className='text-xs'>4. Lorem ipsum blabla blabla</Text>
                </View>
              </List.Accordion>
            </List.Section>
          </View>
        </View>
      </ScrollView>

      <View className='w-full justify-center items-center absolute bottom-0'>
        <Button
          //   icon="camera"
          mode='contained'
          onPress={() => navigation.navigate('Parking Selection')}
          className='w-80 mb-10 bg-[#2F3B6E] rounded-xl'
        >
          Lanjutkan
        </Button>
      </View>
    </View>
  );
}
