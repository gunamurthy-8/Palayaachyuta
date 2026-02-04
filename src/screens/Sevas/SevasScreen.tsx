import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Seva } from '@/types/seva';
import { sevasList } from '@/data/sevaData';

interface SevasScreenProps {
  route?: {
    params?: {
      isParyaya?: boolean;
    };
  };
  navigation: any;
}

const SevasScreen = ({ route, navigation }: SevasScreenProps) => {
  const isParyaya = route?.params?.isParyaya ?? false;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSevas, setSelectedSevas] = useState<string[]>([]);

  // Filter sevas based on type (Paryaya or regular)
  const availableSevas = sevasList.filter(seva => {
    if (isParyaya) {
      return seva.isParyayaOnly && seva.isActive;
    }
    return !seva.isParyayaOnly && seva.isActive;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const toggleSevaSelection = (sevaId: string) => {
    setSelectedSevas(prev => {
      if (prev.includes(sevaId)) {
        return prev.filter(id => id !== sevaId);
      }
      return [...prev, sevaId];
    });
  };

  const getSelectedTotal = () => {
    return selectedSevas.reduce((total, sevaId) => {
      const seva = availableSevas.find(s => s.id === sevaId);
      return total + (seva?.price || 0);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleProceed = () => {
    if (selectedSevas.length === 0) {
      return;
    }
    const selected = availableSevas.filter(seva => selectedSevas.includes(seva.id));
    navigation.navigate('DevoteeForm', { 
      sevas: selected, 
      total: getSelectedTotal(),
      isParyaya 
    });
  };

  const openCancellationPolicy = () => {
    Linking.openURL('https://sodematha.in/cancellation-refund-policy.pdf');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>
          {isParyaya ? 'Paryaya Sevas' : 'Sevas in Sode'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {isParyaya ? 'ಪರ್ಯಾಯ ಸೇವೆಗಳು' : 'ಸೋದೆಯಲ್ಲಿ ಸೇವೆಗಳು'}
        </Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );

  const renderSevaCard = ({ item }: { item: Seva }) => {
    const isSelected = selectedSevas.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[styles.sevaCard, isSelected && styles.sevaCardSelected]}
        onPress={() => toggleSevaSelection(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.sevaContent}>
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Icon name="check" size={16} color="#FFF" />}
          </View>
          <View style={styles.sevaInfo}>
            <Text style={styles.sevaNameKannada}>{item.nameKannada}</Text>
            <Text style={styles.sevaName}>{item.name}</Text>
            {item.description && (
              <Text style={styles.sevaDescription} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderParyayaNotice = () => {
    if (!isParyaya) return null;
    
    // Check if Paryaya sevas are available
    const paryayaActive = availableSevas.length > 0;
    
    if (!paryayaActive) {
      return (
        <View style={styles.noticeCard}>
          <Icon name="calendar-clock" size={48} color="#D4AF37" />
          <Text style={styles.noticeTitle}>Paryaya Sevas Not Available</Text>
          <Text style={styles.noticeText}>
            Paryaya sevas are available only during the Paryaya period at Udupi Sri Krishna Matha. Please check back during the next Paryaya.
          </Text>
          <View style={styles.noticeInfo}>
            <Icon name="information" size={18} color="#922B3E" />
            <Text style={styles.noticeInfoText}>
              Sode Vadiraja Matha Paryaya: 2028-2030
            </Text>
          </View>
        </View>
      );
    }
    
    return null;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="hand-heart" size={64} color="#D4AF37" />
      <Text style={styles.emptyTitle}>No Sevas Available</Text>
      <Text style={styles.emptySubtitle}>
        Please check back later for available sevas
      </Text>
    </View>
  );

  const renderInfoCard = () => (
    <View style={styles.infoCard}>
      <View style={styles.infoRow}>
        <Icon name="shield-check" size={20} color="#27AE60" />
        <Text style={styles.infoText}>Secure Online Payment</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="truck-delivery" size={20} color="#27AE60" />
        <Text style={styles.infoText}>Prasadam Delivery Available</Text>
      </View>
      <TouchableOpacity style={styles.policyLink} onPress={openCancellationPolicy}>
        <Icon name="file-document" size={18} color="#922B3E" />
        <Text style={styles.policyText}>View Cancellation & Refund Policy</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (selectedSevas.length === 0) return null;

    return (
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            {selectedSevas.length} seva{selectedSevas.length > 1 ? 's' : ''} selected
          </Text>
          <Text style={styles.totalAmount}>{formatPrice(getSelectedTotal())}</Text>
        </View>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceed}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
          <Icon name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      {isParyaya && renderParyayaNotice()}
      
      {!isParyaya || availableSevas.length > 0 ? (
        <FlatList
          data={availableSevas}
          renderItem={renderSevaCard}
          keyExtractor={item => item.id}
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
          ListHeaderComponent={renderInfoCard}
          ListEmptyComponent={renderEmptyState}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : null}

      {renderFooter()}
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
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  infoCard: {
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4A3728',
  },
  policyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D4E5D4',
  },
  policyText: {
    fontSize: 14,
    color: '#922B3E',
    fontWeight: '600',
  },
  sevaCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F0E6D3',
    shadowColor: '#4A3728',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sevaCardSelected: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFFBF0',
  },
  sevaContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginRight: 12,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  sevaInfo: {
    flex: 1,
  },
  sevaNameKannada: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
    fontFamily: 'NotoSansKannada-Regular',
    lineHeight: 24,
  },
  sevaName: {
    fontSize: 13,
    color: '#8B7355',
    marginTop: 2,
  },
  sevaDescription: {
    fontSize: 12,
    color: '#8B7355',
    marginTop: 6,
    lineHeight: 16,
  },
  priceContainer: {
    marginLeft: 12,
    backgroundColor: '#922B3E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
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
  noticeCard: {
    backgroundColor: '#FFF9E8',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
    marginTop: 16,
    textAlign: 'center',
  },
  noticeText: {
    fontSize: 14,
    color: '#8B7355',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  noticeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  noticeInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#922B3E',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFEF7',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: '#8B7355',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#922B3E',
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#922B3E',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default SevasScreen;
