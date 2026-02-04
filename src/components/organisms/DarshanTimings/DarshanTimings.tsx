import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { DarshanTiming } from '@/types';

interface DarshanTimingsCardProps {
  timings: DarshanTiming[];
}

export const DarshanTimingsCard: React.FC<DarshanTimingsCardProps> = ({ timings }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙏 Darshan & Prasada Timings</Text>
      
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.locationCell]}>Location</Text>
          <Text style={[styles.headerCell, styles.timeCell]}>Darshan</Text>
          <Text style={[styles.headerCell, styles.timeCell]}>Prasada</Text>
        </View>

        {/* Data Rows */}
        {timings.map((timing, index) => (
          <View 
            key={timing.location} 
            style={[styles.dataRow, index % 2 === 0 && styles.alternateRow]}
          >
            <Text style={[styles.dataCell, styles.locationCell]}>{timing.location}</Text>
            <Text style={[styles.dataCell, styles.timeCell]}>{timing.darshanTime}</Text>
            <Text style={[styles.dataCell, styles.timeCell]}>{timing.prasadaTime}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#E8E0D0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#D4AF37',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  headerCell: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 12,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8E0D0',
  },
  alternateRow: {
    backgroundColor: '#FFF9E8',
  },
  dataCell: {
    fontSize: 12,
    color: '#3A2A1E',
  },
  locationCell: {
    flex: 1.2,
  },
  timeCell: {
    flex: 1.5,
    textAlign: 'center',
  },
});

export default DarshanTimingsCard;
