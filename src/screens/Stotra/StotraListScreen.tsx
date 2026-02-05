import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stotra } from '@/types';
import { stotraService } from '@/services/stotraService';
import { downloadManager } from '@/services/downloadManager';

export const StotraListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stotras, setStotras] = useState<Stotra[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  const categories = ['Lakshmi Stotra', 'Mukhya Prana Stotra', 'Krishna Stotra', 'Vishnu Stotra', 'Dhyana Stotra'];

  useEffect(() => {
    loadStotras();
  }, []);

  const loadStotras = async () => {
    try {
      setLoading(true);
      const allStotras = await stotraService.getAllStotras();
      setStotras(allStotras);
    } catch (error) {
      console.error('Error loading stotras:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (stotra: Stotra) => {
    if (stotra.source === 'local' || stotra.isDownloaded) {
      return; // Already available locally
    }

    try {
      await downloadManager.downloadStotra(
        stotra.id,
        (progress) => {
          setDownloadProgress((prev) => ({ ...prev, [stotra.id]: progress }));
        },
      );
      // Refresh the list to update download status
      await loadStotras();
      setDownloadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[stotra.id];
        return newProgress;
      });
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const filteredStotras = stotras.filter((stotra) => {
    const matchesSearch =
      stotra.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stotra.titleKannada.includes(searchQuery) ||
      stotra.titleSanskrit.includes(searchQuery);

    const matchesCategory = !selectedCategory || stotra.subcategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderStotraItem = ({ item }: { item: Stotra }) => {
    const isDownloading = downloadProgress[item.id] !== undefined;
    const progress = downloadProgress[item.id] || 0;
    // Check if audio needs to be downloaded (cloud audio that's not downloaded yet)
    const needsDownload = !item.audioUrl.startsWith('bundled://') && !item.isDownloaded;

    return (
      <TouchableOpacity
        style={styles.stotraItem}
        onPress={() => navigation.navigate('StotraDetail', { stotra: item })}
      >
        <View style={styles.stotraInfo}>
          <Text style={styles.stotraTitle}>{item.title}</Text>
          {isDownloading && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          )}
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.duration}>{item.duration}</Text>
          {needsDownload && !isDownloading && (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={(e) => {
                e.stopPropagation();
                handleDownload(item);
              }}
            >
              <Text style={styles.downloadIcon}>☁️</Text>
            </TouchableOpacity>
          )}
          {isDownloading && <ActivityIndicator size="small" color="#5562A4" />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryChip = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEF7" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stotras & Songs</Text>
        <Text style={styles.headerSubtitle}>ಸ್ತೋತ್ರಗಳು ಮತ್ತು ಕೀರ್ತನೆಗಳು</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, author, category..."
          placeholderTextColor="#9E9E9E"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stotra List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5562A4" />
          <Text style={styles.loadingText}>Loading stotras...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStotras}
          renderItem={renderStotraItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFEF7',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3A2A1E',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B5344',
    marginTop: 2,
    fontFamily: 'NotoSansKannada-Regular',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0D0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3A2A1E',
  },
  categoriesScroll: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF9E8',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  categoryChipActive: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  categoryText: {
    fontSize: 13,
    color: '#6B5344',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  stotraItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0EDE5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  stotraIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFF9E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 20,
  },
  stotraInfo: {
    flex: 1,
  },
  stotraTitle: {
    fontSize: 16,
    color: '#3A2A1E',
    fontWeight: '600',
    marginBottom: 2,
  },
  stotraSubtitle: {
    fontSize: 13,
    color: '#8B7355',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 8,
  },
  duration: {
    fontSize: 13,
    color: '#6B5344',
    fontWeight: '500',
  },
  downloadButton: {
    padding: 4,
  },
  downloadIcon: {
    fontSize: 20,
  },
  progressContainer: {
    marginTop: 6,
    height: 18,
    backgroundColor: '#F0EDE5',
    borderRadius: 9,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 60,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#922B3E',
    borderRadius: 9,
  },
  progressText: {
    position: 'absolute',
    right: 6,
    top: 1,
    fontSize: 10,
    color: '#3A2A1E',
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#6B5344',
  },
});
