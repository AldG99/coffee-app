import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import colors from '../config/colors';
import SPACING from '../config/SPACING';
import * as ImagePicker from 'expo-image-picker';

const placeholderAvatar = require('../../assets/avatar.png');

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Obtener información del usuario desde el contexto de autenticación
  const userFirstName = user?.displayName?.split(' ')[0] || '';
  const userLastName = user?.displayName?.split(' ').slice(1).join(' ') || '';
  const userEmail = user?.email || '';
  const userPhotoURL = user?.photoURL;

  const [userData, setUserData] = useState({
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    phone: user?.phoneNumber || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Error', 'Se necesita permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        await updateProfile(auth.currentUser, {
          photoURL: result.assets[0].uri,
        });
        // Aquí podrías actualizar también la foto en Firestore si lo necesitas
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar la foto de perfil');
      }
    }
  };

  const handleSave = async () => {
    try {
      const fullName = `${userData.firstName} ${userData.lastName}`.trim();
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // Aquí podrías actualizar información adicional en Firestore
      // como el teléfono y la dirección

      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  const ProfileField = ({ label, value, field, editable = true }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => setUserData({ ...userData, [field]: text })}
          placeholderTextColor={colors.secondary}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Ionicons
            name={isEditing ? 'checkmark' : 'create-outline'}
            size={SPACING * 2}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          <View style={styles.avatarContainer}>
            <BlurView intensity={30} tint="dark" style={styles.avatarBlur}>
              <Image
                source={
                  userPhotoURL ? { uri: userPhotoURL } : placeholderAvatar
                }
                style={styles.avatar}
              />
            </BlurView>
          </View>
          {isEditing && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={pickImage}
            >
              <BlurView
                intensity={30}
                tint="dark"
                style={styles.photoButtonBlur}
              >
                <Ionicons
                  name="camera"
                  size={SPACING * 2}
                  color={colors.primary}
                />
                <Text style={styles.changePhotoText}>Cambiar foto</Text>
              </BlurView>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
          <BlurView intensity={30} tint="dark" style={styles.infoBlur}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            <ProfileField
              label="Nombre"
              value={userData.firstName}
              field="firstName"
            />
            <ProfileField
              label="Apellido"
              value={userData.lastName}
              field="lastName"
            />
            <ProfileField
              label="Email"
              value={userData.email}
              field="email"
              editable={false}
            />
            <ProfileField
              label="Teléfono"
              value={userData.phone}
              field="phone"
            />
          </BlurView>
        </View>

        <View style={styles.infoContainer}>
          <BlurView intensity={30} tint="dark" style={styles.infoBlur}>
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
            <ProfileField
              label="Dirección completa"
              value={userData.address}
              field="address"
            />
            <View style={styles.row}>
              <View style={[styles.fieldContainer, styles.halfWidth]}>
                <Text style={styles.fieldLabel}>Ciudad</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userData.city}
                    onChangeText={text =>
                      setUserData({ ...userData, city: text })
                    }
                    placeholderTextColor={colors.secondary}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.city}</Text>
                )}
              </View>
              <View style={[styles.fieldContainer, styles.halfWidth]}>
                <Text style={styles.fieldLabel}>Estado</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userData.state}
                    onChangeText={text =>
                      setUserData({ ...userData, state: text })
                    }
                    placeholderTextColor={colors.secondary}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{userData.state}</Text>
                )}
              </View>
            </View>
          </BlurView>
        </View>

        <View style={styles.statsContainer}>
          <BlurView intensity={30} tint="dark" style={styles.statsBlur}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Pedidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Favoritos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </BlurView>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors['dark-light'],
  },
  headerTitle: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: SPACING,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: SPACING * 1.8,
    fontWeight: '500',
    marginBottom: SPACING * 2,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: SPACING * 2,
  },
  avatarContainer: {
    width: SPACING * 15,
    height: SPACING * 15,
    borderRadius: SPACING * 7.5,
    overflow: 'hidden',
  },
  avatarBlur: {
    flex: 1,
    padding: SPACING / 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING * 7.5,
  },
  changePhotoButton: {
    borderRadius: SPACING,
    overflow: 'hidden',
    marginTop: SPACING * 2,
  },
  photoButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
    paddingHorizontal: SPACING * 2,
  },
  changePhotoText: {
    color: colors.primary,
    marginLeft: SPACING,
    fontSize: SPACING * 1.6,
  },
  infoContainer: {
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    marginBottom: SPACING * 2,
  },
  infoBlur: {
    padding: SPACING * 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  fieldContainer: {
    marginBottom: SPACING * 2,
  },
  fieldLabel: {
    color: colors.secondary,
    fontSize: SPACING * 1.4,
    marginBottom: SPACING / 2,
  },
  fieldValue: {
    color: colors.white,
    fontSize: SPACING * 1.6,
  },
  input: {
    backgroundColor: colors.dark,
    color: colors.white,
    padding: SPACING * 1.5,
    borderRadius: SPACING,
    fontSize: SPACING * 1.4,
  },
  statsContainer: {
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    marginBottom: SPACING * 2,
  },
  statsBlur: {
    padding: SPACING * 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.primary,
    fontSize: SPACING * 2.5,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.secondary,
    fontSize: SPACING * 1.4,
    marginTop: SPACING / 2,
  },
});

export default ProfileScreen;
