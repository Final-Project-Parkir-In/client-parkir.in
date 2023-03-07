import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import React, { createRef, useEffect, useState } from 'react';
import BottomSheetMap from '../components/BottomSheetMap';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MapsMallCard from '../components/MapsMallCard';
import MapView, { Marker } from 'react-native-maps';
import Loader from '../components/Loader';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useGetAllMallsQuery } from '../redux/services/parkirInApi';
import ErrorScreen from './ErrorScreen';
import { useSelector } from 'react-redux';

const MapBottomSheetTr = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.parkirInSlice);
  // get all data mall from rtk
  const {
    data: malls,
    isLoading: isLoadingMall,
    isError,
    error,
  } = useGetAllMallsQuery({ token });

  // get user coordinat
  const [coordinat, setCoordinat] = useState({
    latitude: '',
    longitude: '',
    accuracy: '',
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    // function to get coordinate user
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('error disini');
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setCoordinat({
        ...coordinat,
        latitude: coords.latitude,
        longitude: coords.longitude,

        accuracy: coords.accuracy,
      });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isLoadingMall) {
    return <Loader />;
  }
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }
  let cardRef = createRef(null);

  const renderHeader = () => (
    <View className='bg-white h-10'>
      <TouchableOpacity onPress={() => cardRef.current.snapTo(1)}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
  const renderInner = () => {
    return malls.map((el) => {
      return <MapsMallCard {...el} key={el.id + '-id-malls'} />;
    });
  };
  const getDetailMall = () => {
    cardRef.current.snapTo(1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={cardRef}
        snapPoints={[500, 250, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
      />

      <View>
        <MapView
          className='w-full h-screen'
          initialRegion={{
            latitude: coordinat.latitude,
            longitude: coordinat.longitude,
            latitudeDelta: coordinat.latitudeDelta,
            longitudeDelta: coordinat.longitudeDelta,
          }}
        >
          {/* lokasi kita */}
          <Marker coordinate={coordinat} pinColor={'blue'} />
          {/* lokasi mall */}
          {malls?.map(({ lat, long, id }, i) => {
            return (
              <Marker
                coordinate={{
                  latitude: +lat,
                  longitude: +long,
                }}
                pinColor={'green'}
                key={i + '-id-coordinate'}
                onPress={() => {
                  getDetailMall();
                }}
              />
            );
          })}
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
};

export default MapBottomSheetTr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
