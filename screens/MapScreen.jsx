import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Platform, Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import Loader from '../components/Loader';
import getDirections from '../helpers/getCoordinateMap';

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
    (async () => {
      try {
        setIsLoadingCoords(true);
        const coords = await getDirections(
          `${coordinat.latitude},${coordinat.longitude}`,
          '-6.2860716972525985,106.74918377771974' // bakalan dari db
        );
        setCoords(coords);
        setIsLoadingCoords(false);
      } catch (err) {
        setErrorMsg(err);
        setIsLoadingCoords(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isLoadingCoords) {
    return <Loader />;
  }
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  console.log(coords);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
        />
        {coords.length > 0 && <Polyline coordinates={coords} />}
        <Marker coordinate={coordinat} pinColor={'green'} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
