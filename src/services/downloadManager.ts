import RNFS from 'react-native-fs';
import { storage as mmkvStorage } from '@/App';
import { stotraService } from './stotraService';

/**
 * Service for downloading and caching stotra audio files
 */
class DownloadManager {
  private downloadPath = `${RNFS.DocumentDirectoryPath}/stotras`;
  private downloadProgressCallbacks: Map<string, (progress: number) => void> = new Map();

  constructor() {
    this.initializeDownloadDirectory();
  }

  /**
   * Initialize download directory
   */
  private async initializeDownloadDirectory() {
    try {
      const exists = await RNFS.exists(this.downloadPath);
      if (!exists) {
        await RNFS.mkdir(this.downloadPath);
      }
    } catch (error) {
      console.error('Error creating download directory:', error);
    }
  }

  /**
   * Download stotra audio file
   * @param stotraId - Stotra ID
   * @param onProgress - Progress callback (0-100)
   * @returns Local file path
   */
  async downloadStotra(
    stotraId: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      // Get download URL from Firebase
      const downloadUrl = await stotraService.getAudioDownloadUrl(stotraId);
      const localPath = `${this.downloadPath}/${stotraId}.mp3`;

      // Check if already downloaded
      const exists = await RNFS.exists(localPath);
      if (exists) {
        return localPath;
      }

      // Start download
      const download = RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: localPath,
        progress: (res) => {
          const progress = Math.floor((res.bytesWritten / res.contentLength) * 100);
          onProgress?.(progress);
          
          // Notify registered callbacks
          const callback = this.downloadProgressCallbacks.get(stotraId);
          callback?.(progress);
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        // Mark as downloaded in MMKV
        this.markAsDownloaded(stotraId, localPath);
        return localPath;
      } else {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Error downloading stotra:', error);
      throw new Error('Failed to download stotra');
    }
  }

  /**
   * Register progress callback for a download
   * @param stotraId - Stotra ID
   * @param callback - Progress callback
   */
  registerProgressCallback(
    stotraId: string,
    callback: (progress: number) => void
  ) {
    this.downloadProgressCallbacks.set(stotraId, callback);
  }

  /**
   * Unregister progress callback
   * @param stotraId - Stotra ID
   */
  unregisterProgressCallback(stotraId: string) {
    this.downloadProgressCallbacks.delete(stotraId);
  }

  /**
   * Check if stotra is downloaded
   * @param stotraId - Stotra ID
   * @returns True if downloaded
   */
  async isDownloaded(stotraId: string): Promise<boolean> {
    const downloadInfo = mmkvStorage.getString(`stotra_${stotraId}`);
    if (!downloadInfo) return false;

    const { localPath } = JSON.parse(downloadInfo);
    return await RNFS.exists(localPath);
  }

  /**
   * Get local path for downloaded stotra
   * @param stotraId - Stotra ID
   * @returns Local file path or null
   */
  getLocalPath(stotraId: string): string | null {
    const downloadInfo = mmkvStorage.getString(`stotra_${stotraId}`);
    if (!downloadInfo) return null;

    const { localPath } = JSON.parse(downloadInfo);
    return localPath;
  }

  /**
   * Mark stotra as downloaded in storage
   * @param stotraId - Stotra ID
   * @param localPath - Local file path
   */
  private markAsDownloaded(stotraId: string, localPath: string) {
    mmkvStorage.set(
      `stotra_${stotraId}`,
      JSON.stringify({
        localPath,
        downloadedAt: Date.now(),
      })
    );
  }

  /**
   * Delete downloaded stotra
   * @param stotraId - Stotra ID
   */
  async deleteStotra(stotraId: string): Promise<void> {
    try {
      const localPath = this.getLocalPath(stotraId);
      if (localPath) {
        const exists = await RNFS.exists(localPath);
        if (exists) {
          await RNFS.unlink(localPath);
        }
        mmkvStorage.delete(`stotra_${stotraId}`);
      }
    } catch (error) {
      console.error('Error deleting stotra:', error);
      throw new Error('Failed to delete stotra');
    }
  }

  /**
   * Get total size of downloaded stotras
   * @returns Size in bytes
   */
  async getTotalDownloadedSize(): Promise<number> {
    try {
      const files = await RNFS.readDir(this.downloadPath);
      return files.reduce((total, file) => total + file.size, 0);
    } catch (error) {
      console.error('Error getting download size:', error);
      return 0;
    }
  }

  /**
   * Clear all downloads
   */
  async clearAllDownloads(): Promise<void> {
    try {
      const exists = await RNFS.exists(this.downloadPath);
      if (exists) {
        await RNFS.unlink(this.downloadPath);
        await RNFS.mkdir(this.downloadPath);
      }

      // Clear MMKV entries
      const keys = mmkvStorage.getAllKeys();
      keys.forEach(key => {
        if (key.startsWith('stotra_')) {
          mmkvStorage.delete(key);
        }
      });
    } catch (error) {
      console.error('Error clearing downloads:', error);
      throw new Error('Failed to clear downloads');
    }
  }
}

export const downloadManager = new DownloadManager();
