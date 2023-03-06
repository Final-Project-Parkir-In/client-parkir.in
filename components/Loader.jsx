import React from 'react';
import { View, Text, Image } from 'react-native';

const Loader = () => {
  return (
    <View className="h-screen bg-white justify-center items-center">
      <Image source={require("../assets/map-loading.gif")} className="scale-50" />
    </View>
  )
};

export default Loader;
