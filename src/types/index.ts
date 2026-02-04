// Types for the app

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  createdAt: Date;
  content?: string;
}

export interface FlashUpdate {
  id: string;
  message: string;
  type: 'announcement' | 'festival' | 'aradhana' | 'utsava' | 'general';
  link?: string;
  createdAt: Date;
}

export interface DarshanTiming {
  location: string;
  darshanTime: string;
  prasadaTime: string;
}

export interface PanchangaData {
  date: Date;
  ayana: string;
  rutu: string;
  masa: string;
  paksha: string;
  tithi: string;
  vasar: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunriseTime: string;
  sunsetTime: string;
  samvatsara: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleKannada?: string;
  date: Date;
  type: 'aradhana' | 'paryaya' | 'utsava' | 'ekadashi' | 'habba' | 'other';
  location?: string;
  description?: string;
  notificationEnabled?: boolean;
}

export interface SocialMediaLink {
  platform: 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  url: string;
  handle: string;
}
