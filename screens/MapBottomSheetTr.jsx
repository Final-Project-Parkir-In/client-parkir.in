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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MapsMallCard from '../components/MapsMallCard';
import MapView, { Marker } from 'react-native-maps';
import Loader from '../components/Loader';
import axios from 'axios';
import MallPosition from '../components/MallPosition';

const MapBottomSheetTr = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coordinat, setCoordinat] = useState({
    latitude: '',
    longitude: '',
    accuracy: '',
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoadingMall, setIsLoadingMall] = useState(false);
  const [malls, setMalls] = useState([]);
  useEffect(() => {
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
    (async () => {
      try {
        setIsLoadingMall(true);
        const { data } = await axios.get(
          'https://96e9-103-235-32-116.ap.ngrok.io/malls'
        );
        setMalls(data);
        setIsLoadingMall(false);
      } catch (err) {
        console.log(err, 'ada error?');
        setIsLoadingMall(false);
      }
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
  let bs = createRef(null);

  const renderHeader = () => (
    <View className='bg-white h-10'>
      <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
  const renderInner = () => <MapsMallCard />;

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
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
          {malls?.map((el, i) => {
            return <MallPosition key={'map-key' + i} {...el} />;
          })}
        </MapView>
      </View>
    </View>
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
