import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import type { SocialMediaLink } from '@/types';

interface SocialMediaBarProps {
  links: SocialMediaLink[];
}

const getPlatformIcon = (platform: SocialMediaLink['platform']): string => {
  switch (platform) {
    case 'instagram':
      return '📷';
    case 'facebook':
      return '📘';
    case 'youtube':
      return '▶️';
    case 'whatsapp':
      return '💬';
    default:
      return '🔗';
  }
};

const getPlatformColor = (platform: SocialMediaLink['platform']): string => {
  switch (platform) {
    case 'instagram':
      return '#E4405F';
    case 'facebook':
      return '#1877F2';
    case 'youtube':
      return '#FF0000';
    case 'whatsapp':
      return '#25D366';
    default:
      return '#6B5344';
  }
};

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({ links }) => {
  const handlePress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect With Us</Text>
      <View style={styles.linksRow}>
        {links.map((link) => (
          <Pressable
            key={link.platform}
            style={[styles.linkButton, { backgroundColor: getPlatformColor(link.platform) }]}
            onPress={() => handlePress(link.url)}
          >
            <Text style={styles.icon}>{getPlatformIcon(link.platform)}</Text>
            <Text style={styles.handle}>{link.handle}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
    textAlign: 'center',
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  handle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default SocialMediaBar;
