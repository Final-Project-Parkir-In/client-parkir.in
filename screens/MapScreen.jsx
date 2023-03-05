import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import Loader from '../components/Loader';
import getDirections from '../helpers/getCoordinateMap';
import axios from 'axios';
import MallPosition from '../components/MallPosition';
import MapsMallCard from '../components/MapsMallCard';
import BottomSheetMap from '../components/BottomSheetMap';

export default function App() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCoords, setIsLoadingCoords] = useState(false);
  const [coordinat, setCoordinat] = useState({
    latitude: '',
    longitude: '',
    accuracy: '',
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coords, setCoords] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoadingMall, setIsLoadingMall] = useState(false);
  const [malls, setMalls] = useState([]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
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
    // (async () => {
    //   try {
    //     setIsLoadingCoords(true);
    //     const coords = await getDirections(
    //       `${coordinat.latitude},${coordinat.longitude}`,
    //       '-6.2860716972525985,106.74918377771974' // bakalan dari db
    //     );
    //     setCoords(coords);
    //     setIsLoadingCoords(false);
    //   } catch (err) {
    //     setErrorMsg(err);
    //     setIsLoadingCoords(false);
    //   }
    // })();
    (async () => {
      try {
        setIsLoadingMall(true);
        const { data } = await axios.get(
          'https://96e9-103-235-32-116.ap.ngrok.io/malls'
        );
        setMalls(data);
        setIsLoadingMall(false);
      } catch (err) {
        console.log(err);
        setIsLoadingMall(false);
      }
    })();
  }, []);
  const windowHeight = Dimensions.get('window').height;
  console.log(windowHeight, 'ini height');

  if (isLoading) {
    return <Loader />;
  }
  if (isLoadingMall) {
    return <Loader />;
  }
  if (isLoadingCoords) {
    return <Loader />;
  }
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  // console.log(+malls[0]?.long, 'longtitude', +malls[0]?.lat);
  console.log(malls);
  return (
    <View style={styles.container}>
      <MapView
        className='w-full h-[80%]'
        initialRegion={{
          latitude: coordinat.latitude,
          longitude: coordinat.longitude,
          latitudeDelta: coordinat.latitudeDelta,
          longitudeDelta: coordinat.longitudeDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude: -6.2860716972525985, // bakalan lokasi dari mall fetch data ya
            longitude: 106.74918377771974, // bakalan lokasi dari mall fetch data ya
          }}
          pinColor={'blue'}
        />
        <Marker coordinate={coordinat} />
        {malls?.map((el, i) => {
          return <MallPosition key={'map-key' + i} {...el} />;
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
