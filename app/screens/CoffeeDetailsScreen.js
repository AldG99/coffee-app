import React, { useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const { height, width } = Dimensions.get('window');

const sizes = ['P', 'M', 'G'];

const CoffeeDetailsScreen = () => {
  const [activeSize, setActiveSize] = useState('M');
  const navigation = useNavigation();
  const route = useRoute();
  const { coffee } = route.params;
  const { addToCart } = useCart();

  const sizePrices = {
    P: 0.8, // Small size, slight discount
    M: 1.0, // Medium size, base price
    G: 1.3, // Large size, premium
  };

  // Calculate dynamic price based on size
  const calculateSizePrice = () => {
    return (coffee.price * sizePrices[activeSize]).toFixed(2);
  };

  return (
    <>
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
                onPress={() => navigation.goBack()}
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
                <Ionicons
                  name="heart"
                  color={colors.light}
                  size={SPACING + 2}
                />
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
                <View style={{ width: '35%', justifyContent: 'space-between' }}>
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
                  <View
                    style={{
                      backgroundColor: colors.dark,
                      padding: SPACING / 2,
                      borderRadius: SPACING / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: colors['white-smoke'],
                        fontSize: SPACING * 1.3,
                      }}
                    >
                      Tostado medio
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>
          <View style={{ padding: SPACING }}>
            <Text
              style={{
                color: colors['white-smoke'],
                fontSize: SPACING * 1.7,
                marginBottom: SPACING,
              }}
            >
              Descripción
            </Text>
            <Text numberOfLines={3} style={{ color: colors.white }}>
              {coffee.description}
            </Text>
            <View style={{ marginVertical: SPACING * 2 }}>
              <Text
                style={{
                  color: colors['white-smoke'],
                  fontSize: SPACING * 1.7,
                  marginBottom: SPACING,
                }}
              >
                Tamaño
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {sizes.map(size => (
                  <TouchableOpacity
                    onPress={() => setActiveSize(size)}
                    key={size}
                    style={[
                      {
                        borderWidth: 2,
                        paddingVertical: SPACING / 2,
                        borderRadius: SPACING,
                        backgroundColor: colors['dark-light'],
                        width: width / 3 - SPACING * 2,
                        alignItems: 'center',
                      },
                      activeSize === size && {
                        borderColor: colors.primary,
                        backgroundColor: colors.dark,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          color: colors['white-smoke'],
                          fontSize: SPACING * 1.9,
                        },
                        activeSize === size && {
                          color: colors.primary,
                        },
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <SafeAreaView
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <View
          style={{
            padding: SPACING,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: SPACING * 3,
          }}
        >
          <Text style={{ color: colors.white, fontSize: SPACING * 1.5 }}>
            Precio ({activeSize})
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: colors.primary, fontSize: SPACING * 2 }}>
              $
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: SPACING * 2,
                marginLeft: SPACING / 2,
              }}
            >
              {calculateSizePrice()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginRight: SPACING,
            backgroundColor: colors.primary,
            width: width / 2 + SPACING * 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SPACING * 2,
            fontWeight: '700',
          }}
          onPress={() => {
            addToCart({
              ...coffee,
              size: activeSize,
              price: calculateSizePrice(), // Use the size-specific price
            });
            navigation.navigate('Cart');
          }}
        >
          <Text style={{ color: colors.white, fontSize: SPACING * 2 }}>
            Comprar Ahora
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default CoffeeDetailsScreen;
