import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar los favoritos almacenados al iniciar la app
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  // Guardar los favoritos cada vez que cambien
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error al guardar favoritos:', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  // Verificar si un café está en favoritos
  const isFavorite = coffee => {
    return favorites.some(fav => fav.id === coffee.id);
  };

  // Agregar o quitar un café de favoritos
  const toggleFavorite = coffee => {
    if (isFavorite(coffee)) {
      setFavorites(favorites.filter(fav => fav.id !== coffee.id));
    } else {
      setFavorites([...favorites, coffee]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFavorites = () => useContext(FavoritesContext);
