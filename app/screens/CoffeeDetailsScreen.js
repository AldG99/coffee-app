import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SPACING from '../config/SPACING';
import { BlurView } from 'expo-blur';

const { height } = Dimensions.get('window');

const CoffeeDetailsScreen = ({ coffee }) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <ImageBackground
          source={coffee.image}
          style={{
            height: height / 2 + SPACING * 2,
            justifyContent: 'space-between',
          }}
          imageStyle={{ borderRadius: SPACING * 3 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: SPACING * 1.5,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.dark,
                padding: SPACING,
                borderRadius: SPACING * 1.5,
              }}
            >
              <Ionicons
                name="arrow-back"
                color={colors.light}
                size={SPACING + 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.dark,
                padding: SPACING,
                borderRadius: SPACING * 1.5,
              }}
            >
              <Ionicons name="heart" color={colors.light} size={SPACING + 2} />
            </TouchableOpacity>
          </View>
          <View style={{ borderRadius: SPACING * 3, overflow: 'hidden' }}>
            <BlurView
              intensity={80}
              tint="dark"
              style={{
                padding: SPACING * 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: SPACING * 2,
                    color: colors.white,
                    fontWeight: '600',
                    marginBottom: SPACING,
                  }}
                >
                  {coffee.name}
                </Text>
                <Text
                  style={{
                    fontSize: SPACING * 1.8,
                    color: colors['white-smoke'],
                    fontWeight: '500',
                    marginBottom: SPACING,
                  }}
                >
                  {coffee.included}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: SPACING }}>
                  <Ionicons
                    name="star"
                    size={SPACING * 1.5}
                    color={colors.primary}
                  />
                  <Text style={{ color: colors.white, marginLeft: SPACING }}>
                    {coffee.rating}
                  </Text>
                </View>
              </View>
              <View style={{ width: '35%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      padding: SPACING / 2,
                      width: SPACING * 5,
                      height: SPACING * 5,
                      backgroundColor: colors.dark,
                      borderRadius: SPACING,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name="cafe"
                      size={SPACING * 2}
                      color={colors.primary}
                    />
                    <Text
                      style={{
                        color: colors['white-smoke'],
                        fontSize: SPACING,
                      }}
                    >
                      Café
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: SPACING / 2,
                      width: SPACING * 5,
                      height: SPACING * 5,
                      backgroundColor: colors.dark,
                      borderRadius: SPACING,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name="water"
                      size={SPACING * 2}
                      color={colors.primary}
                    />
                    <Text
                      style={{
                        color: colors['white-smoke'],
                        fontSize: SPACING,
                      }}
                    >
                      Leche
                    </Text>
                  </View>
                </View>
                <View>
                  <Text>Tostado medio</Text>
                </View>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CoffeeDetailsScreen;
