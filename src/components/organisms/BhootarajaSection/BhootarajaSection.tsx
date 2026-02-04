import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { bhootarajaInfo } from '@/data/paramparaData';

interface BhootarajaSectionProps {
  onLearnMore?: () => void;
}

export const BhootarajaSection: React.FC<BhootarajaSectionProps> = ({ onLearnMore }) => {
  const openTempleMap = () => {
    if (bhootarajaInfo.templeLocation?.latitude && bhootarajaInfo.templeLocation?.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${bhootarajaInfo.templeLocation.latitude},${bhootarajaInfo.templeLocation.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section with Divine Gradient */}
      <View style={styles.heroSection}>
        <View style={styles.divineAura}>
          <View style={styles.photoFrame}>
            {bhootarajaInfo.photo ? (
              <Image 
                source={{ uri: bhootarajaInfo.photo }} 
                style={styles.heroPhoto} 
                resizeMode="cover" 
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.placeholderEmoji}>🙏</Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.title}>{bhootarajaInfo.name}</Text>
        {Boolean(bhootarajaInfo.nameKannada) && (
          <Text style={styles.titleKannada}>{bhootarajaInfo.nameKannada}</Text>
        )}
        
        <View style={styles.subtitleBadge}>
          <Text style={styles.subtitleText}>Divine Protector of Sri Sode Matha</Text>
        </View>
      </View>

      {/* Divine Connection */}
      <View style={styles.connectionSection}>
        <View style={styles.connectionCard}>
          <Text style={styles.connectionIcon}>✨</Text>
          <Text style={styles.connectionTitle}>Divine Origin</Text>
          <Text style={styles.connectionText}>
            Blessed as protector by Sri Vadirajatirtha himself
          </Text>
        </View>
        
        <View style={styles.connectionCard}>
          <Text style={styles.connectionIcon}>🛡️</Text>
          <Text style={styles.connectionTitle}>Sacred Role</Text>
          <Text style={styles.connectionText}>
            Guardian deity of the Matha and its devotees
          </Text>
        </View>
      </View>

      {/* Story Section */}
      <View style={styles.storySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📖</Text>
          <Text style={styles.sectionTitle}>The Divine Story</Text>
        </View>
        
        <Text style={styles.storyText}>{bhootarajaInfo.description}</Text>
        
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "Sri Bhootaraja stands as a testament to Sri Vadirajatirtha's divine grace, 
            continuing to bless and protect devotees who seek his shelter."
          </Text>
        </View>
      </View>

      {/* Significance */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🕉️</Text>
          <Text style={styles.sectionTitle}>Significance</Text>
        </View>
        
        <Text style={styles.sectionText}>{bhootarajaInfo.significance}</Text>
        
        <View style={styles.highlightsList}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightBullet}>•</Text>
            <Text style={styles.highlightText}>
              Daily worship performed alongside the main deity
            </Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightBullet}>•</Text>
            <Text style={styles.highlightText}>
              Special rituals during Vadirajara Aradhana
            </Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightBullet}>•</Text>
            <Text style={styles.highlightText}>
              Devotees seek blessings for protection and well-being
            </Text>
          </View>
        </View>
      </View>

      {/* Miracles */}
      {bhootarajaInfo.miracles && bhootarajaInfo.miracles.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Divine Miracles</Text>
          </View>
          
          {bhootarajaInfo.miracles.map((miracle) => (
            <View key={miracle} style={styles.miracleCard}>
              <View style={styles.miracleNumber}>
                <Text style={styles.miracleNumberText}>•</Text>
              </View>
              <Text style={styles.miracleText}>{miracle}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Temple Location */}
      {bhootarajaInfo.templeLocation && (
        <View style={styles.locationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Sri Bhootaraja Sannidhi</Text>
          </View>
          
          <View style={styles.locationCard}>
            <Text style={styles.locationName}>{bhootarajaInfo.templeLocation.name}</Text>
            <Text style={styles.locationAddress}>{bhootarajaInfo.templeLocation.address}</Text>
            
            {bhootarajaInfo.templeLocation.latitude && (
              <Pressable style={styles.mapButton} onPress={openTempleMap}>
                <Text style={styles.mapButtonIcon}>🗺️</Text>
                <Text style={styles.mapButtonText}>View on Google Maps</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}

      {/* Prayer Section */}
      <View style={styles.prayerSection}>
        <Text style={styles.prayerTitle}>🙏 Bhootaraja Prarthane 🙏</Text>
        <View style={styles.prayerCard}>
          <Text style={styles.prayerText}>
            ಶ್ರೀ ಭೂತರಾಜ ದೇವರಿಗೆ ನಮಃ{'\n'}
            Sri Bhootaraja Devara namaha
          </Text>
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
    backgroundColor: '#1A1A2E',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  divineAura: {
    padding: 8,
    borderRadius: 80,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    marginBottom: 16,
  },
  photoFrame: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#D4AF37',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A4E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  titleKannada: {
    fontSize: 18,
    color: '#D4AF37',
    marginTop: 4,
  },
  subtitleBadge: {
    marginTop: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  subtitleText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
  },
  connectionSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  connectionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  connectionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  connectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3A2A1E',
  },
  connectionText: {
    fontSize: 11,
    color: '#6B5344',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  storySection: {
    marginHorizontal: 16,
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
  storyText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 24,
  },
  quoteBox: {
    marginTop: 16,
    backgroundColor: '#FFF9E8',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  quoteText: {
    fontSize: 13,
    color: '#6B5344',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  sectionText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 22,
  },
  highlightsList: {
    marginTop: 12,
    gap: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  highlightBullet: {
    color: '#D4AF37',
    fontSize: 16,
    marginRight: 8,
    fontWeight: '700',
  },
  highlightText: {
    flex: 1,
    fontSize: 13,
    color: '#4A3728',
    lineHeight: 18,
  },
  miracleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  miracleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#922B3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  miracleNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  miracleText: {
    flex: 1,
    fontSize: 13,
    color: '#4A3728',
    lineHeight: 20,
  },
  locationSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  locationCard: {
    backgroundColor: '#FFF9E8',
    padding: 14,
    borderRadius: 12,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '700',
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
    backgroundColor: '#1A1A2E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapButtonIcon: {
    fontSize: 16,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  prayerSection: {
    margin: 16,
    alignItems: 'center',
  },
  prayerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#922B3E',
    marginBottom: 12,
  },
  prayerCard: {
    backgroundColor: '#FFF9E8',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D4AF37',
    width: '100%',
  },
  prayerText: {
    fontSize: 15,
    color: '#3A2A1E',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 40,
  },
});

export default BhootarajaSection;
