import type { RootScreenProps } from '@/navigation/types';

import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// App title letters for animation
const APP_TITLE = 'PALAYAACHYUTHA';
const TOTAL_LETTERS = APP_TITLE.length;

// Divine color palette
const COLORS = {
  background: '#FFFEF7', // Light cream
  textPrimary: '#4A3728', // Warm brown
  textGold: '#B8920F', // Divine gold
  textAccent: '#800020', // Sacred maroon
};

interface LetterProps {
  readonly letter: string;
  readonly index: number;
  readonly animationPhase: SharedValue<number>;
  readonly totalLetters: number;
}

// Individual animated letter component
function AnimatedLetter({ letter, index, animationPhase, totalLetters }: LetterProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const phase = animationPhase.value;
    
    // Phase 0-1: Letters unveil from blur (staggered)
    // Phase 1-2: Letters stay visible
    // Phase 2-3: Letters fade out one by one (reverse order)
    
    const unveilStart = index * 0.03;
    const unveilEnd = unveilStart + 0.3;
    
    const fadeOutStart = 2 + ((totalLetters - 1 - index) * 0.04);
    const fadeOutEnd = fadeOutStart + 0.15;
    
    // Opacity: fade in during unveil, stay visible, fade out
    let opacity = 0;
    if (phase < 1) {
      // Unveil phase
      opacity = interpolate(phase, [unveilStart, unveilEnd], [0, 1], 'clamp');
    } else if (phase < 2) {
      // Stay visible
      opacity = 1;
    } else {
      // Fade out phase
      opacity = interpolate(phase, [fadeOutStart, fadeOutEnd], [1, 0], 'clamp');
    }
    
    // Blur effect (simulated with opacity and scale)
    const blur = phase < 1 
      ? interpolate(phase, [unveilStart, unveilEnd], [8, 0], 'clamp')
      : 0;
    
    // Y translation: drop from above during unveil
    const translateY = phase < 1
      ? interpolate(phase, [unveilStart, unveilEnd], [-30, 0], 'clamp')
      : 0;
    
    // Scale for blur simulation
    const scale = phase < 1
      ? interpolate(phase, [unveilStart, unveilEnd], [1.2, 1], 'clamp')
      : 1;
    
    return {
      opacity,
      transform: [
        { translateY },
        { scale },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.letter, animatedStyle]}>
      {letter}
    </Animated.Text>
  );
}

// Logo component with animation
function AnimatedLogo({ animationPhase }: Readonly<{ animationPhase: SharedValue<number> }>) {
  const animatedStyle = useAnimatedStyle(() => {
    const phase = animationPhase.value;
    
    // Logo appears from below during phase 2-2.5
    // Moves to header position during phase 2.5-3.5
    
    // Opacity: fade in during phase 2-2.3
    const opacity = interpolate(phase, [2, 2.3], [0, 1], 'clamp');
    
    // Y position: start below center, move to center, then to top
    let translateY = SCREEN_HEIGHT * 0.3; // Start position (below visible area)
    
    if (phase >= 2 && phase < 2.8) {
      // Rise to center
      translateY = interpolate(
        phase, 
        [2, 2.8], 
        [SCREEN_HEIGHT * 0.3, 0], 
        'clamp'
      );
    } else if (phase >= 2.8 && phase < 3) {
      // Pause at center
      translateY = 0;
    } else if (phase >= 3) {
      // Move to header
      translateY = interpolate(
        phase, 
        [3, 3.5], 
        [0, -SCREEN_HEIGHT * 0.35], 
        'clamp'
      );
    }
    
    // Scale: slightly larger when arriving, then normalize
    const scale = phase < 2.8
      ? interpolate(phase, [2, 2.5], [0.8, 1], 'clamp')
      : interpolate(phase, [3, 3.5], [1, 0.6], 'clamp');
    
    return {
      opacity,
      transform: [
        { translateY },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.logoContainer, animatedStyle]}>
      {/* ॐ Symbol - Divine Sanskrit */}
      <Animated.Text style={styles.logoSymbol}>ॐ</Animated.Text>
      <Animated.Text style={styles.logoSubtext}>श्री पालयाच्युत</Animated.Text>
    </Animated.View>
  );
}

function SplashScreen({ navigation }: Readonly<RootScreenProps<Paths.Splash>>) {
  const animationPhase = useSharedValue(0);
  const letters = APP_TITLE.split('');
  
  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Login }],
    });
  };

  useEffect(() => {
    // Start the cinematic animation sequence
    animationPhase.value = withSequence(
      // Phase 0-1: Letters unveil (1.5s)
      withTiming(1, { 
        duration: 1500, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      }),
      // Phase 1-2: Hold visible (0.8s)
      withDelay(
        800,
        withTiming(2, { duration: 0 })
      ),
      // Phase 2-3: Letters fade, logo rises (1.8s)
      withTiming(3, { 
        duration: 1800, 
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
      }),
      // Phase 3-3.5: Logo moves to header (1s)
      withTiming(3.5, { 
        duration: 1000, 
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
      }),
      // Final pause before navigation
      withDelay(
        300,
        withTiming(4, { 
          duration: 0 
        }, () => {
          runOnJS(navigateToLogin)();
        })
      )
    );
  }, []);

  // Background fade animation for transition
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: COLORS.background,
    };
  });

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      {/* Title letters container */}
      <View style={styles.titleContainer}>
        <View style={styles.lettersRow}>
          {letters.map((letter, index) => (
            <AnimatedLetter
              key={`${letter}-${index}`}
              letter={letter}
              index={index}
              animationPhase={animationPhase}
              totalLetters={TOTAL_LETTERS}
            />
          ))}
        </View>
      </View>
      
      {/* Logo */}
      <AnimatedLogo animationPhase={animationPhase} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lettersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 4,
    color: COLORS.textPrimary,
    fontFamily: 'System', // Will be replaced with custom font
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSymbol: {
    fontSize: 72,
    color: COLORS.textGold,
    fontWeight: '200',
  },
  logoSubtext: {
    fontSize: 18,
    color: COLORS.textAccent,
    fontWeight: '400',
    marginTop: 8,
    letterSpacing: 2,
  },
});

export default SplashScreen;
