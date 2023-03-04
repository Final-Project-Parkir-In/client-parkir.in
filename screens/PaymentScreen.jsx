import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'base-64';
export default function PaymentScreens() {
  const [loading, setLoading] = useState(false);

  // transactions data set to false first for the loading
  const [transactions, setTransactions] = useState(false);

  // on production dont place the server key here
  // dont forget add ":" in the end of the string
  const serverKey = 'SB-Mid-server-eYv4NQeO2ODjMM6ywHr_YFX9:';
  const base64Key = base64.encode(serverKey);
  // order ID
  const orderID =
    'Your-Order-id' + Math.floor(100000000000 + Math.random() * 90000000);

  useEffect(() => {
    midtrans().then((data) => {
      // get the response and save it to the state
      setTransactions(data);
      // checking if the order already paid or not
      if (data.error_messages) {
        alert('This Order ID has been paid');
      }
    });
  }, []);

  async function midtrans(user) {
    // url for transactions
    // this url is for sandbox
    const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    // use this url for production : https://app.midtrans.com
    const data = {
      transaction_details: {
        order_id: orderID,
        gross_amount: 60000,
      },
      item_details: [
        {
          id: 'PRODUCTID1',
          price: 20000,
          quantity: 1,
          name: 'Product 1',
          category: 'Clothes',
          merchant_name: 'Merchant',
        },
        {
          id: 'PRODUCTID2',
          price: 40000,
          quantity: 1,
          name: 'Product 2',
          category: 'Clothes',
          merchant_name: 'Merchant',
        },
      ],
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: 'budi',
        last_name: 'pratama',
        email: 'budi.pra@example.com',
        phone: '08111222333',
      },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64Key,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function getstatus() {
    const url = `https://api.sandbox.midtrans.com/v2/${orderID}/status`;

    // fetch data
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64Key,
      },
    });
    return response.json();
  }

  function checkPayment() {
    setLoading(true);
    getstatus().then((data) => {
      if (data.status_code == 200) {
        console.log(data);
        setLoading(false);
        alert('This Order ID has been paid');
      } else {
        console.log(data);
        setLoading(false);
        alert('This Order ID has not been paid');
      }
    });
  }
  console.log(transactions, '<===');
  if (loading) {
    return <Text>Loading</Text>;
  }
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
          <TouchableOpacity
            onPress={() => {
              checkPayment();
            }}
            style={{
              backgroundColor: '#3366FF',
              padding: 20,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            disabled={loading}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              Uwu
            </Text>
            {loading ? <ActivityIndicator color='#fff' /> : <Text>Uhui</Text>}
          </TouchableOpacity>
        </>
      )}
    </>
  );
}
