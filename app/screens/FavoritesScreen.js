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
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={SPACING * 2}
              color={colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Favoritos</Text>
          <View style={{ width: SPACING * 2 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="heart-outline"
            size={SPACING * 6}
            color={colors.secondary}
          />
          <Text style={styles.emptyText}>No tienes cafés favoritos</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Favoritos</Text>
        <View style={{ width: SPACING * 2 }} />
      </View>

      <ScrollView style={styles.content}>
        {favorites.map(coffee => (
          <TouchableOpacity
            key={coffee.id}
            style={styles.coffeeCard}
            onPress={() => navigation.navigate('CoffeeDetails', { coffee })}
          >
            <BlurView intensity={30} tint="dark" style={styles.cardContent}>
              <Image source={coffee.image} style={styles.coffeeImage} />
              <View style={styles.coffeeInfo}>
                <Text style={styles.coffeeName}>{coffee.name}</Text>
                <Text style={styles.coffeeIncluded}>{coffee.included}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <Text style={styles.price}>{coffee.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={e => {
                  e.stopPropagation();
                  toggleFavorite(coffee);
                }}
              >
                <Ionicons
                  name="heart"
                  size={SPACING * 2.5}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING * 2,
  },
  headerTitle: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: '600',
  },
  content: {
    padding: SPACING,
  },
  coffeeCard: {
    marginBottom: SPACING * 2,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: SPACING,
  },
  coffeeImage: {
    width: SPACING * 10,
    height: SPACING * 10,
    borderRadius: SPACING,
  },
  coffeeInfo: {
    flex: 1,
    marginLeft: SPACING * 2,
    justifyContent: 'center',
  },
  coffeeName: {
    color: colors.white,
    fontSize: SPACING * 1.7,
    fontWeight: '600',
    marginBottom: SPACING / 2,
  },
  coffeeIncluded: {
    color: colors.secondary,
    fontSize: SPACING * 1.2,
    marginBottom: SPACING,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceSymbol: {
    color: colors.primary,
    fontSize: SPACING * 1.6,
    marginRight: SPACING / 4,
  },
  price: {
    color: colors.white,
    fontSize: SPACING * 1.6,
  },
  favoriteButton: {
    justifyContent: 'center',
    paddingLeft: SPACING,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.secondary,
    fontSize: SPACING * 1.6,
    marginTop: SPACING,
  },
});

export default FavoritesScreen;
