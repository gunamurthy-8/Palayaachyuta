import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { GalleryAlbum } from '@/types/seva';
import { galleryAlbums } from '@/data/sevaData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const GalleryScreen = ({ navigation }: any) => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(galleryAlbums);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'view-grid' },
    { id: 'festival', name: 'Festivals', icon: 'candelabra' },
    { id: 'visit', name: 'Visits', icon: 'map-marker' },
    { id: 'event', name: 'Events', icon: 'calendar' },
  ];

  const filteredAlbums = selectedCategory === 'all' 
    ? albums 
    : albums.filter(album => album.category === selectedCategory);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // In real app, fetch from API
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderAlbumCard = ({ item, index }: { item: GalleryAlbum; index: number }) => (
    <TouchableOpacity
      style={[styles.albumCard, { marginLeft: index % 2 === 0 ? 16 : 8, marginRight: index % 2 === 1 ? 16 : 8 }]}
      onPress={() => navigation.navigate('AlbumDetail', { album: item })}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.coverImage }}
          style={styles.albumImage}
          resizeMode="cover"
        />
        <View style={styles.mediaCountBadge}>
          <Icon name="image-multiple" size={14} color="#FFF" />
          <Text style={styles.mediaCountText}>{item.mediaCount}</Text>
        </View>
      </View>
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.albumTitleKannada} numberOfLines={1}>
          {item.titleKannada}
        </Text>
        <View style={styles.albumMeta}>
          <Icon name="calendar" size={12} color="#8B7355" />
          <Text style={styles.albumDate}>{formatDate(item.eventDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoryContainer}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryChip,
            selectedCategory === category.id && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <Icon
            name={category.icon}
            size={16}
            color={selectedCategory === category.id ? '#FFF' : '#4A3728'}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Gallery</Text>
        <Text style={styles.headerSubtitle}>ಗ್ಯಾಲರಿ</Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="image-off-outline" size={64} color="#D4AF37" />
      <Text style={styles.emptyTitle}>No Albums Found</Text>
      <Text style={styles.emptySubtitle}>
        Check back later for new photo albums
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {renderCategoryFilter()}
      
      <FlatList
        data={filteredAlbums}
        renderItem={renderAlbumCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D4AF37"
            colors={['#D4AF37']}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A3728',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8B7355',
    fontFamily: 'NotoSansKannada-Regular',
  },
  headerRight: {
    width: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF9E8',
    borderWidth: 1,
    borderColor: '#D4AF37',
    gap: 4,
  },
  categoryChipActive: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3728',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  albumCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4A3728',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  albumImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0E6D3',
  },
  mediaCountBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  mediaCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  albumInfo: {
    padding: 12,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A3728',
    lineHeight: 18,
  },
  albumTitleKannada: {
    fontSize: 12,
    color: '#8B7355',
    marginTop: 2,
    fontFamily: 'NotoSansKannada-Regular',
  },
  albumMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  albumDate: {
    fontSize: 11,
    color: '#8B7355',
  },
  separator: {
    height: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A3728',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8B7355',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default GalleryScreen;
