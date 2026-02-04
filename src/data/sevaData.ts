// Seva, Booking, Gallery, and Artefacts Mock Data

import type { 
  Seva, 
  Rashi, 
  Nakshatra, 
  Gothra, 
  GalleryAlbum, 
  GalleryMedia,
  Artefact,
  ArtefactCategory 
} from '@/types/seva';

// Sevas available at Sode Matha
export const sevasList: Seva[] = [
  {
    id: 'seva-1',
    name: 'One Day Complete Seva (With Annadana)',
    nameKannada: 'ಒಂದು ದಿನದ ಸಂಪೂರ್ಣ ಸೇವೆ (ಅನ್ನದಾನ ಸಹಿತ)',
    price: 5001,
    description: 'Complete daily seva including all pujas and annadana (food distribution)',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-2',
    name: 'Maha Sarvaseva (With Night Special Bhootaraja Puja)',
    nameKannada: 'ಮಹಾ ಸರ್ವಸೇವಾ (ರಾತ್ರಿ ವಿಶೇಷ ಭೂತರಾಜರ ಪೂಜಾ ಸಹಿತ)',
    price: 1500,
    description: 'Special seva including night puja to Sri Bhootaraja',
    category: 'special',
    isActive: true,
  },
  {
    id: 'seva-3',
    name: 'Tulasi Archane',
    nameKannada: 'ತುಳಸಿ ಅರ್ಚನೆ (ಶ್ರೀ ತ್ರಿವಿಕ್ರಮ ದೇವರಿಗೆ)',
    price: 101,
    description: 'Tulasi archana to Sri Trivikrama',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-4',
    name: 'Abhisheka Seva',
    nameKannada: 'ಅಭಿಷೇಕ ಸೇವೆ',
    price: 501,
    description: 'Abhisheka (sacred bathing) seva for the deity',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-5',
    name: 'Pushpa Archana',
    nameKannada: 'ಪುಷ್ಪ ಅರ್ಚನೆ',
    price: 251,
    description: 'Flower offering archana',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-6',
    name: 'Kumkumarchane',
    nameKannada: 'ಕುಂಕುಮಾರ್ಚನೆ',
    price: 351,
    description: 'Kumkum archana seva',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-7',
    name: 'Vadirajara Aradhana Seva',
    nameKannada: 'ವಾದಿರಾಜರ ಆರಾಧನಾ ಸೇವೆ',
    price: 2001,
    description: 'Special seva during Sri Vadirajara Aradhana festival',
    category: 'festival',
    isActive: true,
  },
  {
    id: 'seva-8',
    name: 'Anna Santarpane',
    nameKannada: 'ಅನ್ನ ಸಂತರ್ಪಣೆ',
    price: 5001,
    description: 'Sponsoring food for devotees',
    category: 'daily',
    isActive: true,
  },
  {
    id: 'seva-9',
    name: 'Deepotsava Seva',
    nameKannada: 'ದೀಪೋತ್ಸವ ಸೇವೆ',
    price: 1001,
    description: 'Lamp lighting festival seva',
    category: 'festival',
    isActive: true,
  },
  {
    id: 'seva-10',
    name: 'Paryaya Special Seva',
    nameKannada: 'ಪರ್ಯಾಯ ವಿಶೇಷ ಸೇವೆ',
    price: 10001,
    description: 'Special seva during Paryaya period in Udupi',
    category: 'paryaya',
    isParyayaOnly: true,
    isActive: false, // Activated only during Paryaya
  },
  {
    id: 'seva-11',
    name: 'Paryaya Annadana',
    nameKannada: 'ಪರ್ಯಾಯ ಅನ್ನದಾನ',
    price: 25001,
    description: 'Annadana sponsorship during Paryaya',
    category: 'paryaya',
    isParyayaOnly: true,
    isActive: false,
  },
];

// Rashi (Zodiac Signs)
export const rashiList: Rashi[] = [
  { id: 'mesha', name: 'Mesha (Aries)', nameKannada: 'ಮೇಷ' },
  { id: 'vrishabha', name: 'Vrishabha (Taurus)', nameKannada: 'ವೃಷಭ' },
  { id: 'mithuna', name: 'Mithuna (Gemini)', nameKannada: 'ಮಿಥುನ' },
  { id: 'karkataka', name: 'Karkataka (Cancer)', nameKannada: 'ಕರ್ಕಾಟಕ' },
  { id: 'simha', name: 'Simha (Leo)', nameKannada: 'ಸಿಂಹ' },
  { id: 'kanya', name: 'Kanya (Virgo)', nameKannada: 'ಕನ್ಯಾ' },
  { id: 'tula', name: 'Tula (Libra)', nameKannada: 'ತುಲಾ' },
  { id: 'vrischika', name: 'Vrischika (Scorpio)', nameKannada: 'ವೃಶ್ಚಿಕ' },
  { id: 'dhanu', name: 'Dhanu (Sagittarius)', nameKannada: 'ಧನು' },
  { id: 'makara', name: 'Makara (Capricorn)', nameKannada: 'ಮಕರ' },
  { id: 'kumbha', name: 'Kumbha (Aquarius)', nameKannada: 'ಕುಂಭ' },
  { id: 'meena', name: 'Meena (Pisces)', nameKannada: 'ಮೀನ' },
];

// Nakshatras (27 Stars)
export const nakshatraList: Nakshatra[] = [
  { id: 'ashwini', name: 'Ashwini', nameKannada: 'ಅಶ್ವಿನಿ' },
  { id: 'bharani', name: 'Bharani', nameKannada: 'ಭರಣಿ' },
  { id: 'krittika', name: 'Krittika', nameKannada: 'ಕೃತ್ತಿಕಾ' },
  { id: 'rohini', name: 'Rohini', nameKannada: 'ರೋಹಿಣಿ' },
  { id: 'mrigashira', name: 'Mrigashira', nameKannada: 'ಮೃಗಶಿರಾ' },
  { id: 'ardra', name: 'Ardra', nameKannada: 'ಆರ್ದ್ರಾ' },
  { id: 'punarvasu', name: 'Punarvasu', nameKannada: 'ಪುನರ್ವಸು' },
  { id: 'pushya', name: 'Pushya', nameKannada: 'ಪುಷ್ಯ' },
  { id: 'ashlesha', name: 'Ashlesha', nameKannada: 'ಆಶ್ಲೇಷಾ' },
  { id: 'magha', name: 'Magha', nameKannada: 'ಮಘಾ' },
  { id: 'purva-phalguni', name: 'Purva Phalguni', nameKannada: 'ಪೂರ್ವ ಫಲ್ಗುಣಿ' },
  { id: 'uttara-phalguni', name: 'Uttara Phalguni', nameKannada: 'ಉತ್ತರ ಫಲ್ಗುಣಿ' },
  { id: 'hasta', name: 'Hasta', nameKannada: 'ಹಸ್ತಾ' },
  { id: 'chitra', name: 'Chitra', nameKannada: 'ಚಿತ್ರಾ' },
  { id: 'swati', name: 'Swati', nameKannada: 'ಸ್ವಾತಿ' },
  { id: 'vishakha', name: 'Vishakha', nameKannada: 'ವಿಶಾಖಾ' },
  { id: 'anuradha', name: 'Anuradha', nameKannada: 'ಅನುರಾಧಾ' },
  { id: 'jyeshtha', name: 'Jyeshtha', nameKannada: 'ಜ್ಯೇಷ್ಠಾ' },
  { id: 'moola', name: 'Moola', nameKannada: 'ಮೂಲಾ' },
  { id: 'purva-ashadha', name: 'Purva Ashadha', nameKannada: 'ಪೂರ್ವಾಷಾಢಾ' },
  { id: 'uttara-ashadha', name: 'Uttara Ashadha', nameKannada: 'ಉತ್ತರಾಷಾಢಾ' },
  { id: 'shravana', name: 'Shravana', nameKannada: 'ಶ್ರಾವಣ' },
  { id: 'dhanishta', name: 'Dhanishta', nameKannada: 'ಧನಿಷ್ಠಾ' },
  { id: 'shatabhisha', name: 'Shatabhisha', nameKannada: 'ಶತಭಿಷಾ' },
  { id: 'purva-bhadrapada', name: 'Purva Bhadrapada', nameKannada: 'ಪೂರ್ವಾಭಾದ್ರಪದ' },
  { id: 'uttara-bhadrapada', name: 'Uttara Bhadrapada', nameKannada: 'ಉತ್ತರಾಭಾದ್ರಪದ' },
  { id: 'revati', name: 'Revati', nameKannada: 'ರೇವತಿ' },
];

// Gothras
export const gothraList: Gothra[] = [
  { id: 'angirasa', name: 'Angirasa', nameKannada: 'ಆಂಗೀರಸ' },
  { id: 'atri', name: 'Atri', nameKannada: 'ಅತ್ರಿ' },
  { id: 'bharadvaja', name: 'Bharadvaja', nameKannada: 'ಭಾರದ್ವಾಜ' },
  { id: 'gautama', name: 'Gautama', nameKannada: 'ಗೌತಮ' },
  { id: 'jamadagni', name: 'Jamadagni', nameKannada: 'ಜಮದಗ್ನಿ' },
  { id: 'kashyapa', name: 'Kashyapa', nameKannada: 'ಕಾಶ್ಯಪ' },
  { id: 'kaundinya', name: 'Kaundinya', nameKannada: 'ಕೌಂಡಿನ್ಯ' },
  { id: 'kaushika', name: 'Kaushika', nameKannada: 'ಕೌಶಿಕ' },
  { id: 'mudgala', name: 'Mudgala', nameKannada: 'ಮುದ್ಗಲ' },
  { id: 'sandilya', name: 'Sandilya', nameKannada: 'ಶಾಂಡಿಲ್ಯ' },
  { id: 'srivatsa', name: 'Srivatsa', nameKannada: 'ಶ್ರೀವತ್ಸ' },
  { id: 'vasishtha', name: 'Vasishtha', nameKannada: 'ವಸಿಷ್ಠ' },
  { id: 'vishwamitra', name: 'Vishwamitra', nameKannada: 'ವಿಶ್ವಾಮಿತ್ರ' },
  { id: 'other', name: 'Other', nameKannada: 'ಇತರ' },
];

// Indian States
export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
];

// Gallery Albums Mock Data
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'album-1',
    title: 'Vadirajara Aradhana 2025',
    titleKannada: 'ವಾದಿರಾಜರ ಆರಾಧನೆ ೨೦೨೫',
    description: 'Annual aradhana celebrations of Sri Vadirajatirtha',
    coverImage: 'https://via.placeholder.com/400x300',
    eventDate: new Date('2025-02-15'),
    category: 'festival',
    mediaCount: 45,
    isPublished: true,
    createdAt: new Date('2025-02-16'),
  },
  {
    id: 'album-2',
    title: 'Deepavali Celebrations 2025',
    titleKannada: 'ದೀಪಾವಳಿ ಆಚರಣೆ ೨೦೨೫',
    description: 'Deepavali celebrations at Sode Matha',
    coverImage: 'https://via.placeholder.com/400x300',
    eventDate: new Date('2025-10-20'),
    category: 'festival',
    mediaCount: 32,
    isPublished: true,
    createdAt: new Date('2025-10-21'),
  },
  {
    id: 'album-3',
    title: 'Swamiji\'s Visit to Bangalore',
    titleKannada: 'ಸ್ವಾಮೀಜಿಯ ಬೆಂಗಳೂರು ಭೇಟಿ',
    description: 'His Holiness Sri Vishwavallabha Tirtha\'s visit to Bangalore',
    coverImage: 'https://via.placeholder.com/400x300',
    eventDate: new Date('2025-11-05'),
    category: 'visit',
    mediaCount: 28,
    isPublished: true,
    createdAt: new Date('2025-11-06'),
  },
  {
    id: 'album-4',
    title: 'Navaratri Utsava 2025',
    titleKannada: 'ನವರಾತ್ರಿ ಉತ್ಸವ ೨೦೨೫',
    description: 'Nine nights of divine celebrations',
    coverImage: 'https://via.placeholder.com/400x300',
    eventDate: new Date('2025-10-01'),
    category: 'festival',
    mediaCount: 65,
    isPublished: true,
    createdAt: new Date('2025-10-10'),
  },
];

// Gallery Media Mock Data
export const galleryMedia: GalleryMedia[] = [
  {
    id: 'media-1',
    albumId: 'album-1',
    type: 'photo',
    url: 'https://via.placeholder.com/800x600',
    caption: 'Main Puja at Vrindavana',
    createdAt: new Date('2025-02-15'),
  },
  {
    id: 'media-2',
    albumId: 'album-1',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://via.placeholder.com/400x300',
    caption: 'Aradhana Procession',
    createdAt: new Date('2025-02-15'),
  },
];

// Artefact Categories
export const artefactCategories: ArtefactCategory[] = [
  { id: 'pravachana', name: 'Pravachana', nameKannada: 'ಪ್ರವಚನ', icon: '🎙️', count: 156 },
  { id: 'publications', name: 'Publications', nameKannada: 'ಪ್ರಕಟಣೆಗಳು', icon: '📚', count: 42 },
  { id: 'reference', name: 'Reference Materials', nameKannada: 'ಉಲ್ಲೇಖ ಸಾಮಗ್ರಿ', icon: '📖', count: 28 },
  { id: 'stotra', name: 'Stotras', nameKannada: 'ಸ್ತೋತ್ರಗಳು', icon: '🕉️', count: 85 },
  { id: 'other', name: 'Others', nameKannada: 'ಇತರ', icon: '📁', count: 15 },
];

// Artefacts Mock Data
export const artefactsList: Artefact[] = [
  {
    id: 'artefact-1',
    title: 'Sri Vadirajara Charitra',
    titleKannada: 'ಶ್ರೀ ವಾದಿರಾಜರ ಚರಿತ್ರೆ',
    description: 'Life history of Sri Vadirajatirtha',
    type: 'pdf',
    category: 'publications',
    fileUrl: 'https://example.com/vadirajara-charitra.pdf',
    author: 'Sri Vishwavallabha Tirtha',
    isPublished: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'artefact-2',
    title: 'Dasara Pravachana 2024',
    titleKannada: 'ದಸರಾ ಪ್ರವಚನ ೨೦೨೪',
    description: 'Pravachana during Dasara celebrations',
    type: 'audio',
    category: 'pravachana',
    fileUrl: 'https://example.com/dasara-pravachana.mp3',
    duration: 3600,
    author: 'Sri Vishwavallabha Tirtha',
    isPublished: true,
    createdAt: new Date('2024-10-15'),
  },
  {
    id: 'artefact-3',
    title: 'Hayagriva Stotra',
    titleKannada: 'ಹಯಗ್ರೀವ ಸ್ತೋತ್ರ',
    description: 'Sacred hymn to Lord Hayagriva by Sri Vadirajatirtha',
    type: 'text',
    category: 'stotra',
    fileUrl: 'https://example.com/hayagriva-stotra.txt',
    author: 'Sri Vadirajatirtha',
    isPublished: true,
    createdAt: new Date('2023-05-10'),
  },
];

// Cancellation & Refund Policy
export const cancellationPolicy = {
  title: 'Cancellation & Refund Policy',
  titleKannada: 'ರದ್ದತಿ ಮತ್ತು ಮರುಪಾವತಿ ನೀತಿ',
  lastUpdated: new Date('2024-01-01'),
  sections: [
    {
      heading: 'Cancellation Policy',
      content: `1. Seva bookings can be cancelled up to 48 hours before the scheduled date.
2. Cancellation requests must be made through the official email (office@sodematha.in) or phone (+91 9483357005).
3. Cancellation requests received within 48 hours of the seva date will not be entertained.`,
    },
    {
      heading: 'Refund Policy',
      content: `1. Refunds will be processed within 7-10 business days of cancellation approval.
2. A processing fee of 5% will be deducted from the refund amount.
3. Refunds will be credited to the original payment method.
4. For cancelled sevas, prasadam delivery charges (if paid) will be refunded in full.`,
    },
    {
      heading: 'Non-Refundable Cases',
      content: `1. Sevas performed as per schedule are non-refundable.
2. Special festival sevas and Paryaya sevas are non-refundable once confirmed.
3. Administrative charges are non-refundable.`,
    },
    {
      heading: 'Contact for Queries',
      content: `For any queries regarding cancellation or refunds, please contact:
Email: office@sodematha.in
Phone: +91 9483357005`,
    },
  ],
};

// Generate Reference Number
export const generateReferenceNumber = (prefix: string = 'SVS'): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
