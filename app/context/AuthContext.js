import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a los cambios de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Usuario está autenticado
        setUser(user);
      } else {
        // Usuario no está autenticado
        setUser(null);
      }
      setLoading(false);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
