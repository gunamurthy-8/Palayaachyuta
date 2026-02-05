import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Panchanga, HistoryScreen } from '@/screens';
import { StotraListScreen, StotraDetailScreen } from '@/screens/Stotra';

// Placeholder screens for future implementation
const VideosScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Videos</Text>
    <Text style={styles.placeholderSubText}>Coming Soon</Text>
  </View>
);

const FeedScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Feed</Text>
    <Text style={styles.placeholderSubText}>Coming Soon</Text>
  </View>
);

// Stotra Stack Navigator
const StotraStack = createStackNavigator();

const StotraStackNavigator = () => {
  return (
    <StotraStack.Navigator screenOptions={{ headerShown: false }}>
      <StotraStack.Screen name="StotraList" component={StotraListScreen} />
      <StotraStack.Screen name="StotraDetail" component={StotraDetailScreen} />
    </StotraStack.Navigator>
  );
};

type TabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  PanchangaTab: undefined;
  StotraTab: undefined;
  FeedTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<string, string> = {
  HomeTab: '🏠',
  HistoryTab: '📜',
  PanchangaTab: '📅',
  StotraTab: 'ॐ',
  FeedTab: '📋',
};

const renderTabIcon = (routeName: string, focused: boolean) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {TAB_ICONS[routeName] || '•'}
  </Text>
);

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => renderTabIcon(route.name, focused),
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={HistoryScreen}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen 
        name="PanchangaTab" 
        component={Panchanga}
        options={{ tabBarLabel: 'Panchanga' }}
      />
      <Tab.Screen 
        name="StotraTab" 
        component={StotraStackNavigator}
        options={{ tabBarLabel: 'Stotra' }}
      />
      <Tab.Screen 
        name="FeedTab" 
        component={FeedScreen}
        options={{ tabBarLabel: 'Feed' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1918',
    borderTopWidth: 1,
    borderTopColor: '#2D2A27',
    paddingTop: 6,
    paddingBottom: 8,
    height: 60,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1918',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  placeholderSubText: {
    color: '#9E9E9E',
    fontSize: 14,
    marginTop: 8,
  },
});

export default BottomTabNavigator;
