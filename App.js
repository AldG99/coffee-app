import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from './app/config/colors';
import HomeScreens from './app/screens/HomeScreens';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      <HomeScreens />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
