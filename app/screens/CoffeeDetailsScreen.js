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
import { useFavorites } from '../context/FavoritesContext';

const { height, width } = Dimensions.get('window');

const sizes = ['P', 'M', 'G'];

const CoffeeDetailsScreen = () => {
  const [activeSize, setActiveSize] = useState('M');
  const navigation = useNavigation();
  const route = useRoute();
  const { coffee } = route.params;
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Determinar si el café es favorito
  const isFavoriteCoffee = isFavorite(coffee);

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
                style={styles.iconButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="arrow-back"
                  color={colors.light}
                  size={SPACING + 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => toggleFavorite(coffee)}
              >
                <Ionicons
                  name={isFavoriteCoffee ? 'heart' : 'heart-outline'}
                  color={isFavoriteCoffee ? colors.primary : colors.light}
                  size={SPACING + 2}
                />
              </TouchableOpacity>
            </View>
            <View style={{ borderRadius: SPACING * 3, overflow: 'hidden' }}>
              <BlurView intensity={80} tint="dark" style={styles.infoContainer}>
                <View style={styles.leftInfoContainer}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.coffeeName}
                  >
                    {coffee.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.coffeeIncluded}
                  >
                    {coffee.included}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons
                      name="star"
                      size={SPACING * 1.5}
                      color={colors.primary}
                    />
                    <Text style={styles.ratingText}>{coffee.rating}</Text>
                  </View>
                </View>
                <View style={styles.rightInfoContainer}>
                  <View style={styles.iconsContainer}>
                    <View style={styles.featureIcon}>
                      <Ionicons
                        name="cafe"
                        size={SPACING * 2}
                        color={colors.primary}
                      />
                      <Text style={styles.featureText}>Café</Text>
                    </View>
                    <View style={styles.featureIcon}>
                      <Ionicons
                        name="water"
                        size={SPACING * 2}
                        color={colors.primary}
                      />
                      <Text style={styles.featureText}>Leche</Text>
                    </View>
                  </View>
                  <View style={styles.roastBadge}>
                    <Text style={styles.roastText}>Tostado medio</Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text numberOfLines={3} style={styles.descriptionText}>
              {coffee.description}
            </Text>
            <View style={styles.sizesSection}>
              <Text style={styles.sectionTitle}>Tamaño</Text>
              <View style={styles.sizesContainer}>
                {sizes.map(size => (
                  <TouchableOpacity
                    onPress={() => setActiveSize(size)}
                    key={size}
                    style={[
                      styles.sizeButton,
                      activeSize === size && styles.activeSizeButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        activeSize === size && styles.activeSizeText,
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
      <SafeAreaView style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio ({activeSize})</Text>
          <View style={styles.priceValueContainer}>
            <Text style={styles.priceCurrency}>$</Text>
            <Text style={styles.priceValue}>{calculateSizePrice()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            addToCart({
              ...coffee,
              size: activeSize,
              price: calculateSizePrice(),
            });
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.buyButtonText}>Comprar Ahora</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: colors.dark,
    padding: SPACING,
    borderRadius: SPACING * 1.5,
    width: SPACING * 4,
    height: SPACING * 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: SPACING * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftInfoContainer: {
    width: '60%',
  },
  coffeeName: {
    fontSize: SPACING * 2,
    color: colors.white,
    fontWeight: '600',
    marginBottom: SPACING,
  },
  coffeeIncluded: {
    fontSize: SPACING * 1.8,
    color: colors['white-smoke'],
    fontWeight: '500',
    marginBottom: SPACING,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: SPACING,
    alignItems: 'center',
  },
  ratingText: {
    color: colors.white,
    marginLeft: SPACING,
  },
  rightInfoContainer: {
    width: '35%',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureIcon: {
    padding: SPACING / 2,
    width: SPACING * 5,
    height: SPACING * 5,
    backgroundColor: colors.dark,
    borderRadius: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    color: colors['white-smoke'],
    fontSize: SPACING,
    textAlign: 'center',
  },
  roastBadge: {
    backgroundColor: colors.dark,
    padding: SPACING / 2,
    borderRadius: SPACING / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING,
  },
  roastText: {
    color: colors['white-smoke'],
    fontSize: SPACING * 1.3,
    textAlign: 'center',
  },
  detailsSection: {
    padding: SPACING,
  },
  sectionTitle: {
    color: colors['white-smoke'],
    fontSize: SPACING * 1.7,
    marginBottom: SPACING,
  },
  descriptionText: {
    color: colors.white,
  },
  sizesSection: {
    marginVertical: SPACING * 2,
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: SPACING / 2,
    borderRadius: SPACING,
    backgroundColor: colors['dark-light'],
    width: width / 3 - SPACING * 2,
    alignItems: 'center',
    height: SPACING * 5,
    justifyContent: 'center',
  },
  activeSizeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.dark,
  },
  sizeText: {
    color: colors['white-smoke'],
    fontSize: SPACING * 1.9,
  },
  activeSizeText: {
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    padding: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING * 3,
    width: '40%',
  },
  priceLabel: {
    color: colors.white,
    fontSize: SPACING * 1.5,
  },
  priceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceCurrency: {
    color: colors.primary,
    fontSize: SPACING * 2,
  },
  priceValue: {
    color: colors.white,
    fontSize: SPACING * 2,
    marginLeft: SPACING / 2,
  },
  buyButton: {
    marginRight: SPACING,
    backgroundColor: colors.primary,
    width: width / 2 + SPACING * 3,
    height: SPACING * 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING * 2,
  },
  buyButtonText: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: '700',
  },
});

export default CoffeeDetailsScreen;
