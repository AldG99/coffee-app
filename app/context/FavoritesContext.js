import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  // Load favorites when user logs in
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().favorites) {
          setFavorites(userDoc.data().favorites);
        }
      }
    };
    loadFavorites();
  }, [user]);

  const toggleFavorite = async coffee => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const isFavorite = favorites.some(fav => fav.id === coffee.id);

    try {
      if (isFavorite) {
        // Remove from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(coffee),
        });
        setFavorites(favorites.filter(fav => fav.id !== coffee.id));
      } else {
        // Add to favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(coffee),
        });
        setFavorites([...favorites, coffee]);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const isFavorite = coffeeId => {
    return favorites.some(coffee => coffee.id === coffeeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
