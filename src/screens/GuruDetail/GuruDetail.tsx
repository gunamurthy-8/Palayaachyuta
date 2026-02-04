import React from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, Text } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { GuruDetailCard } from '@/components/organisms/GuruDetailCard';
import type { Guru } from '@/data/paramparaData';

type GuruDetailRouteParams = {
  GuruDetail: {
    guru: Guru;
  };
};

export const GuruDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<GuruDetailRouteParams, 'GuruDetail'>>();
  const { guru } = route.params;

  const handleGuruPress = (selectedGuru: Guru) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'GuruDetail',
        params: { guru: selectedGuru },
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {guru.name}
          </Text>
          {guru.nameKannada && (
            <Text style={styles.headerSubtitle}>{guru.nameKannada}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.peethaNumberBadge}>
            <Text style={styles.peethaNumberText}>#{guru.peethaNumber ?? guru.id}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <GuruDetailCard guru={guru} onGuruPress={handleGuruPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFEF7',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5EFE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#3A2A1E',
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A1E',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B5344',
  },
  headerRight: {
    marginLeft: 12,
  },
  peethaNumberBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  peethaNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GuruDetailScreen;
