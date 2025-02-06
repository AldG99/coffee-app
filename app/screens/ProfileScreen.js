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
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const avatar = require('../../assets/avatar.png');

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 123 456 789',
    username: 'juanperez123',
    preferredLocation: 'Madrid, España',
  });

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
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons
            name={isEditing ? 'checkmark' : 'create-outline'}
            size={SPACING * 2}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <View style={styles.avatarContainer}>
            <BlurView intensity={30} tint="dark" style={styles.avatarBlur}>
              <Image source={avatar} style={styles.avatar} />
            </BlurView>
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
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

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          <BlurView intensity={30} tint="dark" style={styles.infoBlur}>
            <ProfileField
              label="Nombre completo"
              value={userData.name}
              field="name"
            />
            <ProfileField label="Email" value={userData.email} field="email" />
            <ProfileField
              label="Teléfono"
              value={userData.phone}
              field="phone"
            />
            <ProfileField
              label="Nombre de usuario"
              value={userData.username}
              field="username"
              editable={false}
            />
            <ProfileField
              label="Ubicación preferida"
              value={userData.preferredLocation}
              field="preferredLocation"
            />
          </BlurView>
        </View>

        {/* Statistics Section */}
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
