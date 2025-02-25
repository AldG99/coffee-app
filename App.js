import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './app/lib/firebaseConfig';
import colors from './app/config/colors';

// Screens
import { LoginScreen, RegisterScreen } from './app/screens/AuthScreens';
import HomeScreens from './app/screens/HomeScreens';
import CoffeeDetailsScreen from './app/screens/CoffeeDetailsScreen';
import CartScreen from './app/screens/CartScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import AddressesScreen from './app/screens/AddressesScreen';
import HelpScreen from './app/screens/HelpScreen';
import FavoritesScreen from './app/screens/FavoritesScreen';

// Context Providers
import { CartProvider } from './app/context/CartContext';
import { AuthProvider } from './app/context/AuthContext';
import { FavoritesProvider } from './app/context/FavoritesContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.dark },
              }}
            >
              {!user ? (
                // Auth screens
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </>
              ) : (
                // App screens
                <>
                  <Stack.Screen name="Home" component={HomeScreens} />
                  <Stack.Screen
                    name="CoffeeDetails"
                    component={CoffeeDetailsScreen}
                  />
                  <Stack.Screen name="Cart" component={CartScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Addresses" component={AddressesScreen} />
                  <Stack.Screen name="Help" component={HelpScreen} />
                  <Stack.Screen name="Favorites" component={FavoritesScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
