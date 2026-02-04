// Mock data for development - will be replaced with Firebase data

import type { CalendarEvent, DarshanTiming, FlashUpdate, NewsArticle, PanchangaData, SocialMediaLink } from '@/types';

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Sri Vishwavallabha Theertha Swamiji Ashirvachana',
    summary: 'Special pravachana on Madhwa philosophy during the upcoming Chaturmasa',
    imageUrl: 'https://via.placeholder.com/300x200',
    createdAt: new Date('2026-02-01'),
  },
  {
    id: '2',
    title: 'Upcoming Rathotsava at Sode',
    summary: 'Annual Rathotsava celebrations to be held with grandeur this year',
    imageUrl: 'https://via.placeholder.com/300x200',
    createdAt: new Date('2026-02-02'),
  },
  {
    id: '3',
    title: 'New Pathashala Inaugurated',
    summary: 'Sri Swamiji inaugurates new Vedic Pathashala for young students',
    imageUrl: 'https://via.placeholder.com/300x200',
    createdAt: new Date('2026-02-03'),
  },
  {
    id: '4',
    title: 'Annadana Seva Program',
    summary: 'Daily Annadana program serving thousands of devotees',
    imageUrl: 'https://via.placeholder.com/300x200',
    createdAt: new Date('2026-02-03'),
  },
  {
    id: '5',
    title: 'Madhwa Navami Celebrations',
    summary: 'Grand celebrations planned for Sri Madhwacharya Jayanti',
    imageUrl: 'https://via.placeholder.com/300x200',
    createdAt: new Date('2026-02-04'),
  },
];

export const mockFlashUpdates: FlashUpdate[] = [
  {
    id: '1',
    message: '🪔 Sri Vishwothama Teertharu Aradhana - March 15th',
    type: 'aradhana',
    createdAt: new Date('2026-02-04'),
  },
  {
    id: '2',
    message: '🎉 Maha Shivaratri celebrations on February 26th',
    type: 'festival',
    createdAt: new Date('2026-02-04'),
  },
  {
    id: '3',
    message: '📢 Special Pravachana series starting from Feb 10th',
    type: 'announcement',
    createdAt: new Date('2026-02-04'),
  },
  {
    id: '4',
    message: '🛕 Vasanthotsava at Sode Matha - Feb 20th to 25th',
    type: 'utsava',
    createdAt: new Date('2026-02-03'),
  },
];

export const mockDarshanTimings: DarshanTiming[] = [
  {
    location: 'Sode',
    darshanTime: '5:00 a.m. to 8:30 a.m.',
    prasadaTime: 'Noon 11:30 a.m.',
  },
  {
    location: 'Bangalore (Rajajinagar)',
    darshanTime: '7:00 a.m. to 12:00 p.m.',
    prasadaTime: '12:30 p.m.',
  },
];

export const mockSocialMediaLinks: SocialMediaLink[] = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/sodematha',
    handle: '@sodematha',
  },
  {
    platform: 'facebook',
    url: 'https://facebook.com/sodematha',
    handle: '@sodematha',
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/@sodematha',
    handle: '@sodematha',
  },
  {
    platform: 'whatsapp',
    url: 'https://whatsapp.com/channel/sodematha',
    handle: 'WhatsApp Channel',
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Ekadashi',
    titleKannada: 'ಏಕಾದಶಿ',
    date: new Date('2026-02-13'),
    type: 'ekadashi',
    description: 'Jaya Ekadashi',
  },
  {
    id: '2',
    title: 'Maha Shivaratri',
    titleKannada: 'ಮಹಾ ಶಿವರಾತ್ರಿ',
    date: new Date('2026-02-26'),
    type: 'habba',
    description: 'Maha Shivaratri Festival',
  },
  {
    id: '3',
    title: 'Ekadashi',
    titleKannada: 'ಏಕಾದಶಿ',
    date: new Date('2026-02-27'),
    type: 'ekadashi',
    description: 'Vijaya Ekadashi',
  },
  {
    id: '4',
    title: 'Sri Vishwothama Teertharu Aradhana',
    titleKannada: 'ಶ್ರೀ ವಿಶ್ವೋತ್ತಮ ತೀರ್ಥರು ಆರಾಧನೆ',
    date: new Date('2026-03-15'),
    type: 'aradhana',
    location: 'Sode',
    description: 'Annual Aradhana of Sri Sri Vishwothama Theertha Swamiji',
  },
];

// Mock Panchanga data generator
export const getPanchangaForDate = (date: Date): PanchangaData => {
  // This is mock data - in real app, this would come from a proper Panchanga API/database
  const tithis = [
    'ಪ್ರತಿಪದಾ (1)', 'ದ್ವಿತೀಯಾ (2)', 'ತೃತೀಯಾ (3)', 'ಚತುರ್ಥೀ (4)', 
    'ಪಂಚಮೀ (5)', 'ಷಷ್ಠೀ (6)', 'ಸಪ್ತಮೀ (7)', 'ಅಷ್ಟಮೀ (8)',
    'ನವಮೀ (9)', 'ದಶಮೀ (10)', 'ಏಕಾದಶೀ (11)', 'ದ್ವಾದಶೀ (12)',
    'ತ್ರಯೋದಶೀ (13)', 'ಚತುರ್ದಶೀ (14)', 'ಪೂರ್ಣಿಮಾ/ಅಮಾವಾಸ್ಯಾ (15)'
  ];
  
  const vasaras = ['ಭಾನುವಾಸರಃ', 'ಸೋಮವಾಸರಃ', 'ಮಂಗಳವಾಸರಃ', 'ಬುಧವಾಸರಃ', 'ಗುರುವಾಸರಃ', 'ಶುಕ್ರವಾಸರಃ', 'ಶನಿವಾಸರಃ'];
  const nakshatras = ['ಅಶ್ವಿನಿ', 'ಭರಣಿ', 'ಕೃತ್ತಿಕಾ', 'ರೋಹಿಣಿ', 'ಮೃಗಶಿರಾ'];
  
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const tithiIndex = (dayOfMonth - 1) % 15;
  const paksha = dayOfMonth <= 15 ? 'ಶುಕ್ಲಪಕ್ಷಃ' : 'ಕೃಷ್ಣಪಕ್ಷಃ';
  
  return {
    date,
    ayana: 'ಉತ್ತರಾಯಣಂ',
    rutu: 'ಶಿಶಿರಋತುಃ',
    masa: 'ಮಾಘಮಾಸಃ',
    paksha,
    tithi: tithis[tithiIndex],
    vasar: vasaras[dayOfWeek],
    nakshatra: nakshatras[dayOfMonth % 5],
    yoga: 'ಶುಭ',
    karana: 'ಬವ',
    sunriseTime: '6:58',
    sunsetTime: '6:25',
    samvatsara: 'ವಿಶ್ವಾವಸು ನಾಮ ಸಂವತ್ಸರಃ',
  };
};
