import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { NewsArticle } from '@/types';

interface NewsTileProps {
  article: NewsArticle;
  onPress?: (article: NewsArticle) => void;
  size?: 'large' | 'small';
}

export const NewsTile: React.FC<NewsTileProps> = ({ article, onPress, size = 'small' }) => {
  const isLarge = size === 'large';

  return (
    <Pressable
      style={[styles.tile, isLarge ? styles.tileLarge : styles.tileSmall]}
      onPress={() => onPress?.(article)}
    >
      <Image
        source={{ uri: article.imageUrl }}
        style={[styles.image, isLarge ? styles.imageLarge : styles.imageSmall]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, isLarge && styles.titleLarge]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.summary} numberOfLines={isLarge ? 3 : 2}>
          {article.summary}
        </Text>
      </View>
    </Pressable>
  );
};

interface NewsTilesGridProps {
  articles: NewsArticle[];
  onArticlePress?: (article: NewsArticle) => void;
}

export const NewsTilesGrid: React.FC<NewsTilesGridProps> = ({ articles, onArticlePress }) => {
  const topArticle = articles[0];
  const otherArticles = articles.slice(1, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Latest News</Text>
      
      {/* Featured Article */}
      {topArticle && (
        <NewsTile article={topArticle} onPress={onArticlePress} size="large" />
      )}
      
      {/* Grid of other articles */}
      <View style={styles.grid}>
        {otherArticles.map((article) => (
          <NewsTile key={article.id} article={article} onPress={onArticlePress} size="small" />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  tileLarge: {
    width: '100%',
  },
  tileSmall: {
    width: '48%',
  },
  image: {
    width: '100%',
    backgroundColor: '#E0D8C8',
  },
  imageLarge: {
    height: 160,
  },
  imageSmall: {
    height: 100,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A2A1E',
    marginBottom: 4,
  },
  titleLarge: {
    fontSize: 16,
  },
  summary: {
    fontSize: 12,
    color: '#6B5344',
    lineHeight: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default NewsTilesGrid;
