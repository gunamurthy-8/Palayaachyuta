import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { Guru } from '@/data/paramparaData';
import { paramparaData } from '@/data/paramparaData';

interface GuruDetailCardProps {
  guru: Guru;
  onGuruPress?: (guru: Guru) => void;
}

export const GuruDetailCard: React.FC<GuruDetailCardProps> = ({ guru, onGuruPress }) => {
  const asramaGuru = guru.asramaGuru 
    ? paramparaData.find(g => g.id === guru.asramaGuru) 
    : null;
  const asramaShishya = guru.asramaShishya 
    ? paramparaData.find(g => g.id === guru.asramaShishya) 
    : null;

  const openMap = () => {
    if (guru.vrindavanaLocation?.latitude && guru.vrindavanaLocation?.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${guru.vrindavanaLocation.latitude},${guru.vrindavanaLocation.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Photo */}
      <View style={styles.header}>
        <View style={styles.photoWrapper}>
          {guru.photo ? (
            <Image source={{ uri: guru.photo }} style={styles.photo} resizeMode="cover" />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.placeholderIcon}>🙏</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.name}>{guru.name}</Text>
        {guru.nameKannada && (
          <Text style={styles.nameKannada}>{guru.nameKannada}</Text>
        )}
        
        {/* Peetha Timeline */}
        {(guru.peethaFrom || guru.peethaTo) && (
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineText}>
              Peetha: {guru.peethaFrom || '?'} - {guru.peethaTo || 'Present'}
            </Text>
          </View>
        )}
      </View>

      {/* Lineage Links */}
      <View style={styles.lineageSection}>
        {asramaGuru && (
          <Pressable 
            style={styles.lineageCard}
            onPress={() => onGuruPress?.(asramaGuru)}
          >
            <Text style={styles.lineageLabel}>Ashrama Guru</Text>
            <Text style={styles.lineageName}>{asramaGuru.name}</Text>
            <Text style={styles.lineageArrow}>↑</Text>
          </Pressable>
        )}
        
        {asramaShishya && (
          <Pressable 
            style={styles.lineageCard}
            onPress={() => onGuruPress?.(asramaShishya)}
          >
            <Text style={styles.lineageLabel}>Ashrama Shishya</Text>
            <Text style={styles.lineageName}>{asramaShishya.name}</Text>
            <Text style={styles.lineageArrow}>↓</Text>
          </Pressable>
        )}
      </View>

      {/* Details Grid */}
      <View style={styles.detailsSection}>
        {guru.poorvashramaName && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Poorvashrama Name</Text>
            <Text style={styles.detailValue}>{guru.poorvashramaName}</Text>
          </View>
        )}
        
        {guru.aradhana && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Aaradhane</Text>
            <Text style={styles.detailValue}>{guru.aradhana}</Text>
            {guru.aradhanaKannada && (
              <Text style={styles.detailValueKannada}>{guru.aradhanaKannada}</Text>
            )}
          </View>
        )}
      </View>

      {/* Key Works */}
      {guru.keyWorks && guru.keyWorks.length > 0 && (
        <View style={styles.worksSection}>
          <Text style={styles.sectionTitle}>Key Works</Text>
          {guru.keyWorks.map((work) => (
            <View key={work} style={styles.workItem}>
              <Text style={styles.workBullet}>•</Text>
              <Text style={styles.workText}>{work}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Description */}
      {guru.description && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.descriptionText}>{guru.description}</Text>
        </View>
      )}

      {/* Vrindavana Location */}
      {guru.vrindavanaLocation && (
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Vrindavana Location</Text>
          <View style={styles.locationCard}>
            <Text style={styles.locationName}>{guru.vrindavanaLocation.name}</Text>
            <Text style={styles.locationAddress}>{guru.vrindavanaLocation.address}</Text>
            
            {guru.vrindavanaLocation.latitude && (
              <Pressable style={styles.mapButton} onPress={openMap}>
                <Text style={styles.mapButtonText}>📍 View on Google Maps</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFF9E8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  photoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#D4AF37',
    marginBottom: 16,
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
    fontSize: 48,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3A2A1E',
    textAlign: 'center',
  },
  nameKannada: {
    fontSize: 16,
    color: '#6B5344',
    marginTop: 4,
  },
  timelineBadge: {
    marginTop: 12,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timelineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  lineageSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    gap: 12,
  },
  lineageCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  lineageLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lineageName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#922B3E',
    textAlign: 'center',
    marginTop: 4,
  },
  lineageArrow: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 4,
  },
  detailsSection: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#3A2A1E',
    fontWeight: '500',
    marginTop: 2,
  },
  detailValueKannada: {
    fontSize: 13,
    color: '#6B5344',
  },
  worksSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
  },
  workItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  workBullet: {
    color: '#D4AF37',
    marginRight: 8,
    fontSize: 14,
  },
  workText: {
    flex: 1,
    fontSize: 13,
    color: '#3A2A1E',
    lineHeight: 18,
  },
  descriptionSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 22,
  },
  locationSection: {
    margin: 16,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  locationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A2A1E',
  },
  locationAddress: {
    fontSize: 13,
    color: '#6B5344',
    marginTop: 4,
    lineHeight: 18,
  },
  mapButton: {
    marginTop: 12,
    backgroundColor: '#922B3E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});

export default GuruDetailCard;
