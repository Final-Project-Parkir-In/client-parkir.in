import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { usePaySpotQuery } from '../redux/services/parkirInApi';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { useSelector } from 'react-redux';

export default function PaymentScreens() {
  const { parkingTransactionId, token } = useSelector(
    (state) => state.parkirInSlice
  );
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = usePaySpotQuery({ parkingTransactionId, token }); // akan berdasrkan parking spot id
  useEffect(() => {
    refetch();
  }, [parkingTransactionId]);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen />;
  }
  return (
    <>
      <WebView
        source={{
          uri: `${transactions.redirect_url}`,
        }}
      />
    </>
  );
}
