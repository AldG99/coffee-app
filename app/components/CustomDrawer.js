import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const placeholderAvatar = require('../../assets/avatar.png');
const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Perfil', screen: 'Profile' },
  { icon: 'heart-outline', label: 'Favoritos', screen: 'Favorites' },
  {
    icon: 'time-outline',
    label: 'Historial de Pedidos',
    screen: 'OrderHistory',
  },
  { icon: 'card-outline', label: 'Métodos de Pago', screen: 'PaymentMethods' },
  { icon: 'location-outline', label: 'Direcciones', screen: 'Addresses' },
  { icon: 'settings-outline', label: 'Configuración', screen: 'Settings' },
  { icon: 'help-circle-outline', label: 'Ayuda', screen: 'Help' },
];

const CustomDrawer = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [translateX] = React.useState(new Animated.Value(-DRAWER_WIDTH));
  const [overlayOpacity] = React.useState(new Animated.Value(0));
  const menuPressAnimation = React.useRef(new Animated.Value(1)).current;
  const logoutPressAnimation = React.useRef(new Animated.Value(1)).current;

  // Obtener información completa del usuario desde Firestore
  const userFirstName =
    user?.displayName?.split(' ')[0] || user?.firstName || '';
  const userLastName =
    user?.displayName?.split(' ').slice(1).join(' ') || user?.lastName || '';
  const userFullName =
    user?.displayName || `${userFirstName} ${userLastName}`.trim() || 'Usuario';
  const userEmail = user?.email || '';
  const userPhotoURL = user?.photoURL || user?.profileImage;

  const handleBackPress = useCallback(() => {
    if (isVisible) {
      closeDrawer();
      return true;
    }
    return false;
  }, [isVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove();
  }, [handleBackPress]);

  useEffect(() => {
    if (isVisible) {
      openDrawer();
    }
  }, [isVisible]);

  const openDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, overlayOpacity]);

  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [translateX, overlayOpacity, onClose]);

  const handleOverlayPress = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const handleMenuPress = useCallback(
    screen => {
      Animated.sequence([
        Animated.timing(menuPressAnimation, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(menuPressAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        closeDrawer();
        navigation.navigate(screen);
      });
    },
    [navigation, closeDrawer, menuPressAnimation]
  );

  const handleLogout = useCallback(() => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sí, cerrar sesión',
        onPress: async () => {
          try {
            await signOut(auth);
            closeDrawer();
          } catch (error) {
            Alert.alert(
              'Error',
              'No se pudo cerrar sesión. Intente nuevamente.'
            );
          }
        },
      },
    ]);
  }, [closeDrawer]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />
      </Animated.View>

      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <BlurView intensity={95} tint="dark" style={styles.blurContainer}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <BlurView intensity={80} style={styles.avatar}>
                  <Image
                    source={
                      userPhotoURL ? { uri: userPhotoURL } : placeholderAvatar
                    }
                    style={styles.avatarImage}
                  />
                </BlurView>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userFullName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuItems}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.screen}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.screen)}
              >
                <Ionicons
                  name={item.icon}
                  size={SPACING * 2}
                  color={colors.white}
                />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={SPACING * 2}
              color={colors.primary}
            />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayTouch: {
    width: '100%',
    height: '100%',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    padding: SPACING * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors['dark-light'],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: SPACING * 6,
    height: SPACING * 6,
    borderRadius: SPACING * 3,
    overflow: 'hidden',
    backgroundColor: colors['dark-light'],
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING * 3,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING * 2,
  },
  userName: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: '600',
  },
  userEmail: {
    color: colors.secondary,
    fontSize: SPACING * 1.2,
  },
  menuItems: {
    padding: SPACING,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING / 2,
    backgroundColor: colors['dark-light'],
  },
  menuItemText: {
    color: colors.white,
    marginLeft: SPACING * 2,
    fontSize: SPACING * 1.6,
  },
  logoutButton: {
    position: 'absolute',
    bottom: SPACING * 4,
    left: SPACING * 2,
    right: SPACING * 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
    borderRadius: SPACING,
    backgroundColor: colors.dark,
  },
  logoutText: {
    color: colors.primary,
    marginLeft: SPACING * 2,
    fontSize: SPACING * 1.6,
  },
});

export default CustomDrawer;
