import axios from 'axios';
import React from 'react';
import { Text } from 'react-native';
import { Marker } from 'react-native-maps';

const MallPosition = ({ long, lat, id }) => {
  // console.log(el, 'uhui');
  const mallDetail = async (id) => {
    console.log(id, 'sini masuk detail');
    try {
      const { data } = await axios.get(
        'https://96e9-103-235-32-116.ap.ngrok.io/malls/' + id
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Marker
        coordinate={{
          latitude: +long,
          longitude: +lat,
        }}
        pinColor={'green'}
        onPress={() => {
          mallDetail(id);
        }}
      />
    </>
  );
};

export default MallPosition;
