import React from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '@/context/AuthContext';
import { DarshanTimingsCard, FlashCarousel, MathaHeader, NewsTilesGrid, SocialMediaBar } from '@/components/organisms';
import { mockDarshanTimings, mockFlashUpdates, mockNewsArticles, mockSocialMediaLinks } from '@/data/mockData';

// Quick Action Item Component
const QuickActionItem = ({ 
  icon, 
  label, 
  labelKannada, 
  onPress, 
  color = '#922B3E' 
}: {
  icon: string;
  label: string;
  labelKannada: string;
  onPress: () => void;
  color?: string;
}) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
      <Icon name={icon} size={24} color="#FFF" />
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
    <Text style={styles.quickActionLabelKannada}>{labelKannada}</Text>
  </TouchableOpacity>
);

export const Home = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation<any>();

  const handleArticlePress = (article: any) => {
    // TODO: Navigate to article detail
    console.log('Article pressed:', article.title);
  };

  const handleUpdatePress = (update: any) => {
    // TODO: Handle flash update press
    console.log('Update pressed:', update.message);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const quickActions = [
    { icon: 'hand-heart', label: 'Sevas', labelKannada: 'ಸೇವೆಗಳು', route: 'Sevas', color: '#922B3E' },
    { icon: 'image-multiple', label: 'Gallery', labelKannada: 'ಗ್ಯಾಲರಿ', route: 'Gallery', color: '#4A3728' },
    { icon: 'book-open-page-variant', label: 'Artefacts', labelKannada: 'ಪ್ರಕಟಣೆ', route: 'Artefacts', color: '#3498DB' },
    { icon: 'bed', label: 'Room Booking', labelKannada: 'ವಸತಿ', route: 'RoomBooking', color: '#27AE60' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEF7" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Logo and Swamiji photos */}
        <MathaHeader />
        
        {/* Flash Updates Carousel */}
        <FlashCarousel 
          updates={mockFlashUpdates} 
          onUpdatePress={handleUpdatePress}
          autoScrollInterval={5000}
        />

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionTitleKannada}>ತ್ವರಿತ ಕ್ರಿಯೆಗಳು</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionItem
                key={index}
                icon={action.icon}
                label={action.label}
                labelKannada={action.labelKannada}
                color={action.color}
                onPress={() => navigation.navigate(action.route)}
              />
            ))}
          </View>
        </View>
        
        {/* Top 5 News Articles */}
        <NewsTilesGrid 
          articles={mockNewsArticles} 
          onArticlePress={handleArticlePress}
        />
        
        {/* Darshan Timings */}
        <DarshanTimingsCard timings={mockDarshanTimings} />
        
        {/* Social Media Links */}
        <SocialMediaBar links={mockSocialMediaLinks} />

        {/* Temporary Sign Out Button for testing */}
        <View style={styles.signOutSection}>
          <Text style={styles.userInfo}>
            Logged in: {user?.phoneNumber || 'Unknown'}
          </Text>
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out (Test)</Text>
          </Pressable>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
    marginHorizontal: 16,
  },
  sectionTitleKannada: {
    fontSize: 14,
    color: '#8B7355',
    marginHorizontal: 16,
    marginBottom: 12,
    fontFamily: 'NotoSansKannada-Regular',
  },
  quickActionsSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3728',
    textAlign: 'center',
  },
  quickActionLabelKannada: {
    fontSize: 10,
    color: '#8B7355',
    textAlign: 'center',
    fontFamily: 'NotoSansKannada-Regular',
  },
  bottomPadding: {
    height: 80,
  },
  signOutSection: {
    margin: 12,
    padding: 16,
    backgroundColor: '#FFF9E8',
    borderRadius: 12,
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 12,
    color: '#6B5344',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#922B3E',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signOutText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
export default Home;
