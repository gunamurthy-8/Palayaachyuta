import type { RootScreenProps } from '@/navigation/types';

import { useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { Paths } from '@/navigation/paths';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Sanskrit verse split into two lines
const LINE_1 = 'वदिराज गुरुं वन्दे';
const LINE_2 = 'हयग्रीव पदाश्रयम्';

// Divine color palette - Frosted cream with divine gold
const COLORS = {
  background: '#FFF8F0', // Warm cream
  frostedCream: 'rgba(255, 248, 240, 0.85)', // Frosted overlay
  textPrimary: '#3A2920', // Deep brown
  textGold: '#C9A227', // Divine gold
  textAccent: '#800020', // Sacred maroon
  pixelDot: 'rgba(201, 162, 39, 0.15)', // Subtle gold pixels
};

interface WordProps {
  readonly word: string;
  readonly wordIndex: number;
  readonly lineIndex: number;
  readonly animationProgress: SharedValue<number>;
}

// Pixelated background component
function PixelatedBackground() {
  const pixels = [];
  const pixelSize = 3;
  const spacing = 20;
  
  for (let x = 0; x < SCREEN_WIDTH / spacing; x++) {
    for (let y = 0; y < SCREEN_HEIGHT / spacing; y++) {
      pixels.push(
        <View
          key={`pixel-${x}-${y}`}
          style={[
            styles.pixel,
            {
              left: x * spacing,
              top: y * spacing,
              width: pixelSize,
              height: pixelSize,
              opacity: Math.random() * 0.3 + 0.1,
            },
          ]}
        />
      );
    }
  }
  
  return <View style={styles.pixelContainer}>{pixels}</View>;
}

// Individual animated word component with reveal effect
function AnimatedWord({ word, wordIndex, lineIndex, animationProgress }: WordProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = animationProgress.value;
    
    // Each word reveals sequentially with smooth timing
    // Word 0: 0-0.25, Word 1: 0.15-0.4, Word 2: 0.3-0.55, etc.
    const baseDelay = (lineIndex * 3 + wordIndex) * 0.15;
    const startReveal = baseDelay;
    const endReveal = startReveal + 0.25;
    
    // Opacity: fade in as text deblurs
    const opacity = interpolate(
      progress,
      [startReveal, endReveal],
      [0, 1],
      'clamp'
    );
    
    // Blur simulation: start blurred (using scale and opacity)
    const blurFactor = interpolate(
      progress,
      [startReveal, endReveal],
      [1, 0],
      'clamp'
    );
    
    // Reveal from top: translateY movement
    const translateY = interpolate(
      progress,
      [startReveal, endReveal],
      [-30, 0],
      'clamp'
    );
    
    // Scale effect for deblur simulation
    const scale = interpolate(
      progress,
      [startReveal, endReveal],
      [1.15, 1],
      'clamp'
    );
    
    return {
      opacity: opacity * (1 - blurFactor * 0.5),
      transform: [
        { translateY },
        { scale },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.word, animatedStyle]}>
      {word}
    </Animated.Text>
  );
}

interface TextLineProps {
  readonly line: string;
  readonly lineIndex: number;
  readonly animationProgress: SharedValue<number>;
}

// Animated line with words
function AnimatedLine({ line, lineIndex, animationProgress }: TextLineProps) {
  const words = line.split(' ');
  
  return (
    <View style={styles.lineContainer}>
      {words.map((word, index) => (
        <AnimatedWord
          key={`${lineIndex}-${index}-${word}`}
          word={word}
          wordIndex={index}
          lineIndex={lineIndex}
          animationProgress={animationProgress}
        />
      ))}
    </View>
  );
}

// Logo component with animation
function AnimatedLogo({ animationProgress }: Readonly<{ animationProgress: SharedValue<number> }>) {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = animationProgress.value;
    
    // Logo fades in after text is fully revealed
    const opacity = interpolate(progress, [0.8, 1], [0, 1], 'clamp');
    const scale = interpolate(progress, [0.8, 1], [0.9, 1], 'clamp');
    const translateY = interpolate(progress, [0.8, 1], [10, 0], 'clamp');
    
    return {
      opacity,
      transform: [
        { scale },
        { translateY },
      ],
    };
  });

  return (
    <Animated.View style={[styles.logoContainer, animatedStyle]}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

interface SplashScreenProps extends RootScreenProps<Paths.Splash> {
  onAnimationComplete?: () => void;
}

function SplashScreen({ navigation, onAnimationComplete }: Readonly<SplashScreenProps>) {
  const animationProgress = useSharedValue(0);

  const handleAnimationComplete = () => {
    onAnimationComplete?.();
  };

  useEffect(() => {
    // Smooth text reveal animation followed by logo
    animationProgress.value = withSequence(
      // Text reveals word by word (2.5s)
      withTiming(1, { 
        duration: 2500, 
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
      }),
      // Hold for logo display (0.8s), then call completion
      withDelay(
        800,
        withTiming(1.1, { 
          duration: 0 
        }, () => {
          runOnJS(handleAnimationComplete)();
        })
      )
    );
  }, []);

  // Background with frosted cream effect
  const backgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.3],
      [0, 1],
      'clamp'
    );
    
    return {
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      {/* Pixelated background layer */}
      <PixelatedBackground />
      
      {/* Frosted glass overlay */}
      <Animated.View style={[styles.frostedOverlay, backgroundStyle]} />
      
      {/* Main content */}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <AnimatedLine 
            line={LINE_1} 
            lineIndex={0} 
            animationProgress={animationProgress} 
          />
          <AnimatedLine 
            line={LINE_2} 
            lineIndex={1} 
            animationProgress={animationProgress} 
          />
        </View>
        
        <AnimatedLogo animationProgress={animationProgress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pixelContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  pixel: {
    position: 'absolute',
    backgroundColor: COLORS.pixelDot,
    borderRadius: 1.5,
  },
  frostedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.frostedCream,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  word: {
    fontSize: 32,
    fontWeight: '400',
    color: COLORS.textPrimary,
    marginHorizontal: 8,
    letterSpacing: 1.5,
    // Use Devanagari-friendly font
    fontFamily: Platform.OS === 'ios' ? 'Kohinoor Devanagari' : 'Noto Sans Devanagari',
  },
  logoContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.15,
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
