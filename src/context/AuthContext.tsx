import React, { createContext, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { storage } from '@/App';
import { firebaseAuth } from '@/services/firebase';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    const initialUser = firebaseAuth.getCurrentUser();
    setUser(initialUser);
    setIsLoading(false);

    // Set up polling for auth state changes (checks every 500ms)
    // This works for both mock mode and real Firebase
    const pollInterval = setInterval(() => {
      const currentUser = firebaseAuth.getCurrentUser();
      setUser(currentUser);
    }, 500);

    return () => clearInterval(pollInterval);
  }, []);

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
