import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
export default function PaymentScreens() {
  const [loading, setLoading] = useState(false);

  // transactions data set to false first for the loading
  const [transactions, setTransactions] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log('masuk cok');
        setLoading(true);
        const response = await fetch('http://192.168.55.21:3000/checkOut/2', {
          method: 'get',
        });
        const data = await response.json();
        console.log(data, 'ini data');
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {!transactions ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color='#fff' size='large' />
        </View>
      ) : (
        <>
          <WebView
            source={{
              uri: `${transactions.redirect_url}`,
            }}
          />
        </>
      )}
    </>
  );
}
