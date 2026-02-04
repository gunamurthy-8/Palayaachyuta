import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Artefact } from '@/types/seva';

const { width } = Dimensions.get('window');

interface ArtefactDetailScreenProps {
  route: {
    params: {
      artefact: Artefact;
    };
  };
  navigation: any;
}

const ArtefactDetailScreen = ({ route, navigation }: ArtefactDetailScreenProps) => {
  const { artefact } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return 'microphone';
      case 'pdf':
        return 'file-pdf-box';
      case 'text':
        return 'file-document';
      case 'video':
        return 'video';
      default:
        return 'file';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audio':
        return '#922B3E';
      case 'pdf':
        return '#E74C3C';
      case 'text':
        return '#3498DB';
      case 'video':
        return '#9B59B6';
      default:
        return '#7F8C8D';
    }
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await Linking.openURL(artefact.fileUrl);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${artefact.title}" from Sode Vadiraja Matha\n\n${artefact.description}`,
        title: artefact.title,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Publication</Text>
      </View>
      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Icon name="share-variant" size={22} color="#4A3728" />
      </TouchableOpacity>
    </View>
  );

  const renderTypeIcon = () => (
    <View style={[styles.typeIconContainer, { backgroundColor: getTypeColor(artefact.type) }]}>
      <Icon name={getTypeIcon(artefact.type)} size={48} color="#FFF" />
    </View>
  );

  const renderAudioPlayer = () => {
    if (artefact.type !== 'audio') return null;
    
    return (
      <View style={styles.audioPlayer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Icon
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={64}
            color="#922B3E"
          />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '30%' }]} />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>0:00</Text>
            <Text style={styles.timeText}>
              {artefact.duration ? formatDuration(artefact.duration) : '--:--'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTextContent = () => {
    if (artefact.type !== 'text') return null;
    
    return (
      <View style={styles.textContent}>
        <Text style={styles.textContentTitle}>Content Preview</Text>
        <View style={styles.textPreview}>
          <Text style={styles.previewText}>
            ॥ ಶ್ರೀ ಹಯಗ್ರೀವಾಯ ನಮಃ ॥
            {'\n\n'}
            ಜ್ಞಾನಾನಂದಮಯಂ ದೇವಂ ನಿರ್ಮಲ ಸ್ಫಟಿಕಾಕೃತಿಮ್ |
            {'\n'}
            ಆಧಾರಂ ಸರ್ವವಿದ್ಯಾನಾಂ ಹಯಗ್ರೀವಮುಪಾಸ್ಮಹೇ ||
            {'\n\n'}
            (Complete content available in full document)
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTypeIcon()}
        
        <Text style={styles.title}>{artefact.title}</Text>
        <Text style={styles.titleKannada}>{artefact.titleKannada}</Text>
        
        <View style={styles.metaContainer}>
          {artefact.author && (
            <View style={styles.metaItem}>
              <Icon name="account" size={18} color="#D4AF37" />
              <Text style={styles.metaText}>{artefact.author}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <Icon name="calendar" size={18} color="#D4AF37" />
            <Text style={styles.metaText}>{formatDate(artefact.createdAt)}</Text>
          </View>
          {artefact.duration && (
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={18} color="#D4AF37" />
              <Text style={styles.metaText}>{formatDuration(artefact.duration)}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <Icon name="tag" size={18} color="#D4AF37" />
            <Text style={styles.metaText}>{artefact.category}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{artefact.description}</Text>
        </View>

        {renderAudioPlayer()}
        {renderTextContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Icon name="download" size={22} color="#FFF" />
              <Text style={styles.downloadButtonText}>
                {artefact.type === 'audio' ? 'Download Audio' : 
                 artefact.type === 'pdf' ? 'Open PDF' : 
                 artefact.type === 'video' ? 'Watch Video' : 'View Document'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  typeIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4A3728',
    textAlign: 'center',
    lineHeight: 32,
  },
  titleKannada: {
    fontSize: 18,
    color: '#8B7355',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'NotoSansKannada-Regular',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF9E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#4A3728',
    textTransform: 'capitalize',
  },
  descriptionContainer: {
    marginTop: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E6D3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#4A3728',
    lineHeight: 24,
  },
  audioPlayer: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0E6D3',
    alignItems: 'center',
  },
  playButton: {
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0E6D3',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#922B3E',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#8B7355',
  },
  textContent: {
    marginTop: 24,
  },
  textContentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 12,
  },
  textPreview: {
    backgroundColor: '#FFF9E8',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  previewText: {
    fontSize: 16,
    color: '#4A3728',
    lineHeight: 28,
    fontFamily: 'NotoSansKannada-Regular',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFEF7',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#922B3E',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ArtefactDetailScreen;
