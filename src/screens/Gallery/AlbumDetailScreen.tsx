import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { GalleryAlbum, GalleryMedia } from '@/types/seva';
import { galleryMedia } from '@/data/sevaData';

const { width, height } = Dimensions.get('window');
const IMAGE_SIZE = (width - 48) / 3;

interface AlbumDetailScreenProps {
  route: {
    params: {
      album: GalleryAlbum;
    };
  };
  navigation: any;
}

const AlbumDetailScreen = ({ route, navigation }: AlbumDetailScreenProps) => {
  const { album } = route.params;
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch media for this album
    loadMedia();
  }, []);

  const loadMedia = () => {
    setLoading(true);
    // In real app, fetch from API
    setTimeout(() => {
      const albumMedia = galleryMedia.filter(m => m.albumId === album.id);
      // Generate mock data for demo
      const mockMedia: GalleryMedia[] = Array.from({ length: album.mediaCount }, (_, i) => ({
        id: `${album.id}-media-${i}`,
        albumId: album.id,
        type: i % 5 === 0 ? 'video' : 'photo',
        url: `https://via.placeholder.com/800x600?text=Image+${i + 1}`,
        thumbnailUrl: `https://via.placeholder.com/400x300?text=Thumb+${i + 1}`,
        caption: `Photo ${i + 1} from ${album.title}`,
        createdAt: album.eventDate,
      }));
      setMedia(mockMedia);
      setLoading(false);
    }, 1000);
  };

  const openMediaViewer = (item: GalleryMedia) => {
    setSelectedMedia(item);
    setModalVisible(true);
  };

  const closeMediaViewer = () => {
    setModalVisible(false);
    setSelectedMedia(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderMediaItem = ({ item, index }: { item: GalleryMedia; index: number }) => (
    <TouchableOpacity
      style={[
        styles.mediaItem,
        { marginLeft: index % 3 === 0 ? 16 : 4, marginRight: index % 3 === 2 ? 16 : 4 },
      ]}
      onPress={() => openMediaViewer(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.thumbnailUrl || item.url }}
        style={styles.mediaImage}
        resizeMode="cover"
      />
      {item.type === 'video' && (
        <View style={styles.videoOverlay}>
          <Icon name="play-circle" size={32} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle} numberOfLines={1}>{album.title}</Text>
        <Text style={styles.headerSubtitle}>{formatDate(album.eventDate)}</Text>
      </View>
      <TouchableOpacity style={styles.shareButton}>
        <Icon name="share-variant" size={22} color="#4A3728" />
      </TouchableOpacity>
    </View>
  );

  const renderAlbumInfo = () => (
    <View style={styles.albumInfo}>
      <Text style={styles.albumDescription}>{album.description}</Text>
      <View style={styles.albumStats}>
        <View style={styles.statItem}>
          <Icon name="image-multiple" size={18} color="#D4AF37" />
          <Text style={styles.statText}>{album.mediaCount} items</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="tag" size={18} color="#D4AF37" />
          <Text style={styles.statText}>{album.category}</Text>
        </View>
      </View>
    </View>
  );

  const renderMediaViewer = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={closeMediaViewer}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={closeMediaViewer}>
          <Icon name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        
        {selectedMedia && (
          <>
            <Image
              source={{ uri: selectedMedia.thumbnailUrl || selectedMedia.url }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            {selectedMedia.type === 'video' && (
              <View style={styles.videoPlayOverlay}>
                <Icon name="play-circle" size={64} color="#FFF" />
                <Text style={styles.videoText}>Video playback coming soon</Text>
              </View>
            )}
            {selectedMedia.caption && (
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>{selectedMedia.caption}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {renderAlbumInfo()}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Loading photos...</Text>
        </View>
      ) : (
        <FlatList
          data={media}
          renderItem={renderMediaItem}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {renderMediaViewer()}
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
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8B7355',
    marginTop: 2,
  },
  shareButton: {
    padding: 8,
  },
  albumInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  albumDescription: {
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 20,
  },
  albumStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#8B7355',
    textTransform: 'capitalize',
  },
  listContent: {
    paddingVertical: 8,
  },
  mediaItem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0E6D3',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#8B7355',
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  fullImage: {
    width: width,
    height: height * 0.7,
  },
  fullVideo: {
    width: width,
    height: height * 0.5,
  },
  videoPlayOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 8,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 8,
  },
  captionText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default AlbumDetailScreen;
