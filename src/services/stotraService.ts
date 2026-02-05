import storage from '@react-native-firebase/storage';
import { Stotra } from '@/types';
import { stotrasData } from '@/data/stotras';

/**
 * Service for managing stotras
 * NEW ARCHITECTURE: All stotra text/data is bundled with app
 * Only audio files are stored in Firebase Storage (cloud)
 */
class StotraService {
  /**
   * Get all stotras (all bundled locally)
   * @param category - Filter by category (stotra/song)
   * @returns List of all stotras
   */
  async getAllStotras(category?: 'stotra' | 'song'): Promise<Stotra[]> {
    // All stotras are bundled with the app
    let stotras = stotrasData;

    // Filter by category if specified
    if (category) {
      stotras = stotras.filter(s => s.category === category);
    }

    // Sort: featured first, then alphabetically
    return stotras.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });
  }

  /**
   * Search stotras by title, author, or category (local search)
   * @param searchQuery - Search string
   * @returns Matching stotras
   */
  async searchStotras(searchQuery: string): Promise<Stotra[]> {
    const allStotras = await this.getAllStotras();
    const query = searchQuery.toLowerCase();

    return allStotras.filter(
      stotra =>
        stotra.title.toLowerCase().includes(query) ||
        stotra.titleKannada.includes(searchQuery) ||
        stotra.titleSanskrit.includes(searchQuery) ||
        stotra.author.toLowerCase().includes(query) ||
        stotra.subcategory?.toLowerCase().includes(query)
    );
  }

  /**
   * Get stotra by ID (local lookup)
   * @param stotraId - Stotra ID
   * @returns Stotra details
   */
  async getStotraById(stotraId: string): Promise<Stotra | null> {
    const stotra = stotrasData.find(s => s.id === stotraId);
    return stotra || null;
  }

  /**
   * Get audio download URL from Firebase Storage
   * Only for stotras that need cloud audio download
   * @param audioUrl - Audio path (e.g., 'audio/123.mp3')
   * @returns Download URL
   */
  async getAudioDownloadUrl(audioUrl: string): Promise<string> {
    try {
      // If bundled audio, return as-is (handled by audio player)
      if (audioUrl.startsWith('bundled://')) {
        return audioUrl;
      }

      // Get download URL from Firebase Storage
      const reference = storage().ref(audioUrl);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error('Error getting audio URL:', error);
      throw new Error('Failed to get audio URL');
    }
  }
}

export const stotraService = new StotraService();

// Note: To add new stotras, update src/data/stotras.ts and release new app version
// Audio files stored in Firebase Storage at: audio/{stotraId}.mp3
