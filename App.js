import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import MyTicket from './screens/MyTicket';
import MyAccount from './screens/MyAccount';
import MallList from './screens/MallList';
import MapScreen from './screens/MapScreen';
import MallDetail from './screens/MallDetail';
import DetailPage from './screens/Detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Stack-Home" component={Home} />
      <Stack.Screen name='maps' component={MapScreen} />
      <Stack.Screen options={{ headerShown: true }} name="Mall List" component={MallList} />
      <Stack.Screen options={{ headerShown: true }} name="Mall Detail" component={MallDetail} />
    </Stack.Navigator>
  );
};

const StackTicket = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Stack-My Ticket'
        component={MyTicket}
      />
      <Stack.Screen options={{headerShown: false}} name='Detail Ticket' component={DetailPage}/>
    </Stack.Navigator>
  );
};

const StackAccount = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Stack-My Account'
        component={MyAccount}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'blue',
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
          options={{ headerShown: true }}
          name='My Account'
          component={StackAccount}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
