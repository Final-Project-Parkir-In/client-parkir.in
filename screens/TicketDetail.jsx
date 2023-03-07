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
        body: '1. Pencarian, Pemesanan dan Pembayaran LOCKEY dilakukan melalui Parkir.In\n\n2. LOCKEY hanya dapa digunakan pada jam operasional gedung/mall',
      },
      {
        title: 'Cara Penggunaan ↘',
        body: '1. Temukan LOCKEY di menu aplikasi Parkir.In',
      },
    ],
  };
  const { token, parkingTransactionId } = useSelector(
    (state) => state.parkirInSlice
  );
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useGetInfoBookingQuery({
    token,
    transactionId: parkingTransactionId,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen />;
  }
  const toPay = (id) => {
    dispatch(getParkingTransactionId({ parkingTransactionId: id }));
    navigation.navigate('payment');
  };
  console.log(data, '<=== car in');
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
              <Text style={style.textTitleDate}>02 Maret 2022 | 10:18</Text>
              <Text style={style.textTitleDate}>Order Id</Text>
            </View>
            <View style={style.status}>
              <Text style={{ color: '#c0c4c0' }}>c23dcsr3</Text>
            </View>
          </View>
          <View style={style.cardTextDate}>
            <View style={style.boxImgInfo}>
              <Image
                style={{ width: '90%', height: 55, borderRadius: 100 }}
                source={{
                  uri: 'https://i.playboard.app/p/AMLnZu_g3TfFFLz690rLM2UdsHGr6vbspj_q2Qy8pFhZxQ/default.jpg',
                }}
              />
            </View>
            <View style={style.info}>
              <Text style={{ fontWeight: '900', fontSize: 17 }}>
                Mall Kelapa Gading
              </Text>
              <Text style={{ color: '#c0c4c0' }}>
                Jl. Bulevar Kelapa Gading Blok M, Klp. Gading Kota Jakarta
                Utara, DKI Jakarta
              </Text>
            </View>
          </View>
          <View>
            <View style={style.cardTextLokasi}>
              <View style={style.boxLokasiInfo}>
                <Text>📍 Location</Text>
              </View>
              <View style={style.lokasiInfo}>
                <Text style={{ fontWeight: '900', fontSize: 17 }}>01</Text>
              </View>
            </View>
            <View style={style.cardTextLokasi}>
              <View style={style.boxLokasiInfo}>
                <Text>🕑 Waktu buka</Text>
              </View>
              <View style={style.lokasiInfo}>
                <Text style={{ fontWeight: '700', fontSize: 15 }}>
                  Pukul 18:00 - 19:00
                </Text>
              </View>
            </View>
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
          {data?.carIn ? (
            <TouchableOpacity
              onPress={() => {
                console.log('hai');
                toPay(data?.id);
              }}
            >
              <Text>Pay ya</Text>
            </TouchableOpacity>
          ) : (
            <QRCode
              value={JSON.stringify({
                name: data?.User?.name,
                mall: data?.ParkingSlot?.Mall?.name,
                plat: data?.User?.Cars[0]?.numberPlate,
                spotParkir: data?.ParkingSlot?.spot,
                typeMobil: data?.User?.Cars[0]?.type,
                brandMobil: data?.User?.Cars[0]?.brand,
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
        {/* <Pressable
          style={{
            width: '50%',
            backgroundColor: 'blue',
            height: 30,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 18, color: 'white', fontWeight: '700' }}>
            CHECK OUT
          </Text>
        </Pressable> */}
      </View>
    </ScrollView>
  );
};

export default DetailPage;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  cardTextStatus: {
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 7,
  },
  cardTextDate: {
    width: '90%',
    justifyContent: 'center',
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
    justifyContent: 'space-around',
  },
  boxStatus: {
    width: '50%',
    padding: 7,
    marginLeft: 10,
  },
  boxImgInfo: {
    width: '20%',
    alignItems: 'center',
  },
  boxLokasiInfo: {
    width: '40%',
    justifyContent: 'center',
  },
  status: {
    width: '40%',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  info: {
    width: '70%',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  lokasiInfo: {
    width: '50%',
    padding: 7,
    justifyContent: 'center',
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
    color: '#c0c4c0',
  },
});