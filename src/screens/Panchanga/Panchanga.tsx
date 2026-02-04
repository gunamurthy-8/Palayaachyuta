import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { PanchangaCalendar } from '@/components/organisms';
import type { CalendarEvent, PanchangaData } from '@/types';

export const Panchanga = () => {
  const handleDateSelect = (date: Date, panchanga: PanchangaData) => {
    console.log('Selected date:', date.toDateString());
    console.log('Panchanga:', panchanga);
  };

  const handleEventPress = (event: CalendarEvent) => {
    // TODO: Navigate to event detail or show modal
    console.log('Event pressed:', event.title);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1918" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panchanga</Text>
        <View style={styles.headerActions}>
          <Text style={styles.headerActionText}>अA</Text>
          <Text style={styles.headerActionText}>📄</Text>
        </View>
      </View>
      
      {/* Panchanga Calendar */}
      <PanchangaCalendar
        onDateSelect={handleDateSelect}
        onEventPress={handleEventPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1918',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2A27',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerActionText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Panchanga;
