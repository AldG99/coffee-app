import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import colors from './app/config/colors';
import HomeScreens from './app/screens/HomeScreens';
import CoffeeDetailsScreen from './app/screens/CoffeeDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
