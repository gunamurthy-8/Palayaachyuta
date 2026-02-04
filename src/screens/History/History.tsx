import React, { useState, useCallback } from 'react';
import { 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { ParamparaGrid } from '@/components/organisms/ParamparaGrid';
import { MadhwacharyaSection } from '@/components/organisms/MadhwacharyaSection';
import { BhootarajaSection } from '@/components/organisms/BhootarajaSection';
import { MathaHistorySection } from '@/components/organisms/MathaHistorySection';
import type { Guru } from '@/data/paramparaData';

type TabKey = 'history' | 'parampara' | 'acharya' | 'bhootaraja';

interface Tab {
  key: TabKey;
  label: string;
  labelKannada: string;
}

const TABS: Tab[] = [
  { key: 'history', label: 'History', labelKannada: 'ಇತಿಹಾಸ' },
  { key: 'parampara', label: 'Parampara', labelKannada: 'ಪರಂಪರೆ' },
  { key: 'acharya', label: 'Acharya', labelKannada: 'ಆಚಾರ್ಯರು' },
  { key: 'bhootaraja', label: 'Bhootaraja', labelKannada: 'ಭೂತರಾಜ' },
];

export const HistoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('history');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleGuruPress = useCallback((guru: Guru) => {
    navigation.navigate('GuruDetail', { guru });
  }, [navigation]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return <MathaHistorySection />;
      case 'parampara':
        return <ParamparaGrid onGuruPress={handleGuruPress} />;
      case 'acharya':
        return <MadhwacharyaSection />;
      case 'bhootaraja':
        return <BhootarajaSection />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History & Parampara</Text>
        <Text style={styles.headerSubtitle}>ಇತಿಹಾಸ ಮತ್ತು ಪರಂಪರೆ</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBarContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
                <Text style={[styles.tabLabelKannada, isActive && styles.tabLabelKannadaActive]}>
                  {tab.labelKannada}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
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
  },
  tabBarContainer: {
    backgroundColor: '#FFF9E8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E8E0D0',
  },
  tabBarContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    minWidth: 80,
  },
  tabActive: {
    backgroundColor: '#922B3E',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B5344',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  tabLabelKannada: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
  tabLabelKannadaActive: {
    color: '#FFD4DC',
  },
  contentContainer: {
    flex: 1,
  },
});

export default HistoryScreen;
