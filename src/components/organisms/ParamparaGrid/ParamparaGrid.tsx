import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Guru } from '@/data/paramparaData';
import { paramparaData } from '@/data/paramparaData';

interface GuruTileProps {
  guru: Guru;
  index: number;
  onPress: (guru: Guru) => void;
}

export const GuruTile: React.FC<GuruTileProps> = ({ guru, index, onPress }) => {
  const isHighlighted = guru.id === 20; // Sri Vadirajatirtha

  return (
    <Pressable
      style={[styles.tile, isHighlighted && styles.tileHighlighted]}
      onPress={() => onPress(guru)}
    >
      {/* Serial Number Badge */}
      <View style={[styles.badge, isHighlighted && styles.badgeHighlighted]}>
        <Text style={styles.badgeText}>{guru.id}</Text>
      </View>

      {/* Photo Placeholder */}
      <View style={[styles.photoContainer, isHighlighted && styles.photoContainerHighlighted]}>
        {guru.photo ? (
          <Image source={{ uri: guru.photo }} style={styles.photo} resizeMode="cover" />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.placeholderIcon}>🙏</Text>
          </View>
        )}
      </View>

      {/* Name */}
      <Text style={[styles.name, isHighlighted && styles.nameHighlighted]} numberOfLines={2}>
        {guru.name}
      </Text>
      
      {guru.nameKannada && (
        <Text style={styles.nameKannada} numberOfLines={1}>
          {guru.nameKannada}
        </Text>
      )}

      {/* Timeline if available */}
      {guru.peethaFrom && guru.peethaTo && (
        <Text style={styles.timeline}>
          {guru.peethaFrom} - {guru.peethaTo}
        </Text>
      )}
    </Pressable>
  );
};

interface ParamparaGridProps {
  gurus?: Guru[];
  onGuruPress: (guru: Guru) => void;
}

export const ParamparaGrid: React.FC<ParamparaGridProps> = ({ gurus = paramparaData, onGuruPress }) => {
  return (
    <View style={styles.grid}>
      {gurus.map((guru, index) => (
        <GuruTile key={guru.id} guru={guru} index={index} onPress={onGuruPress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  tile: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E0D0',
    position: 'relative',
  },
  tileHighlighted: {
    backgroundColor: '#FFF9E8',
    borderColor: '#D4AF37',
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    top: -8,
    left: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B5344',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeHighlighted: {
    backgroundColor: '#D4AF37',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0D8C8',
  },
  photoContainerHighlighted: {
    borderColor: '#D4AF37',
    borderWidth: 3,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5EFE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 24,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3A2A1E',
    textAlign: 'center',
    lineHeight: 14,
  },
  nameHighlighted: {
    color: '#922B3E',
  },
  nameKannada: {
    fontSize: 9,
    color: '#6B5344',
    textAlign: 'center',
    marginTop: 2,
  },
  timeline: {
    fontSize: 8,
    color: '#9E9E9E',
    marginTop: 4,
  },
});

export default ParamparaGrid;
