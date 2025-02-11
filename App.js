import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import colors from './app/config/colors';
import HomeScreens from './app/screens/HomeScreens';
import CoffeeDetailsScreen from './app/screens/CoffeeDetailsScreen';
import CartScreen from './app/screens/CartScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import AddressesScreen from './app/screens/AddressesScreen';
import HelpScreen from './app/screens/HelpScreen';
import { CartProvider } from './app/context/CartContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.dark },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreens} />
          <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Addresses" component={AddressesScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
