import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { CalendarEvent, PanchangaData } from '@/types';
import { getPanchangaForDate, mockCalendarEvents } from '@/data/mockData';

type FilterType = 'all' | 'aradhana' | 'ekadashi' | 'habba' | 'other';

interface PanchangaCalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date, panchanga: PanchangaData) => void;
  onEventPress?: (event: CalendarEvent) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FILTER_TABS: { key: FilterType; label: string; labelKannada?: string }[] = [
  { key: 'all', label: 'All', labelKannada: 'ಅದ್ಯ' },
  { key: 'aradhana', label: 'Aradhana', labelKannada: 'ಆರಾಧನೆ' },
  { key: 'ekadashi', label: 'Ekadashi', labelKannada: 'ಏಕಾದಶಿ' },
  { key: 'habba', label: 'Festivals', labelKannada: 'ಹಬ್ಬಗಳು' },
  { key: 'other', label: 'Other', labelKannada: 'ಇತರ' },
];

export const PanchangaCalendar: React.FC<PanchangaCalendarProps> = ({
  events = mockCalendarEvents,
  onDateSelect,
  onEventPress,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<'month' | '2weeks'>('month');

  // Get panchanga for selected date
  const selectedPanchanga = useMemo(() => getPanchangaForDate(selectedDate), [selectedDate]);

  // Filter events
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter((event) => event.type === activeFilter);
  }, [events, activeFilter]);

  // Get events for a specific date
  const getEventsForDate = useCallback((date: Date) => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  }, [filteredEvents]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days: (Date | null)[] = [];
    
    // Padding for start of month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Actual days
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    return days;
  }, [currentMonth, currentYear]);

  // Navigation handlers
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    const panchanga = getPanchangaForDate(date);
    onDateSelect?.(date, panchanga);
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_TABS.map((tab) => (
          <Pressable
            key={tab.key}
            style={[styles.filterTab, activeFilter === tab.key && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab.key)}
          >
            <Text style={[styles.filterTabText, activeFilter === tab.key && styles.filterTabTextActive]}>
              {tab.labelKannada || tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Month Navigation */}
      <View style={styles.monthHeader}>
        <Pressable onPress={goToPrevMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'<'}</Text>
        </Pressable>
        
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{MONTHS[currentMonth]}</Text>
          <Text style={styles.yearText}>{currentYear}</Text>
        </View>

        <Pressable 
          style={styles.viewModeButton}
          onPress={() => setViewMode(viewMode === 'month' ? '2weeks' : 'month')}
        >
          <Text style={styles.viewModeText}>
            {viewMode === 'month' ? '2 weeks View' : 'Month View'}
          </Text>
        </Pressable>

        <Pressable onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'>'}</Text>
        </Pressable>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={styles.weekdayText}>{day}</Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((date, index) => {
          if (!date) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const dayEvents = getEventsForDate(date);
          const hasEvent = dayEvents.length > 0;

          return (
            <Pressable
              key={date.toISOString()}
              style={[
                styles.dayCell,
                isSelected(date) && styles.selectedCell,
              ]}
              onPress={() => handleDatePress(date)}
            >
              <Text style={[
                styles.dayText,
                isToday(date) && styles.todayText,
                isSelected(date) && styles.selectedDayText,
              ]}>
                {date.getDate()}
              </Text>
              {hasEvent && <View style={styles.eventDot} />}
            </Pressable>
          );
        })}
      </View>

      {/* Sunrise/Sunset and Samvatsara */}
      <View style={styles.sunInfoRow}>
        <View style={styles.sunItem}>
          <Text style={styles.sunIcon}>🌅</Text>
          <Text style={styles.sunTime}>{selectedPanchanga.sunriseTime}</Text>
        </View>
        <Text style={styles.samvatsaraText}>{selectedPanchanga.samvatsara}</Text>
        <View style={styles.sunItem}>
          <Text style={styles.sunIcon}>🌇</Text>
          <Text style={styles.sunTime}>{selectedPanchanga.sunsetTime}</Text>
        </View>
      </View>

      {/* Panchanga Details Grid */}
      <View style={styles.panchangaGrid}>
        <View style={styles.panchangaRow}>
          <View style={[styles.panchangaCell, styles.panchangaCellLeft]}>
            <Text style={styles.panchangaLabel}>ಆಯನ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.ayana}</Text>
          </View>
          <View style={[styles.panchangaCell, styles.panchangaCellRight]}>
            <Text style={styles.panchangaLabel}>ಋತು</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.rutu}</Text>
          </View>
        </View>
        <View style={styles.panchangaRow}>
          <View style={[styles.panchangaCell, styles.panchangaCellLeft]}>
            <Text style={styles.panchangaLabel}>ಮಾಸ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.masa}</Text>
          </View>
          <View style={[styles.panchangaCell, styles.panchangaCellRight]}>
            <Text style={styles.panchangaLabel}>ಪಕ್ಷ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.paksha}</Text>
          </View>
        </View>
        <View style={styles.panchangaRow}>
          <View style={[styles.panchangaCell, styles.panchangaCellLeft]}>
            <Text style={styles.panchangaLabel}>ತಿಥಿ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.tithi}</Text>
          </View>
          <View style={[styles.panchangaCell, styles.panchangaCellRight]}>
            <Text style={styles.panchangaLabel}>ವಾಸರ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.vasar}</Text>
          </View>
        </View>
        <View style={styles.panchangaRow}>
          <View style={[styles.panchangaCell, styles.panchangaCellLeft]}>
            <Text style={styles.panchangaLabel}>ನಕ್ಷತ್ರ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.nakshatra}</Text>
          </View>
          <View style={[styles.panchangaCell, styles.panchangaCellRight]}>
            <Text style={styles.panchangaLabel}>ಯೋಗ</Text>
            <Text style={styles.panchangaValue}>{selectedPanchanga.yoga}</Text>
          </View>
        </View>
      </View>

      {/* Events for selected date */}
      {getEventsForDate(selectedDate).length > 0 && (
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>Events on this day</Text>
          {getEventsForDate(selectedDate).map((event) => (
            <Pressable
              key={event.id}
              style={styles.eventCard}
              onPress={() => onEventPress?.(event)}
            >
              <View style={[styles.eventTypeIndicator, { backgroundColor: getEventColor(event.type) }]} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.titleKannada && (
                  <Text style={styles.eventTitleKannada}>{event.titleKannada}</Text>
                )}
                {event.location && (
                  <Text style={styles.eventLocation}>📍 {event.location}</Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const getEventColor = (type: CalendarEvent['type']): string => {
  switch (type) {
    case 'aradhana':
      return '#922B3E';
    case 'paryaya':
      return '#6B001A';
    case 'utsava':
      return '#D4AF37';
    case 'ekadashi':
      return '#4A3728';
    case 'habba':
      return '#8B6914';
    default:
      return '#6B5344';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1918',
  },
  filterContainer: {
    backgroundColor: '#252320',
  },
  filterContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#2D2A27',
  },
  filterTabActive: {
    backgroundColor: '#D4AF37',
  },
  filterTabText: {
    color: '#9E9E9E',
    fontSize: 13,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#1A1918',
    fontWeight: '700',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  navButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  monthYearContainer: {
    alignItems: 'flex-start',
  },
  monthYearText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  yearText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  viewModeButton: {
    backgroundColor: '#2D2A27',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  viewModeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  weekdayRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 12,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedCell: {
    backgroundColor: '#D4AF37',
    borderRadius: 25,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  todayText: {
    fontWeight: '700',
    color: '#D4AF37',
  },
  selectedDayText: {
    color: '#1A1918',
    fontWeight: '700',
  },
  eventDot: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
  },
  sunInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#252320',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  sunItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  sunTime: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  samvatsaraText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  panchangaGrid: {
    margin: 12,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    overflow: 'hidden',
  },
  panchangaRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  panchangaCell: {
    flex: 1,
    padding: 12,
  },
  panchangaCellLeft: {
    borderRightWidth: 1,
    borderRightColor: '#D4AF37',
  },
  panchangaCellRight: {},
  panchangaLabel: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  panchangaValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  eventsSection: {
    margin: 12,
  },
  eventsSectionTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#252320',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  eventTypeIndicator: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  eventTitleKannada: {
    color: '#9E9E9E',
    fontSize: 12,
    marginTop: 2,
  },
  eventLocation: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
});

export default PanchangaCalendar;
