import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { CalendarEvent, PanchangaData } from '@/types';
import { getPanchangaForDate, mockCalendarEvents } from '@/data/mockData';

type FilterType = 'all' | 'aradhana' | 'ekadashi' | 'habba' | 'other';

interface PanchangaCalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date, panchanga: PanchangaData) => void;
  onEventPress?: (event: CalendarEvent) => void;
}

const WEEKDAYS_SHORT = ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_KN = [
  'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್',
  'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'
];

const FILTER_CHIPS: { key: FilterType; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '📿' },
  { key: 'aradhana', label: 'Aradhana', icon: '🙏' },
  { key: 'ekadashi', label: 'Ekadashi', icon: '🌙' },
  { key: 'habba', label: 'Festivals', icon: '🎉' },
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
  const scrollViewRef = useRef<ScrollView>(null);

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

  // Generate week strip (7 days centered on today)
  const weekStrip = useMemo(() => {
    const days: Date[] = [];
    const startOfWeek = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    for (let d = new Date(startOfWeek); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [currentMonth, currentYear]);

  // Navigation
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

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Month Header - Elegant Design */}
      <View style={styles.monthHeaderSection}>
        <View style={styles.monthHeaderRow}>
          <Pressable onPress={goToPrevMonth} style={styles.navArrow}>
            <Text style={styles.navArrowText}>‹</Text>
          </Pressable>
          
          <View style={styles.monthTitleContainer}>
            <Text style={styles.monthTitleKn}>{MONTHS_KN[currentMonth]}</Text>
            <Text style={styles.yearTitle}>{currentYear}</Text>
          </View>
          
          <Pressable onPress={goToNextMonth} style={styles.navArrow}>
            <Text style={styles.navArrowText}>›</Text>
          </Pressable>
        </View>
      </View>

      {/* Horizontal Week Strip Calendar */}
      <View style={styles.weekStripContainer}>
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekStripContent}
        >
          {weekStrip.map((date) => {
            const dayEvents = getEventsForDate(date);
            const hasEvent = dayEvents.length > 0;
            const selected = isSelected(date);
            const isTodayDate = isToday(date);

            return (
              <Pressable
                key={date.toISOString()}
                style={[
                  styles.dayPill,
                  selected && styles.dayPillSelected,
                  isTodayDate && !selected && styles.dayPillToday,
                ]}
                onPress={() => handleDatePress(date)}
              >
                <Text style={[
                  styles.dayPillWeekday,
                  selected && styles.dayPillTextSelected,
                ]}>
                  {WEEKDAYS_SHORT[date.getDay()]}
                </Text>
                <Text style={[
                  styles.dayPillNumber,
                  selected && styles.dayPillTextSelected,
                  isTodayDate && !selected && styles.dayPillNumberToday,
                ]}>
                  {date.getDate()}
                </Text>
                {hasEvent && (
                  <View style={[
                    styles.eventIndicator,
                    selected && styles.eventIndicatorSelected,
                  ]} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter Chips - Horizontal Scrollable */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterChipsContainer}
        contentContainerStyle={styles.filterChipsContent}
      >
        {FILTER_CHIPS.map((chip) => (
          <Pressable
            key={chip.key}
            style={[
              styles.filterChip,
              activeFilter === chip.key && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(chip.key)}
          >
            <Text style={styles.filterChipIcon}>{chip.icon}</Text>
            <Text style={[
              styles.filterChipText,
              activeFilter === chip.key && styles.filterChipTextActive,
            ]}>
              {chip.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Selected Date Display */}
      <View style={styles.selectedDateBanner}>
        <View style={styles.selectedDateLeft}>
          <Text style={styles.selectedDateDay}>
            {selectedDate.getDate()}
          </Text>
          <View style={styles.selectedDateInfo}>
            <Text style={styles.selectedDateWeekday}>
              {WEEKDAYS_EN[selectedDate.getDay()]}
            </Text>
            <Text style={styles.selectedDateSamvatsara}>
              {selectedPanchanga.samvatsara}
            </Text>
          </View>
        </View>
        <View style={styles.sunriseSunset}>
          <View style={styles.sunTimeItem}>
            <Text style={styles.sunIcon}>☀️</Text>
            <Text style={styles.sunTime}>{selectedPanchanga.sunriseTime}</Text>
          </View>
          <View style={styles.sunTimeItem}>
            <Text style={styles.sunIcon}>🌙</Text>
            <Text style={styles.sunTime}>{selectedPanchanga.sunsetTime}</Text>
          </View>
        </View>
      </View>

      {/* Panchanga Cards - Vertical Layout */}
      <View style={styles.panchangaCardsContainer}>
        <Text style={styles.panchangaSectionTitle}>ಪಂಚಾಂಗ ವಿವರ</Text>
        
        <View style={styles.panchangaCardsGrid}>
          <PanchangaInfoCard 
            icon="🌞" 
            label="ಆಯನ" 
            labelEn="Ayana"
            value={selectedPanchanga.ayana} 
          />
          <PanchangaInfoCard 
            icon="🍃" 
            label="ಋತು" 
            labelEn="Rutu"
            value={selectedPanchanga.rutu} 
          />
          <PanchangaInfoCard 
            icon="📅" 
            label="ಮಾಸ" 
            labelEn="Masa"
            value={selectedPanchanga.masa} 
          />
          <PanchangaInfoCard 
            icon="🌓" 
            label="ಪಕ್ಷ" 
            labelEn="Paksha"
            value={selectedPanchanga.paksha} 
          />
          <PanchangaInfoCard 
            icon="🌛" 
            label="ತಿಥಿ" 
            labelEn="Tithi"
            value={selectedPanchanga.tithi} 
            highlight
          />
          <PanchangaInfoCard 
            icon="📆" 
            label="ವಾಸರ" 
            labelEn="Vasar"
            value={selectedPanchanga.vasar} 
          />
          <PanchangaInfoCard 
            icon="⭐" 
            label="ನಕ್ಷತ್ರ" 
            labelEn="Nakshatra"
            value={selectedPanchanga.nakshatra} 
            highlight
          />
          <PanchangaInfoCard 
            icon="🕉️" 
            label="ಯೋಗ" 
            labelEn="Yoga"
            value={selectedPanchanga.yoga} 
          />
        </View>
      </View>

      {/* Events Section */}
      {selectedDateEvents.length > 0 && (
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>
            📿 Today's Events ({selectedDateEvents.length})
          </Text>
          
          {selectedDateEvents.map((event) => (
            <Pressable
              key={event.id}
              style={styles.eventCard}
              onPress={() => onEventPress?.(event)}
            >
              <View style={[styles.eventTypeBadge, { backgroundColor: getEventColor(event.type) }]}>
                <Text style={styles.eventTypeText}>{getEventEmoji(event.type)}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.titleKannada && (
                  <Text style={styles.eventTitleKannada}>{event.titleKannada}</Text>
                )}
                {event.location && (
                  <View style={styles.eventLocationRow}>
                    <Text style={styles.eventLocationIcon}>📍</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.eventArrow}>›</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* No Events Placeholder */}
      {selectedDateEvents.length === 0 && (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsEmoji}>🕉️</Text>
          <Text style={styles.noEventsText}>No special events today</Text>
          <Text style={styles.noEventsSubtext}>A blessed day for regular worship</Text>
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

// Panchanga Info Card Component
interface PanchangaInfoCardProps {
  icon: string;
  label: string;
  labelEn: string;
  value: string;
  highlight?: boolean;
}

const PanchangaInfoCard: React.FC<PanchangaInfoCardProps> = ({ 
  icon, label, labelEn, value, highlight 
}) => (
  <View style={[styles.panchangaCard, highlight && styles.panchangaCardHighlight]}>
    <Text style={styles.panchangaCardIcon}>{icon}</Text>
    <View style={styles.panchangaCardContent}>
      <Text style={styles.panchangaCardLabel}>{label}</Text>
      <Text style={styles.panchangaCardLabelEn}>{labelEn}</Text>
    </View>
    <Text style={[styles.panchangaCardValue, highlight && styles.panchangaCardValueHighlight]}>
      {value}
    </Text>
  </View>
);

const getEventColor = (type: CalendarEvent['type']): string => {
  switch (type) {
    case 'aradhana': return '#922B3E';
    case 'paryaya': return '#6B001A';
    case 'utsava': return '#D4AF37';
    case 'ekadashi': return '#4A3728';
    case 'habba': return '#2E7D32';
    default: return '#6B5344';
  }
};

const getEventEmoji = (type: CalendarEvent['type']): string => {
  switch (type) {
    case 'aradhana': return '🙏';
    case 'paryaya': return '🛕';
    case 'utsava': return '🎊';
    case 'ekadashi': return '🌙';
    case 'habba': return '🎉';
    default: return '📿';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  // Month Header
  monthHeaderSection: {
    backgroundColor: '#922B3E',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrowText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  monthTitleContainer: {
    alignItems: 'center',
  },
  monthTitleKn: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  yearTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  // Week Strip
  weekStripContainer: {
    marginTop: -12,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  weekStripContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  dayPill: {
    width: 52,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#F8F4ED',
    alignItems: 'center',
  },
  dayPillSelected: {
    backgroundColor: '#D4AF37',
  },
  dayPillToday: {
    borderWidth: 2,
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E8',
  },
  dayPillWeekday: {
    fontSize: 11,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  dayPillNumber: {
    fontSize: 18,
    color: '#3A2A1E',
    fontWeight: '700',
    marginTop: 4,
  },
  dayPillNumberToday: {
    color: '#D4AF37',
  },
  dayPillTextSelected: {
    color: '#FFFFFF',
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#922B3E',
    marginTop: 6,
  },
  eventIndicatorSelected: {
    backgroundColor: '#FFFFFF',
  },
  // Filter Chips
  filterChipsContainer: {
    marginTop: 16,
  },
  filterChipsContent: {
    paddingHorizontal: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F8F4ED',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  filterChipActive: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  filterChipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 13,
    color: '#6B5344',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  // Selected Date Banner
  selectedDateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFF9E8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  selectedDateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedDateDay: {
    fontSize: 42,
    fontWeight: '800',
    color: '#922B3E',
    marginRight: 12,
  },
  selectedDateInfo: {},
  selectedDateWeekday: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A2A1E',
  },
  selectedDateSamvatsara: {
    fontSize: 12,
    color: '#6B5344',
    marginTop: 2,
  },
  sunriseSunset: {
    alignItems: 'flex-end',
  },
  sunTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sunIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  sunTime: {
    fontSize: 13,
    color: '#4A3728',
    fontWeight: '500',
  },
  // Panchanga Cards
  panchangaCardsContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  panchangaSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A1E',
    marginBottom: 12,
  },
  panchangaCardsGrid: {
    gap: 8,
  },
  panchangaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  panchangaCardHighlight: {
    backgroundColor: '#FFF9E8',
    borderColor: '#D4AF37',
  },
  panchangaCardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  panchangaCardContent: {
    flex: 1,
  },
  panchangaCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A2A1E',
  },
  panchangaCardLabelEn: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  panchangaCardValue: {
    fontSize: 14,
    color: '#6B5344',
    fontWeight: '500',
  },
  panchangaCardValueHighlight: {
    color: '#922B3E',
    fontWeight: '700',
  },
  // Events Section
  eventsSection: {
    marginTop: 24,
    paddingHorizontal: 12,
  },
  eventsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3A2A1E',
    marginBottom: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  eventTypeBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventTypeText: {
    fontSize: 20,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A2A1E',
  },
  eventTitleKannada: {
    fontSize: 12,
    color: '#6B5344',
    marginTop: 2,
  },
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventLocationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  eventLocation: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  eventArrow: {
    fontSize: 20,
    color: '#D4AF37',
    marginLeft: 8,
  },
  // No Events
  noEventsContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 32,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  noEventsEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  noEventsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A2A1E',
  },
  noEventsSubtext: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
});

export default PanchangaCalendar;
