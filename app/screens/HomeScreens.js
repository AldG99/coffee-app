import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import SPACING from '../config/SPACING';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SearchField from '../components/SearchField';

const avatar = require('../../assets/avatar.png');

const HomeScreens = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: SPACING }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: SPACING.radius,
              overflow: 'hidden',
              width: SPACING * 4,
              height: SPACING * 4,
              borderRadius: SPACING,
            }}
          >
            <BlurView
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="menu"
                size={SPACING * 2.5}
                color={colors.secondary}
              />
            </BlurView>
          </TouchableOpacity>
          <View
            style={{
              width: SPACING * 4,
              height: SPACING * 4,
              overflow: 'hidden',
              borderRadius: SPACING,
            }}
          >
            <BlurView style={{ height: '100%', padding: SPACING / 2 }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: SPACING,
                }}
                source={avatar}
              />
            </BlurView>
          </View>
        </View>
        <View style={{ width: '80%', marginVertical: SPACING * 3 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: SPACING * 3.5,
              fontWeight: '600',
            }}
          >
            Encuentra el mejor café para ti
          </Text>
        </View>
        <SearchField />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({});
