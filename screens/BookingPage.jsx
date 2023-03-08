import {
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetAllTicketsQuery } from '../redux/services/parkirInApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { getParkingTransactionId } from '../redux/slice/parkirInSlice';
const BookingPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');
  const { token, parkingTransactionId } = useSelector(
    (state) => state.parkirInSlice
  );
  const dispatch = useDispatch();
  const { data, isLoading, isError, error, refetch } = useGetAllTicketsQuery({
    token,
  });

  useEffect(() => {
    refetch();
  }, [parkingTransactionId]);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(error, 'error');
    return <ErrorScreen />;
  }
  console.log(data, "<<< nini")

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.navigation}>
          {/* <TextInput
            placeholder='🔍 Cari E-Tiket'
            editable
            multiline
            numberOfLines={4}
            maxLength={50}
            value={search}
            onChangeText={(search) => onChangeSearch(search)}
            style={style.textInput}
          /> */}
          <View style={style.cardTextProductFilter}>
            <Pressable style={style.boxFilter}>
              <Text style={{ color: '#ffff' }}>Berlangsung</Text>
            </Pressable>
            <Pressable style={style.boxFilter}>
              <Text style={{ color: '#ffff' }}>Selesai</Text>
            </Pressable>
          </View>
        </View>
        <View className='w-full px-2'>
        {data?.map((el) => {
          // console.log(el, '<==');
          const imgActive = 'w-full h-full';
          const imgExpired = 'w-full h-full  opacity-50';
          const textActive = 'font-bold text-lg text-left';
          const textExpired = 'font-bold text-lg text-left opacity-50';
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Ticket Detail', el.id);
                dispatch(
                  getParkingTransactionId({ parkingTransactionId: el.id })
                );
              }}
              style={style.cardTextProduct}
              key={el.id + 'screen-tiket'}
            >
              <View className='w-[35%] h-full items-center'>
                <Image
                  source={{
                    uri: el.ParkingSlot.Mall.imgUrl,
                  }}
                  // style={style.imageCardProduct}
                  className={el.isExpired ? imgExpired : imgActive}
                />
              </View>
              <View className=" ml-[10px] justify-center">
                {/* style={style.boxProduct} */}
                <View>
                  <Text className={el.isExpired ? textExpired : textActive}>
                    {el.ParkingSlot.Mall.name}
                  </Text>
                  <Text className="text-[10px] font-light">{el.ParkingSlot.Mall.address}</Text>
                  <Text className="my-1">{new Date(el.createdAt)?.toLocaleDateString('en-US')}       {new Date(el.createdAt)?.toLocaleTimeString('en-US')}</Text>
                  <Text
                    style={{
                      color: '#c4c4c4',
                      fontSize: 13,
                      marginTop: 5,
                      textDecorationLine: 'underline',
                    }}
                  >
                    Tap to see detail
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
        {/* Bila belum ada transaksi */}
        {!data.length && (
          <>
            <Image
              source={{
                uri: `https://www.mtwi.co.id/public/assets/images/not-found.png`,
              }}
              style={{ flex: 5, width: '90%', height: 250, marginTop: '30%' }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Belum ada transaksi
            </Text>
            <Text style={{ fontSize: 13 }}>
              Lakukan transaksi kamu dengan Parkir.In
            </Text>
          </>
        )}
        {/* Bila belum ada transaksi */}
          
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    alignContent: 'center',
    
  },
  navigation: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxFilter: {
    borderWidth: 1,
    padding: 8,
    marginLeft: 10,
    borderRadius: 100,
    borderColor: '#ffff',
    backgroundColor: '#E9A23B',
  },
  textInput: {
    width: '90%',
    height: 35,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: '#ffff',
    color: 'black',
    marginTop: 20,
  },
  cardTextProduct: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffff',
    // borderRadius: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
    flex: 1,
  },
  cardTextProductFilter: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  boxProduct: {
    width: '60%',
    justifyContent: 'center',
    marginLeft: 10,
    // borderWidth: 2
  },
  textTitleProduct: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 3,
    textAlign: 'left',
  },
  imageCardProduct: {
    width: '80%',
    height: '100%',
    height: 60,
    borderRadius: 10,
    borderColor:'red',
    borderWidth:'2px'

  },
  // boxProductImg: {
  //   width: '34%',
  //   // padding: 4,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderColor:'black',
  //   borderWidth:'2px'
  // },
});
