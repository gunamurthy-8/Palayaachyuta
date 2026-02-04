import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { madhwacharyaInfo } from '@/data/paramparaData';

interface MadhwacharyaSectionProps {
  onReadMore?: () => void;
}

export const MadhwacharyaSection: React.FC<MadhwacharyaSectionProps> = ({ onReadMore }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.photoFrame}>
          {madhwacharyaInfo.photo ? (
            <Image 
              source={{ uri: madhwacharyaInfo.photo }} 
              style={styles.heroPhoto} 
              resizeMode="cover" 
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.placeholderEmoji}>🙏</Text>
              <Text style={styles.placeholderText}>Sri Madhwacharya</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.title}>{madhwacharyaInfo.name}</Text>
        {Boolean(madhwacharyaInfo.nameKannada) && (
          <Text style={styles.titleKannada}>{madhwacharyaInfo.nameKannada}</Text>
        )}
        
        <View style={styles.lifespanBadge}>
          <Text style={styles.lifespanText}>
            {madhwacharyaInfo.birthYear} - {madhwacharyaInfo.mahasamadhi}
          </Text>
        </View>
      </View>

      {/* Quick Facts */}
      <View style={styles.factsGrid}>
        <View style={styles.factCard}>
          <Text style={styles.factIcon}>📍</Text>
          <Text style={styles.factLabel}>Birthplace</Text>
          <Text style={styles.factValue}>{madhwacharyaInfo.birthPlace}</Text>
        </View>
        <View style={styles.factCard}>
          <Text style={styles.factIcon}>📚</Text>
          <Text style={styles.factLabel}>Philosophy</Text>
          <Text style={styles.factValue}>{madhwacharyaInfo.philosophy}</Text>
        </View>
        <View style={styles.factCard}>
          <Text style={styles.factIcon}>🙏</Text>
          <Text style={styles.factLabel}>Ashrama Guru</Text>
          <Text style={styles.factValue}>{madhwacharyaInfo.asramaGuru}</Text>
        </View>
        <View style={styles.factCard}>
          <Text style={styles.factIcon}>🕉️</Text>
          <Text style={styles.factLabel}>Incarnation</Text>
          <Text style={styles.factValue}>Mukhya Prana</Text>
        </View>
      </View>

      {/* Tatvavada Philosophy Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🕉️</Text>
          <Text style={styles.sectionTitle}>Tatvavada Philosophy</Text>
        </View>
        <Text style={styles.sectionText}>
          Sri Madhwacharya established the Tatvavada (Dvaita) school of philosophy, 
          which emphasizes the eternal distinction between the individual soul (Jiva), 
          the Supreme Being (Vishnu), and the material world (Prakriti). This realistic 
          pluralism stands as one of the three major schools of Vedanta philosophy.
        </Text>
        
        <View style={styles.philosophyHighlights}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightTitle}>Five-fold Difference (Pancha Bheda)</Text>
            <Text style={styles.highlightText}>
              Eternal distinction between Jiva-Ishwara, Jiva-Jiva, Jiva-Jada, Ishwara-Jada, and Jada-Jada
            </Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightTitle}>Vishnu Sarvottamatva</Text>
            <Text style={styles.highlightText}>
              Lord Vishnu (Narayana) is the supreme, independent being with infinite auspicious qualities
            </Text>
          </View>
        </View>
      </View>

      {/* Key Works */}
      {madhwacharyaInfo.keyWorks && madhwacharyaInfo.keyWorks.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📜</Text>
            <Text style={styles.sectionTitle}>Key Works (Sarva Moola Grantha)</Text>
          </View>
          
          <View style={styles.worksGrid}>
            {madhwacharyaInfo.keyWorks.map((work) => (
              <View key={work} style={styles.workChip}>
                <Text style={styles.workChipText}>{work}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Biography */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📖</Text>
          <Text style={styles.sectionTitle}>Biography</Text>
        </View>
        <Text style={styles.biographyText}>{madhwacharyaInfo.description}</Text>
      </View>

      {/* Influence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🌟</Text>
          <Text style={styles.sectionTitle}>Legacy & Influence</Text>
        </View>
        <Text style={styles.sectionText}>
          Sri Madhwacharya established eight mathas in Udupi to preserve and propagate 
          Dvaita philosophy. His direct disciples carried forward his teachings, establishing 
          numerous mathas across Karnataka. The Sode Vadiraja Matha traces its lineage through 
          this sacred parampara, with Sri Vadirajatirtha being one of the most celebrated saints 
          in this tradition.
        </Text>
        
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>37+</Text>
            <Text style={styles.statLabel}>Granthas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Udupi Mathas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>800+</Text>
            <Text style={styles.statLabel}>Years of Legacy</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#FFF9E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  photoFrame: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#D4AF37',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  heroPhoto: {
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
  placeholderEmoji: {
    fontSize: 48,
  },
  placeholderText: {
    fontSize: 10,
    color: '#6B5344',
    marginTop: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3A2A1E',
    textAlign: 'center',
  },
  titleKannada: {
    fontSize: 18,
    color: '#6B5344',
    marginTop: 4,
  },
  lifespanBadge: {
    marginTop: 16,
    backgroundColor: '#922B3E',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  lifespanText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  factsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  factCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  factIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  factLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  factValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A2A1E',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A3728',
  },
  sectionText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 22,
  },
  philosophyHighlights: {
    marginTop: 16,
    gap: 12,
  },
  highlightItem: {
    backgroundColor: '#FFF9E8',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3A2A1E',
  },
  highlightText: {
    fontSize: 12,
    color: '#6B5344',
    marginTop: 4,
    lineHeight: 18,
  },
  worksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  workChip: {
    backgroundColor: '#FFF9E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  workChipText: {
    fontSize: 12,
    color: '#6B5344',
    fontWeight: '500',
  },
  biographyText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 24,
  },
  statsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#922B3E',
    padding: 16,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: '#FFD4DC',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bottomPadding: {
    height: 40,
  },
});

export default MadhwacharyaSection;
