import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import SPACING from '../config/SPACING';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SearchField from '../components/SearchField';
import Categories from '../components/Categories';
import coffees from '../config/coffees';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const avatar = require('../../assets/avatar.png');
const { width } = Dimensions.get('window');

const HomeScreens = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const filterCoffees = () => {
    return coffees.filter(coffee => {
      const matchesCategory =
        activeCategoryId === null || coffee.categoryId === activeCategoryId;
      const matchesSearch = coffee.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

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
        <SearchField onSearch={setSearchQuery} />
        <Categories onChange={id => setActiveCategoryId(id)} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {filterCoffees().map(coffee => (
            <View
              key={coffee.id}
              style={{
                width: width / 2 - SPACING * 2,
                marginBottom: SPACING,
                borderRadius: SPACING * 2,
                overflow: 'hidden',
              }}
            >
              <BlurView tint="dark" intensity={95} style={{ padding: SPACING }}>
                <TouchableOpacity
                  style={{ height: 150, width: '100%' }}
                  onPress={() =>
                    navigation.navigate('CoffeeDetails', { coffee })
                  }
                >
                  <Image
                    source={coffee.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: SPACING * 2,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      borderBottomStartRadius: SPACING * 3,
                      borderTopEndRadius: SPACING * 2,
                      overflow: 'hidden',
                    }}
                  >
                    <BlurView
                      tint="dark"
                      intensity={70}
                      style={{ flexDirection: 'row', padding: SPACING - 2 }}
                    >
                      <Ionicons
                        style={{ marginLeft: SPACING / 2 }}
                        name="star"
                        color={colors.primary}
                        size={SPACING * 1.7}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          marginLeft: SPACING / 2,
                        }}
                      >
                        {coffee.rating}
                      </Text>
                    </BlurView>
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontWeight: '600',
                    fontSize: SPACING * 1.7,
                    marginTop: SPACING,
                    marginBottom: SPACING / 2,
                  }}
                >
                  {coffee.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.secondary, fontSize: SPACING * 1.2 }}
                >
                  {coffee.included}
                </Text>
                <View
                  style={{
                    marginVertical: SPACING / 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: colors.primary,
                        marginRight: SPACING / 2,
                        fontSize: SPACING * 1.6,
                      }}
                    >
                      $
                    </Text>
                    <Text
                      style={{ color: colors.white, fontSize: SPACING * 1.6 }}
                    >
                      {coffee.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      padding: SPACING / 2,
                      borderRadius: SPACING,
                    }}
                    onPress={() => addToCart(coffee)}
                  >
                    <Ionicons
                      name="add"
                      size={SPACING * 2}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({});
