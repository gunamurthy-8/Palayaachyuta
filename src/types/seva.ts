// Seva and Booking Types

export interface Seva {
  id: string;
  name: string;
  nameKannada: string;
  price: number;
  description?: string;
  descriptionKannada?: string;
  category: 'daily' | 'special' | 'festival' | 'paryaya';
  isParyayaOnly?: boolean;
  isActive: boolean;
}

export interface Rashi {
  id: string;
  name: string;
  nameKannada: string;
}

export interface Nakshatra {
  id: string;
  name: string;
  nameKannada: string;
}

export interface Gothra {
  id: string;
  name: string;
  nameKannada: string;
}

export interface DevoteeDetails {
  dateOfSeva: Date;
  phoneNumber: string;
  devoteeName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  rashi?: string;
  nakshatra?: string;
  gothra?: string;
  paymentMode: 'online' | 'upi' | 'card' | 'netbanking';
  collectPrasadam: 'personal' | 'post';
  postalAddress?: string;
  sameAsAddress: boolean;
  consentToStore: boolean;
}

export interface SevaBooking {
  id: string;
  sevas: Seva[];
  devoteeDetails: DevoteeDetails;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'success' | 'failed';
  transactionId?: string;
  createdAt: Date;
  referenceNumber: string;
}

export interface RoomBookingRequest {
  id: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfRooms: number;
  numberOfPersons: number;
  devoteeName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  purpose: string;
  specialRequirements?: string;
  consentToStore: boolean;
  status: 'pending' | 'confirmed' | 'rejected';
  referenceNumber: string;
  createdAt: Date;
}

// Gallery Types
export interface GalleryAlbum {
  id: string;
  title: string;
  titleKannada?: string;
  description?: string;
  coverImage: string;
  eventDate?: Date;
  category: 'event' | 'festival' | 'puja' | 'visit' | 'other';
  mediaCount: number;
  isPublished: boolean;
  createdAt: Date;
}

export interface GalleryMedia {
  id: string;
  albumId: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  captionKannada?: string;
  createdAt: Date;
}

// Artefacts Types
export interface Artefact {
  id: string;
  title: string;
  titleKannada?: string;
  description?: string;
  descriptionKannada?: string;
  type: 'text' | 'pdf' | 'audio' | 'video';
  category: 'pravachana' | 'publications' | 'reference' | 'stotra' | 'other';
  fileUrl: string;
  thumbnailUrl?: string;
  duration?: number; // For audio/video in seconds
  fileSize?: number; // In bytes
  author?: string;
  publishedDate?: Date;
  tags?: string[];
  isPublished: boolean;
  createdAt: Date;
}

export interface ArtefactCategory {
  id: string;
  name: string;
  nameKannada: string;
  icon: string;
  count: number;
}
