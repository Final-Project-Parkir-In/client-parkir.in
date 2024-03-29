import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';

import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { useGetInfoBookingQuery } from '../redux/services/parkirInApi';
import { getParkingTransactionId } from '../redux/slice/parkirInSlice';
import ErrorScreen from './ErrorScreen';

const DetailPage = ({ navigation, route: { params } }) => {
  const state = {
    content: [
      {
        title: 'Syarat & Ketentuan ↘',
        body: '1. Pencarian, Pemesanan dan Pembayaran dilakukan melalui Parkir.In\n\n2. Parkir.In mengikuti jam operasional mall',
      },
      {
        title: 'Cara Penggunaan ↘',
        body: '1. Parkir.In',
      },
    ],
  };
  const [isCarIn, setIsCarIn] = useState(false);
  const { token, parkingTransactionId } = useSelector(
    (state) => state.parkirInSlice
  );
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetInfoBookingQuery({
      token,
      transactionId: parkingTransactionId,
    });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.carIn) {
      setIsCarIn(true);
    }
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen />;
  }
  const toPay = (id) => {
    console.log(id, '<===');
    dispatch(getParkingTransactionId({ parkingTransactionId: id }));
    console.log(data?.User, 'ini da');
    navigation.navigate('payment');
  };
  // console.log(data.carOut,'ini data')

  return (
    <ScrollView>
      <View style={style.container}>
        <View
          style={{
            backgroundColor: '#fff',
            marginTop: 10,
            borderRadius: 10,
            width: '90%',
            alignItems: 'center',
          }}
        >
          <View style={style.cardTextDate}>
            <View style={style.boxStatus}>
              <View className='gap-2'>
                <Text style={style.textTitleDate}>
                  {new Date(data?.createdAt)?.toLocaleDateString('id-ID')}
                </Text>
                <Text style={style.textTitleDate}>
                  {new Date(data?.createdAt)?.toLocaleTimeString('en-US')}
                </Text>
              </View>
            </View>
            <View style={style.status}>
              <Text style={style.textTitleDate}>Order Id</Text>
              <Text style={{ color: '#222', marginTop: 4 }}>
                {data?.id}-PI-23
              </Text>
            </View>
          </View>
          <View style={style.cardTextDate}>
            <View style={style.boxImgInfo}>
              <Image
                style={{ width: '90%', height: 55, borderRadius: 100 }}
                source={{
                  uri: data?.ParkingSlot?.Mall?.imgUrl,
                }}
              />
            </View>
            <View style={style.info}>
              <Text style={{ fontWeight: '900', fontSize: 17 }}>
                {data?.ParkingSlot.Mall.name}
              </Text>
              <Text style={{ color: '#c0c4c0' }}>
                {data?.ParkingSlot.Mall.address}
              </Text>
            </View>
          </View>
          <View>
            <View style={style.cardTextLokasi}>
              <View style={style.boxLokasiInfo}>
                <Text>📍 Parking Spot</Text>
              </View>
              <View style={style.lokasiInfo}>
                <Text style={{ fontWeight: '900', fontSize: 17 }}>
                  {data?.ParkingSlot.spot}
                </Text>
              </View>
            </View>
            {/* <View style={style.cardTextLokasi}>
              <View style={style.boxLokasiInfo}>
                <Text>🕑 Waktu buka</Text>
              </View>
              <View style={style.lokasiInfo}>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>
                  Pukul 18:00 - 19:00
                </Text>
              </View>
            </View> */}
          </View>
        </View>

        {/* QR Image */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: 200,
            marginTop: 20,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          {isCarIn ? (
            data.carOut ? 
            <View className="p-5 bg-[#D9A14E] rounded-3xl">
              <Text className="text-lg font-bold text-[#2F3B6E]">Already Paid</Text>
            </View> :
            <TouchableOpacity
              className='w-full h-16 justify-center items-center bg-[#D9A14E] rounded-3xl'
              onPress={() => {
                toPay(data?.id);
              }}
            >
              <Text className='text-lg font-bold text-[#2F3B6E]'>
                CHECK OUT
              </Text>
            </TouchableOpacity>

          ) : (

            data.isExpired? 
            <View className="p-5 bg-red-300 rounded-3xl w-[200px]">
              <Text className="text-lg font-bold text-slate-600 text-center">Already Expired</Text>
            </View> : <QRCode
            value={JSON.stringify({
              name: data?.User?.name,
              mall: data?.ParkingSlot?.Mall?.name,
              plat: data?.User?.Cars[0]?.numberPlate,
              spotParkir: data?.ParkingSlot?.spot,
              typeMobil: data?.User?.Cars[0]?.type,
              brandMobil: data?.User?.Cars[0]?.brand,
              id: data?.id,
            })}
            logo={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..',
            }}
            logoSize={50}
            size={200}
            logoBackgroundColor='transparent'
            className='w-full h-full'
          />
          )}
        </View>
        {/* QR Image */}

        {/* Dropdown */}
        {state.content.map((el, i) => {
          return (
            <DropDownItem
              key={i}
              style={{
                backgroundColor: 'white',
                marginBottom: 20,
                width: '90%',
                borderRadius: 20,
              }}
              contentVisible={false}
              visibleImage='v'
              header={
                <View style={{ padding: 10, marginLeft: 10 }}>
                  <Text style={{ fontSize: 20, fontWeight: '700' }}>
                    {el.title}
                  </Text>
                </View>
              }
            >
              <Text>{el.body}</Text>
            </DropDownItem>
          );
        })}
        {/* Dropdown */}
        {/* checkout  */}
      </View>
    </ScrollView>
  );
};

export default DetailPage;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  cardTextStatus: {
    width: '90%',
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 7,
  },
  cardTextDate: {
    width: '90%',
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#c0c4c0',
  },
  cardTextLokasi: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    // justifyContent: 'space-around',
  },
  boxStatus: {
    width: '50%',
    padding: 7,
    marginLeft: 10,
  },
  boxImgInfo: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 12,
  },
  boxLokasiInfo: {
    width: '40%',
    // justifyContent: 'center',
  },
  status: {
    width: '40%',
    padding: 7,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },
  info: {
    width: '70%',
    padding: 7,
    // justifyContent: 'start',
    alignItems: 'flex-start',
  },
  lokasiInfo: {
    width: '50%',
    padding: 7,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textTitleStatus: {
    fontSize: 17,
    marginTop: 3,
    textAlign: 'left',
  },
  textTitleDate: {
    fontSize: 15,
    marginTop: 3,
    textAlign: 'left',
    color: '#222',
  },
});
