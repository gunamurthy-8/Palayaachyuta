import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { mathaHistory } from '@/data/paramparaData';

interface MathaHistorySectionProps {}

export const MathaHistorySection: React.FC<MathaHistorySectionProps> = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Sri Sode Vadiraja Matha</Text>
          <Text style={styles.heroSubtitle}>{mathaHistory.subTitle}</Text>
          <View style={styles.establishedBadge}>
            <Text style={styles.establishedText}>Est. {mathaHistory.established}</Text>
          </View>
        </View>
      </View>

      {/* Quick Facts */}
      <View style={styles.factsRow}>
        <View style={styles.factItem}>
          <Text style={styles.factIcon}>🏛️</Text>
          <Text style={styles.factLabel}>Headquarters</Text>
          <Text style={styles.factValue}>{mathaHistory.location.name}</Text>
        </View>
        <View style={styles.factDivider} />
        <View style={styles.factItem}>
          <Text style={styles.factIcon}>🙏</Text>
          <Text style={styles.factLabel}>Founder</Text>
          <Text style={styles.factValue}>{mathaHistory.founder}</Text>
        </View>
      </View>

      {/* Origin Story */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconBg}>
            <Text style={styles.sectionIcon}>📜</Text>
          </View>
          <Text style={styles.sectionTitle}>History & Origin</Text>
        </View>
        <Text style={styles.descriptionText}>{mathaHistory.description}</Text>
      </View>

      {/* Key Milestones */}
      {mathaHistory.keyMilestones && mathaHistory.keyMilestones.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Text style={styles.sectionIcon}>⏳</Text>
            </View>
            <Text style={styles.sectionTitle}>Key Milestones</Text>
          </View>
          
          <View style={styles.timeline}>
            {mathaHistory.keyMilestones.map((milestone) => (
              <View key={milestone.year} style={styles.milestoneItem}>
                <View style={styles.timelineDot}>
                  <View style={styles.dotInner} />
                </View>
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneYear}>{milestone.year}</Text>
                  <Text style={styles.milestoneText}>{milestone.event}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Significance */}
      {mathaHistory.significance && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Text style={styles.sectionIcon}>✨</Text>
            </View>
            <Text style={styles.sectionTitle}>Significance</Text>
          </View>
          <Text style={styles.descriptionText}>{mathaHistory.significance}</Text>
        </View>
      )}

      {/* Notable Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresSectionTitle}>Sacred Highlights</Text>
        
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🕉️</Text>
            <Text style={styles.featureTitle}>Sri Bhoo Varaha</Text>
            <Text style={styles.featureDesc}>Main deity installed by Sri Vadirajatirtha</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🛕</Text>
            <Text style={styles.featureTitle}>Vrindavana</Text>
            <Text style={styles.featureDesc}>Sacred brindavana of Sri Vadirajatirtha</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🐴</Text>
            <Text style={styles.featureTitle}>Ashwatha Katte</Text>
            <Text style={styles.featureDesc}>Sacred Hayagriva worship spot</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>👻</Text>
            <Text style={styles.featureTitle}>Sri Bhootaraja</Text>
            <Text style={styles.featureDesc}>Divine protector of the Matha</Text>
          </View>
        </View>
      </View>

      {/* Branches */}
      {mathaHistory.branches && mathaHistory.branches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Text style={styles.sectionIcon}>🌳</Text>
            </View>
            <Text style={styles.sectionTitle}>Matha Branches</Text>
          </View>
          
          <View style={styles.branchesList}>
            {mathaHistory.branches.map((branch) => (
              <View key={branch} style={styles.branchItem}>
                <Text style={styles.branchNumber}>•</Text>
                <Text style={styles.branchName}>{branch}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Current Peethadhipathi */}
      <View style={styles.currentPeethaSection}>
        <Text style={styles.currentPeethaLabel}>Current Peethadhipathi</Text>
        <View style={styles.currentPeethaCard}>
          <View style={styles.peethaPhotoPlaceholder}>
            <Text style={styles.peethaPhotoEmoji}>🙏</Text>
          </View>
          <View style={styles.peethaInfo}>
            <Text style={styles.peethaName}>Sri Vishwavallabha Tirtha</Text>
            <Text style={styles.peethaNameKannada}>ಶ್ರೀ ವಿಶ್ವವಲ್ಲಭ ತೀರ್ಥ</Text>
            <Text style={styles.peethaTimeline}>36th Peethadhipathi</Text>
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
  heroBanner: {
    height: 200,
    backgroundColor: '#922B3E',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 20,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFD4DC',
    marginTop: 4,
  },
  establishedBadge: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  establishedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  factsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  factItem: {
    flex: 1,
    alignItems: 'center',
  },
  factIcon: {
    fontSize: 28,
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
  factDivider: {
    width: 1,
    backgroundColor: '#E8E0D0',
    marginVertical: 8,
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
    marginBottom: 14,
  },
  sectionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF9E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A3728',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 24,
  },
  timeline: {
    paddingLeft: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF9E8',
    borderWidth: 2,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  timelineLine: {
    position: 'absolute',
    left: 7,
    top: 16,
    bottom: -20,
    width: 2,
    backgroundColor: '#E8E0D0',
  },
  milestoneContent: {
    flex: 1,
    marginLeft: 12,
  },
  milestoneYear: {
    fontSize: 13,
    fontWeight: '700',
    color: '#922B3E',
  },
  milestoneText: {
    fontSize: 13,
    color: '#4A3728',
    marginTop: 2,
    lineHeight: 18,
  },
  featuresSection: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  featuresSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3A2A1E',
  },
  featureDesc: {
    fontSize: 11,
    color: '#6B5344',
    marginTop: 2,
    lineHeight: 16,
  },
  branchesList: {
    gap: 8,
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E8',
    padding: 12,
    borderRadius: 10,
  },
  branchNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  branchName: {
    flex: 1,
    fontSize: 13,
    color: '#3A2A1E',
    fontWeight: '500',
  },
  currentPeethaSection: {
    margin: 16,
    alignItems: 'center',
  },
  currentPeethaLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  currentPeethaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#922B3E',
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  peethaPhotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  peethaPhotoEmoji: {
    fontSize: 32,
  },
  peethaInfo: {
    flex: 1,
  },
  peethaName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  peethaNameKannada: {
    fontSize: 13,
    color: '#FFD4DC',
    marginTop: 2,
  },
  peethaTimeline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  bottomPadding: {
    height: 40,
  },
});

export default MathaHistorySection;
