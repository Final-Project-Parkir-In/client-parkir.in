import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './screens/Login';
import Register from './screens/Register';
import InputCar from './screens/InputCar';
import Home from './screens/Home';
import MyTicket from './screens/MyTicket';
import MyAccount from './screens/MyAccount';
import MallList from './screens/MallList';
import MallDetail from './screens/MallDetail';
import BarcodeScreen from './screens/BarcodeScreen';
import PaymentScreens from './screens/PaymentScreen';
import ParkingSelection from './screens/ParkingSelection';
import PaymentPage from './screens/PaymentPage';
import BookingPage from './views/BookingPage';
import MyGarage from './screens/MyGarage';
import MallListCard from './components/MallListCard';
import MapsMallCard from './components/MapsMallCard';
import MapBottomSheetTr from './screens/MapScreen';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeToken } from './redux/slice/parkirInSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Stack-Home'
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name='Parkir.In locations'
        component={MapBottomSheetTr}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name='Mall List'
        component={MallList}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name='Mall Detail'
        component={MallDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name='Parking Selection'
        component={ParkingSelection}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name='Payment Page'
        component={PaymentScreens}
      />
    </Stack.Navigator>
  );
};

const StackTicket = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='E-Tiket'
        component={BookingPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name='Stack-My Ticket'
        component={MyTicket}
      />
    </Stack.Navigator>
  );
};

const StackAccount = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true }}
        name='My Account'
        component={MyAccount}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name='Garasi Saya'
        component={MyGarage}
      />
      {/* <Stack.Screen
        options={{ headerShown: true }}
        name='doi ini component maps'
        component={MapsMallCard}
      /> */}
    </Stack.Navigator>
  );
};

export default function Index() {
  const { token } = useSelector((state) => state.parkirInSlice);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');
      dispatch(takeToken({ token: value }));
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Login'
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Register'
            component={Register}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Input Car'
            component={InputCar}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'My Ticket') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === 'My Account') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#D9A14E',
            tabBarInactiveTintColor: '#2F3B6E',
          })}
        >
          <Tab.Screen
            options={{ headerShown: false }}
            name='Home'
            component={StackHome}
          />
          <Tab.Screen
            options={{ headerShown: true }}
            name='My Ticket'
            component={StackTicket}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name='My Account'
            component={StackAccount}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
