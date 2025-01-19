import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from './app/config/colors';
import HomeScreens from './app/screens/HomeScreens';
import CoffeeDetailsScreen from './app/screens/CoffeeDetailsScreen';
import coffees from './app/config/coffees';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      <CoffeeDetailsScreen coffee={coffees[2]} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
