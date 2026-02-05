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

// Stotra types
export type StotraLanguage = 'kannada' | 'english' | 'sanskrit';
export type StotraCategory = 'stotra' | 'song';
export type AudioSource = 'bundled' | 'cloud'; // Audio can be bundled or in cloud

export interface StotraVerse {
  number: number;
  kannada: string;
  english: string;
  sanskrit: string;
}

export interface Stotra {
  id: string;
  title: string;
  titleKannada: string;
  titleSanskrit: string;
  author: string;
  category: StotraCategory;
  subcategory?: string; // e.g., "Lakshmi Stotra", "Hanuman Song"
  duration: string; // Duration in MM:SS format
  audioUrl: string; // 'bundled://filename.mp3' or 'audio/id.mp3' (cloud path)
  verses: StotraVerse[];
  description?: string;
  benefits?: string;
  source: 'local'; // All stotras are bundled with app (text data)
  audioSource?: AudioSource; // Where audio file is stored
  isDownloaded?: boolean; // If cloud audio is downloaded
  downloadProgress?: number; // 0-100 for download progress
  localAudioPath?: string; // Path to downloaded audio file (for cloud audio)
  fileSize?: number; // Size in bytes (for cloud audio)
  featured?: boolean; // Featured/popular stotras
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  isLooping: boolean;
}

export interface DownloadTask {
  stotraId: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  error?: string;
}

export interface SocialMediaLink {
  platform: 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  url: string;
  handle: string;
}
