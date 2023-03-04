import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Loader from '../components/Loader';

const BarcodeScreen = () => {
  const [qrImg, setQrImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // generateQrCode('uhiiii');
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <View>
      {/* <Image source={{ uri: qrImg }} /> */}
      <QRCode
        value={JSON.stringify({
          user: 'ahzan',
          mall: 'disana',
          plat: 'kasfd',
          spotParkir: 'sjsj',
          typeMobil: 'jskjs',
          dateBooking: 'ksjkf',
        })}
        logo={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..' }}
        logoSize={30}
        logoBackgroundColor='transparent'
      />
    </View>
  );
};

export default BarcodeScreen;
