import type { RootStackParamList } from '@/navigation/types';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Example, Login, Splash, Startup } from '@/screens';
import { BottomTabNavigator } from '@/navigation/BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

// Loading screen while checking auth state
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#D4AF37" />
    </View>
  );
}

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [splashComplete, setSplashComplete] = useState(false);

  // Handle splash completion callback
  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  // Show loading while auth is being checked (after splash)
  if (splashComplete && authLoading) {
    return (
      <SafeAreaProvider>
        <LoadingScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          {!splashComplete ? (
            // Always show splash first
            <Stack.Screen name={Paths.Splash}>
              {(props) => <Splash {...props} onAnimationComplete={handleSplashComplete} />}
            </Stack.Screen>
          ) : isAuthenticated ? (
            // Authenticated - show main app
            <>
              <Stack.Screen component={BottomTabNavigator} name={Paths.MainTabs} />
              <Stack.Screen component={Example} name={Paths.Example} />
            </>
          ) : (
            // Not authenticated - show login
            <Stack.Screen component={Login} name={Paths.Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
});

export default ApplicationNavigator;
