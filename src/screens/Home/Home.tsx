import React from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { DarshanTimingsCard, FlashCarousel, MathaHeader, NewsTilesGrid, SocialMediaBar } from '@/components/organisms';
import { mockDarshanTimings, mockFlashUpdates, mockNewsArticles, mockSocialMediaLinks } from '@/data/mockData';

export const Home = () => {
  const { signOut, user } = useAuth();

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
