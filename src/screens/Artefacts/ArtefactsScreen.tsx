import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Artefact, ArtefactCategory } from '@/types/seva';
import { artefactsList, artefactCategories } from '@/data/sevaData';

const { width } = Dimensions.get('window');

const ArtefactsScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [artefacts, setArtefacts] = useState<Artefact[]>(artefactsList);
  const [refreshing, setRefreshing] = useState(false);

  const filteredArtefacts = artefacts.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleKannada.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return 'microphone';
      case 'pdf':
        return 'file-pdf-box';
      case 'text':
        return 'file-document';
      case 'video':
        return 'video';
      default:
        return 'file';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audio':
        return '#922B3E';
      case 'pdf':
        return '#E74C3C';
      case 'text':
        return '#3498DB';
      case 'video':
        return '#9B59B6';
      default:
        return '#7F8C8D';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleArtefactPress = (item: Artefact) => {
    navigation.navigate('ArtefactDetail', { artefact: item });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Artefacts</Text>
        <Text style={styles.headerSubtitle}>ಪ್ರಕಟಣೆಗಳು</Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name="magnify" size={22} color="#8B7355" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search publications..."
          placeholderTextColor="#8B7355"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color="#8B7355" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.voiceButton}>
        <Icon name="microphone" size={22} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderCategoryCard = ({ item }: { item: ArtefactCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardActive,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? 'all' : item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryName,
        selectedCategory === item.id && styles.categoryNameActive,
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.categoryCount,
        selectedCategory === item.id && styles.categoryCountActive,
      ]}>
        {item.count}
      </Text>
    </TouchableOpacity>
  );

  const renderArtefactCard = ({ item }: { item: Artefact }) => (
    <TouchableOpacity
      style={styles.artefactCard}
      onPress={() => handleArtefactPress(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]}>
        <Icon name={getTypeIcon(item.type)} size={24} color="#FFF" />
      </View>
      <View style={styles.artefactInfo}>
        <Text style={styles.artefactTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.artefactTitleKannada} numberOfLines={1}>
          {item.titleKannada}
        </Text>
        <View style={styles.artefactMeta}>
          {item.author && (
            <View style={styles.metaItem}>
              <Icon name="account" size={12} color="#8B7355" />
              <Text style={styles.metaText}>{item.author}</Text>
            </View>
          )}
          {item.duration && (
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={12} color="#8B7355" />
              <Text style={styles.metaText}>{formatDuration(item.duration)}</Text>
            </View>
          )}
        </View>
      </View>
      <Icon name="chevron-right" size={24} color="#D4AF37" />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="file-search-outline" size={64} color="#D4AF37" />
      <Text style={styles.emptyTitle}>No Artefacts Found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery 
          ? 'Try a different search term'
          : 'Check back later for new publications'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {renderSearchBar()}
      
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={artefactCategories}
          renderItem={renderCategoryCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Publications' : artefactCategories.find(c => c.id === selectedCategory)?.name}
          {' '}
          <Text style={styles.resultCount}>({filteredArtefacts.length})</Text>
        </Text>
        
        <FlatList
          data={filteredArtefacts}
          renderItem={renderArtefactCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.artefactsList}
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
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E8',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F0E6D3',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 15,
    color: '#4A3728',
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#922B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesSection: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8B7355',
  },
  categoriesList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    width: 100,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E6D3',
    shadowColor: '#4A3728',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardActive: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3728',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#FFF',
  },
  categoryCount: {
    fontSize: 11,
    color: '#8B7355',
    marginTop: 4,
  },
  categoryCountActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  resultsSection: {
    flex: 1,
    marginTop: 16,
  },
  artefactsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  artefactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#4A3728',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  typeIndicator: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artefactInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  artefactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A3728',
    lineHeight: 20,
  },
  artefactTitleKannada: {
    fontSize: 13,
    color: '#8B7355',
    marginTop: 2,
    fontFamily: 'NotoSansKannada-Regular',
  },
  artefactMeta: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#8B7355',
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
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

export default ArtefactsScreen;
