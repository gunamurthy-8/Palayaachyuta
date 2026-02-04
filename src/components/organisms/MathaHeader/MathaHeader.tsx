import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Import images using relative paths from this file location
const logo = require('../../../../assets/logo.png');
const vishwottamaTeertharu = require('../../../../assets/Vishwothama_teertharu.png');
const vishwavallabhaTeertharu = require('../../../../assets/vishwavallabha_teertharu.jpg');

interface MathaHeaderProps {
  compact?: boolean;
}

export const MathaHeader: React.FC<MathaHeaderProps> = ({ compact = false }) => {
  const imageSize = compact ? 60 : 80;
  const logoSize = compact ? 70 : 100;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {/* Logo */}
        <Image
          source={logo}
          style={[styles.logo, { width: logoSize, height: logoSize }]}
          resizeMode="contain"
        />
        
        {/* Vishwothama Teertharu */}
        <Image
          source={vishwottamaTeertharu}
          style={[styles.swamiji, { width: imageSize, height: imageSize }]}
          resizeMode="cover"
        />
        
        {/* Vishwavallabha Teertharu */}
        <Image
          source={vishwavallabhaTeertharu}
          style={[styles.swamiji, { width: imageSize, height: imageSize }]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFEF7',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 8,
  },
  swamiji: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
});

export default MathaHeader;
