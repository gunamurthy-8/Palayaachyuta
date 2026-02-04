import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { FlashUpdate } from '@/types';

const { width: screenWidth } = Dimensions.get('window');

interface FlashCarouselProps {
  updates: FlashUpdate[];
  autoScrollInterval?: number;
  onUpdatePress?: (update: FlashUpdate) => void;
}

export const FlashCarousel: React.FC<FlashCarouselProps> = ({
  updates,
  autoScrollInterval = 4000,
  onUpdatePress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (screenWidth - 24),
      animated: true,
    });
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (updates.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % updates.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, updates.length, autoScrollInterval, scrollToIndex]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth - 24));
    if (index !== currentIndex && index >= 0 && index < updates.length) {
      setCurrentIndex(index);
    }
  };

  const getTypeColor = (type: FlashUpdate['type']) => {
    switch (type) {
      case 'aradhana':
        return '#922B3E';
      case 'festival':
        return '#D4AF37';
      case 'utsava':
        return '#8B6914';
      case 'announcement':
        return '#5A4639';
      default:
        return '#6B5344';
    }
  };

  if (updates.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📢 Updates</Text>
      </View>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {updates.map((update) => (
          <Pressable
            key={update.id}
            style={[styles.card, { borderLeftColor: getTypeColor(update.type) }]}
            onPress={() => onUpdatePress?.(update)}
          >
            <Text style={styles.message}>{update.message}</Text>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(update.type) }]}>
              <Text style={styles.typeText}>{update.type.toUpperCase()}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      {updates.length > 1 && (
        <View style={styles.pagination}>
          {updates.map((_, index) => (
            <Pressable
              key={index}
              style={[styles.dot, currentIndex === index && styles.dotActive]}
              onPress={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  card: {
    width: screenWidth - 48,
    marginRight: 12,
    backgroundColor: '#FFF9E8',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  message: {
    fontSize: 14,
    color: '#3A2A1E',
    lineHeight: 20,
    marginBottom: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4C4B0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#D4AF37',
    width: 20,
  },
});

export default FlashCarousel;
