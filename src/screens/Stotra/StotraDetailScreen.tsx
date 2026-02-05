import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Stotra, StotraLanguage } from '@/types';
import { downloadManager } from '@/services/downloadManager';

const { width } = Dimensions.get('window');

export const StotraDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const stotra: Stotra = route.params?.stotra;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2849); // 47:29 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLooping, setIsLooping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<StotraLanguage>('kannada');
  const [textSize, setTextSize] = useState(16); // Font size for verses
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  // Check if audio is bundled or cloud-based
  const isBundledAudio = stotra.audioUrl.startsWith('bundled://');
  const [isDownloaded, setIsDownloaded] = useState(stotra.isDownloaded || isBundledAudio);

  useEffect(() => {
    checkDownloadStatus();
  }, []);

  const checkDownloadStatus = async () => {
    // Only check download status for cloud audio
    if (!isBundledAudio) {
      const downloaded = await downloadManager.isDownloaded(stotra.id);
      setIsDownloaded(downloaded);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleNext = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  const changeSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const increaseTextSize = () => {
    setTextSize((prev) => Math.min(prev + 2, 24)); // Max 24px
  };

  const decreaseTextSize = () => {
    setTextSize((prev) => Math.max(prev - 2, 12)); // Min 12px
  };

  const handleDownload = async () => {
    // Don't download if it's bundled audio or already downloaded
    if (isBundledAudio || isDownloaded) {
      return;
    }

    try {
      setIsDownloading(true);
      await downloadManager.downloadStotra(stotra.id, (progress) => {
        setDownloadProgress(progress);
      });
      setIsDownloaded(true);
      Alert.alert('Success', 'Audio downloaded successfully for offline playback');
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download audio. Please try again.');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleDelete = async () => {
    // Can't delete bundled audio
    if (isBundledAudio) {
      Alert.alert('Info', 'Cannot delete bundled audio files');
      return;
    }

    Alert.alert(
      'Delete Stotra',
      'Are you sure you want to delete this downloaded stotra?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await downloadManager.deleteStotra(stotra.id);
              setIsDownloaded(false);
              Alert.alert('Success', 'Stotra deleted successfully');
            } catch (error) {
              console.error('Delete failed:', error);
              Alert.alert('Error', 'Failed to delete stotra');
            }
          },
        },
      ],
    );
  };

  const getVerseText = (verse: any) => {
    switch (selectedLanguage) {
      case 'kannada':
        return verse.kannada;
      case 'english':
        return verse.english;
      case 'sanskrit':
        return verse.sanskrit;
      default:
        return verse.kannada;
    }
  };

  // Simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) {
              return 0;
            }
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, playbackSpeed, isLooping]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEF7" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{stotra.title}</Text>
        {!isBundledAudio && (
          <View>
            {!isDownloaded && !isDownloading && (
              <TouchableOpacity style={styles.downloadHeaderButton} onPress={handleDownload}>
                <Text style={styles.downloadHeaderIcon}>☁️</Text>
              </TouchableOpacity>
            )}
            {isDownloading && (
              <View style={styles.downloadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.downloadProgressText}>{Math.round(downloadProgress)}%</Text>
              </View>
            )}
            {isDownloaded && (
              <TouchableOpacity style={styles.deleteHeaderButton} onPress={handleDelete}>
                <Text style={styles.deleteHeaderIcon}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Language Selector */}
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'kannada' && styles.languageButtonActive,
          ]}
          onPress={() => setSelectedLanguage('kannada')}
        >
          <Text
            style={[
              styles.languageText,
              selectedLanguage === 'kannada' && styles.languageTextActive,
            ]}
          >
            ಕನ್ನಡ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'english' && styles.languageButtonActive,
          ]}
          onPress={() => setSelectedLanguage('english')}
        >
          <Text
            style={[
              styles.languageText,
              selectedLanguage === 'english' && styles.languageTextActive,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'sanskrit' && styles.languageButtonActive,
          ]}
          onPress={() => setSelectedLanguage('sanskrit')}
        >
          <Text
            style={[
              styles.languageText,
              selectedLanguage === 'sanskrit' && styles.languageTextActive,
            ]}
          >
            संस्कृत
          </Text>
        </TouchableOpacity>
      </View>

      {/* Player Controls */}
      <View style={styles.playerContainer}>
        <View style={styles.controlsTop}>
          <TouchableOpacity onPress={handlePrevious}>
            <Text style={styles.controlIcon}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.controlIcon}>⏭</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoop}>
            <Text style={[styles.controlIcon, isLooping && styles.activeControl]}>🔁</Text>
          </TouchableOpacity>
          {!isBundledAudio && !isDownloaded && !isDownloading && (
            <TouchableOpacity onPress={handleDownload}>
              <Text style={styles.controlIcon}>☁️</Text>
            </TouchableOpacity>
          )}
          {isDownloading && (
            <ActivityIndicator size="small" color="#922B3E" />
          )}
          <View style={styles.textSizeControls}>
            <TouchableOpacity onPress={decreaseTextSize} style={styles.textSizeButton}>
              <Text style={styles.textSizeIcon}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={increaseTextSize} style={styles.textSizeButton}>
              <Text style={styles.textSizeIcon}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <TouchableOpacity style={styles.speedButton} onPress={changeSpeed}>
            <Text style={styles.speedText}>{playbackSpeed.toFixed(1)}</Text>
          </TouchableOpacity>
          <View style={styles.progressWrapper}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentTime / duration) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>

      {/* Stotra Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {stotra.verses.map((verse) => (
            <View key={verse.number} style={styles.verseContainer}>
              <Text style={[styles.verseText, { fontSize: textSize }]}>{getVerseText(verse)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>श्री वदिराज गुरु पादुकाभ्यां नमः</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    backgroundColor: '#FFFEF7',
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D0',
  },
  backIcon: {
    fontSize: 28,
    color: '#3A2A1E',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2A1E',
    flex: 1,
  },
  downloadHeaderButton: {
    padding: 8,
  },
  downloadHeaderIcon: {
    fontSize: 22,
    color: '#922B3E',
  },
  deleteHeaderButton: {
    padding: 8,
  },
  deleteHeaderIcon: {
    fontSize: 20,
    color: '#922B3E',
  },
  downloadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  downloadProgressText: {
    fontSize: 12,
    color: '#922B3E',
    fontWeight: '600',
  },
  textSizeControls: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
  },
  textSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFF9E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  textSizeIcon: {
    fontSize: 14,
    color: '#6B5344',
    fontWeight: '700',
  },
  languageContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D0',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  languageButtonActive: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B5344',
  },
  languageTextActive: {
    color: '#FFFFFF',
  },
  playerContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  controlsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 16,
  },
  controlIcon: {
    fontSize: 28,
    color: '#6B5344',
  },
  playIcon: {
    fontSize: 36,
    color: '#922B3E',
  },
  activeControl: {
    color: '#922B3E',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  speedButton: {
    width: 50,
    height: 32,
    backgroundColor: '#FFF9E8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E0D0',
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B5344',
  },
  progressWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#8B7355',
    minWidth: 40,
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F0EDE5',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#922B3E',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  verseContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE5',
  },
  verseText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#3A2A1E',
    fontWeight: '400',
  },
  footer: {
    backgroundColor: '#FFF9E8',
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E8E0D0',
  },
  footerText: {
    fontSize: 13,
    color: '#8B7355',
    fontWeight: '500',
  },
});
