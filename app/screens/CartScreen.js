import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SPACING from '../config/SPACING';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const renderCartItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING,
        backgroundColor: colors['dark-light'],
        marginVertical: SPACING / 2,
        borderRadius: SPACING,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: SPACING * 5,
          height: SPACING * 5,
          borderRadius: SPACING,
        }}
      />
      <View style={{ flex: 1, marginLeft: SPACING }}>
        <Text style={{ color: colors.white, fontSize: SPACING * 1.5 }}>
          {item.name}
        </Text>
        <Text style={{ color: colors.secondary, fontSize: SPACING }}>
          ${item.price} - Tamaño {item.size}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))
          }
          style={{ padding: SPACING / 2 }}
        >
          <Ionicons name="remove" size={SPACING * 1.5} color={colors.white} />
        </TouchableOpacity>
        <Text style={{ color: colors.white, marginHorizontal: SPACING }}>
          {item.quantity || 1}
        </Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
          style={{ padding: SPACING / 2 }}
        >
          <Ionicons name="add" size={SPACING * 1.5} color={colors.white} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={{
          backgroundColor: colors.primary,
          padding: SPACING / 2,
          borderRadius: SPACING,
          marginLeft: SPACING,
        }}
      >
        <Ionicons name="trash" size={SPACING * 1.5} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: SPACING,
          borderBottomWidth: 1,
          borderBottomColor: colors['dark-light'],
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.white,
            fontSize: SPACING * 2,
            marginLeft: SPACING,
          }}
        >
          Tu Carrito
        </Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.secondary,
              textAlign: 'center',
              marginTop: SPACING * 2,
            }}
          >
            Tu carrito está vacío
          </Text>
        }
      />

      {cartItems.length > 0 && (
        <View
          style={{
            marginTop: SPACING * 2,
            padding: SPACING,
            backgroundColor: colors['dark-light'],
            borderRadius: SPACING,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: SPACING * 1.5,
              textAlign: 'center',
            }}
          >
            Total: ${calculateTotal()}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: SPACING,
              borderRadius: SPACING,
              marginTop: SPACING,
            }}
          >
            <Text
              style={{
                color: colors.white,
                textAlign: 'center',
                fontSize: SPACING * 1.5,
              }}
            >
              Finalizar Compra
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
