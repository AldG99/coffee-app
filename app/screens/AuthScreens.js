import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../config/colors';
import SPACING from '../config/SPACING';
import { auth } from '../lib/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // La navegación será manejada por el listener de auth state
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.inputContainer}>
          <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.secondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </BlurView>
        </View>

        <View style={styles.inputContainer}>
          <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={colors.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </BlurView>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    address: '',
    city: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);

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
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const handleRegister = async () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Actualizar el perfil del usuario con displayName y photoURL
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`.trim(),
        photoURL: formData.profileImage,
      });

      // Aquí podrías guardar la información adicional del usuario en Firestore
      // como la dirección completa
      // const userDocRef = doc(db, 'users', userCredential.user.uid);
      // await setDoc(userDocRef, {
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   address: formData.address,
      //   city: formData.city,
      //   state: formData.state,
      //   createdAt: serverTimestamp(),
      // });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Únete a nuestra comunidad del café</Text>

          {/* Foto de Perfil */}
          <TouchableOpacity
            style={styles.imagePickerContainer}
            onPress={pickImage}
          >
            <BlurView intensity={30} tint="dark" style={styles.imagePickerBlur}>
              {formData.profileImage ? (
                <Image
                  source={{ uri: formData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.imagePickerPlaceholder}>
                  <Ionicons
                    name="camera"
                    size={SPACING * 3}
                    color={colors.secondary}
                  />
                  <Text style={styles.imagePickerText}>
                    Agregar foto de perfil
                  </Text>
                </View>
              )}
            </BlurView>
          </TouchableOpacity>

          {/* Nombre */}
          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={colors.secondary}
                value={formData.firstName}
                onChangeText={text =>
                  setFormData({ ...formData, firstName: text })
                }
              />
            </BlurView>
          </View>

          {/* Apellido */}
          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor={colors.secondary}
                value={formData.lastName}
                onChangeText={text =>
                  setFormData({ ...formData, lastName: text })
                }
              />
            </BlurView>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={colors.secondary}
                value={formData.email}
                onChangeText={text => setFormData({ ...formData, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </BlurView>
          </View>

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colors.secondary}
                value={formData.password}
                onChangeText={text =>
                  setFormData({ ...formData, password: text })
                }
                secureTextEntry
              />
            </BlurView>
          </View>

          {/* Confirmar Contraseña */}
          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor={colors.secondary}
                value={formData.confirmPassword}
                onChangeText={text =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                secureTextEntry
              />
            </BlurView>
          </View>

          {/* Sección de Dirección */}
          <Text style={styles.sectionTitle}>Dirección de entrega</Text>

          <View style={styles.inputContainer}>
            <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
              <TextInput
                style={styles.input}
                placeholder="Dirección completa"
                placeholderTextColor={colors.secondary}
                value={formData.address}
                onChangeText={text =>
                  setFormData({ ...formData, address: text })
                }
              />
            </BlurView>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
                <TextInput
                  style={styles.input}
                  placeholder="Ciudad"
                  placeholderTextColor={colors.secondary}
                  value={formData.city}
                  onChangeText={text =>
                    setFormData({ ...formData, city: text })
                  }
                />
              </BlurView>
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <BlurView intensity={30} tint="dark" style={styles.inputBlur}>
                <TextInput
                  style={styles.input}
                  placeholder="Estado"
                  placeholderTextColor={colors.secondary}
                  value={formData.state}
                  onChangeText={text =>
                    setFormData({ ...formData, state: text })
                  }
                />
              </BlurView>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              ¿Ya eres parte de nuestra comunidad? Inicia sesión
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING * 2,
    flex: 1,
    ...(Platform.OS === 'web' ? { justifyContent: 'center' } : {}),
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 2.5,
    fontWeight: '600',
    marginBottom: SPACING * 4,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.white,
    fontSize: SPACING * 1.8,
    fontWeight: '500',
    marginTop: SPACING * 2,
    marginBottom: SPACING,
  },
  imagePickerContainer: {
    width: SPACING * 15,
    height: SPACING * 15,
    borderRadius: SPACING * 7.5,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: SPACING * 3,
  },
  imagePickerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING * 7.5,
  },
  imagePickerPlaceholder: {
    alignItems: 'center',
  },
  imagePickerText: {
    color: colors.secondary,
    marginTop: SPACING,
    fontSize: SPACING * 1.2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputContainer: {
    marginBottom: SPACING * 2,
    borderRadius: SPACING,
    overflow: 'hidden',
  },
  inputBlur: {
    padding: SPACING,
  },
  input: {
    color: colors.white,
    fontSize: SPACING * 1.6,
    padding: SPACING,
  },
  button: {
    backgroundColor: colors.primary,
    padding: SPACING * 1.5,
    borderRadius: SPACING,
    alignItems: 'center',
    marginTop: SPACING,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: SPACING * 1.6,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: SPACING * 2,
    alignItems: 'center',
  },
  linkText: {
    color: colors.primary,
    fontSize: SPACING * 1.4,
  },
});
