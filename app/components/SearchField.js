import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const SearchField = ({ onSearch }) => {
  return (
    <View
      style={{
        borderRadius: SPACING,
        overflow: 'hidden',
        marginBottom: SPACING,
      }}
    >
      <BlurView
        intensity={30}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <TextInput
          style={{
            width: '100%',
            color: colors.white,
            fontSize: SPACING * 1.7,
            padding: SPACING,
            paddingLeft: SPACING * 3.5,
          }}
          placeholder="Encuentra tu café..."
          placeholderTextColor={colors.light}
          onChangeText={onSearch}
        />
        <Ionicons
          style={{ position: 'absolute', left: SPACING }}
          name="search"
          color={colors.light}
          size={SPACING * 2}
        />
      </BlurView>
    </View>
  );
};

export default SearchField;
