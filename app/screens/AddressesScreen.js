import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const AddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Casa',
      street: 'Calle Principal 123',
      details: 'Apt 4B',
      city: 'Ciudad de México',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Trabajo',
      street: 'Av. Reforma 456',
      details: 'Piso 8',
      city: 'Ciudad de México',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: '',
    street: '',
    details: '',
    city: '',
  });

  const handleAddAddress = () => {
    if (newAddress.title && newAddress.street && newAddress.city) {
      setAddresses(prev => [
        ...prev,
        {
          id: Date.now(),
          ...newAddress,
          isDefault: addresses.length === 0,
        },
      ]);
      setNewAddress({ title: '', street: '', details: '', city: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteAddress = id => {
    setAddresses(prev => prev.filter(address => address.id !== id));
  };

  const handleSetDefault = id => {
    setAddresses(prev =>
      prev.map(address => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const renderAddressCard = address => (
    <View key={address.id} style={styles.addressCard}>
      <BlurView intensity={30} tint="dark" style={styles.cardContent}>
        <View style={styles.addressHeader}>
          <View style={styles.titleContainer}>
            <Ionicons
              name={
                address.title.toLowerCase() === 'casa' ? 'home' : 'business'
              }
              size={SPACING * 2}
              color={colors.primary}
            />
            <Text style={styles.addressTitle}>{address.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteAddress(address.id)}
            style={styles.deleteButton}
          >
            <Ionicons
              name="trash-outline"
              size={SPACING * 2}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.addressText}>{address.street}</Text>
        {address.details && (
          <Text style={styles.addressText}>{address.details}</Text>
        )}
        <Text style={styles.addressText}>{address.city}</Text>

        {!address.isDefault && (
          <TouchableOpacity
            style={styles.defaultButton}
            onPress={() => handleSetDefault(address.id)}
          >
            <Text style={styles.defaultButtonText}>
              Establecer como predeterminada
            </Text>
          </TouchableOpacity>
        )}
        {address.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>
              Dirección predeterminada
            </Text>
          </View>
        )}
      </BlurView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Direcciones</Text>
      </View>

      <ScrollView style={styles.content}>
        {addresses.map(renderAddressCard)}

        {showAddForm ? (
          <View style={styles.formContainer}>
            <BlurView intensity={30} tint="dark" style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Título (ej. Casa, Trabajo)"
                placeholderTextColor={colors.secondary}
                value={newAddress.title}
                onChangeText={text =>
                  setNewAddress(prev => ({ ...prev, title: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Calle y número"
                placeholderTextColor={colors.secondary}
                value={newAddress.street}
                onChangeText={text =>
                  setNewAddress(prev => ({ ...prev, street: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Detalles (opcional)"
                placeholderTextColor={colors.secondary}
                value={newAddress.details}
                onChangeText={text =>
                  setNewAddress(prev => ({ ...prev, details: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Ciudad"
                placeholderTextColor={colors.secondary}
                value={newAddress.city}
                onChangeText={text =>
                  setNewAddress(prev => ({ ...prev, city: text }))
                }
              />
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => setShowAddForm(false)}
                >
                  <Text style={styles.formButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={handleAddAddress}
                >
                  <Text style={styles.formButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Ionicons
              name="add-circle"
              size={SPACING * 2}
              color={colors.primary}
            />
            <Text style={styles.addButtonText}>Agregar nueva dirección</Text>
          </TouchableOpacity>
        )}
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
    padding: SPACING * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors['dark-light'],
  },
  headerTitle: {
    color: colors.white,
    fontSize: SPACING * 2,
    marginLeft: SPACING * 2,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: SPACING,
  },
  addressCard: {
    marginBottom: SPACING * 2,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: SPACING * 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTitle: {
    color: colors.white,
    fontSize: SPACING * 1.8,
    fontWeight: '600',
    marginLeft: SPACING,
  },
  addressText: {
    color: colors['white-smoke'],
    fontSize: SPACING * 1.4,
    marginBottom: SPACING / 2,
  },
  deleteButton: {
    padding: SPACING,
  },
  defaultButton: {
    backgroundColor: colors.dark,
    padding: SPACING,
    borderRadius: SPACING,
    marginTop: SPACING,
    alignItems: 'center',
  },
  defaultButtonText: {
    color: colors.primary,
    fontSize: SPACING * 1.2,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    marginTop: SPACING,
    alignItems: 'center',
  },
  defaultBadgeText: {
    color: colors.white,
    fontSize: SPACING * 1.2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING * 2,
    backgroundColor: colors['dark-light'],
    borderRadius: SPACING * 2,
    marginTop: SPACING,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: SPACING * 1.6,
    marginLeft: SPACING,
  },
  formContainer: {
    marginTop: SPACING,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
  },
  form: {
    padding: SPACING * 2,
  },
  input: {
    backgroundColor: colors.dark,
    color: colors.white,
    padding: SPACING * 1.5,
    borderRadius: SPACING,
    fontSize: SPACING * 1.4,
    marginBottom: SPACING,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING,
  },
  formButton: {
    flex: 1,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginHorizontal: SPACING / 2,
  },
  cancelButton: {
    backgroundColor: colors.dark,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  formButtonText: {
    color: colors.white,
    fontSize: SPACING * 1.4,
  },
});

export default AddressesScreen;
