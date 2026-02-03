import type { RootScreenProps } from '@/navigation/types';

import { useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Paths } from '@/navigation/paths';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Divine color palette
const COLORS = {
  background: '#FFFEF7',
  cream100: '#FFF9E8',
  cream200: '#F5EFE0',
  gold500: '#C9A227',
  gold600: '#B8920F',
  maroon500: '#800020',
  maroon600: '#6B001A',
  brown500: '#6B5344',
  brown700: '#4A3728',
  brown800: '#3A2A1E',
  gray400: '#9E9E9E',
  gray600: '#757575',
  white: '#FFFFFF',
  error: '#C13333',
};

interface OTPInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onComplete: (otp: string) => void;
}

// OTP Input Component
function OTPInput({ value, onChange, onComplete }: OTPInputProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const newOtp = newValue.join('');
    onChange(newOtp);
    
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newOtp.length === 6) {
      onComplete(newOtp);
    }
  };
  
  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Animated.View
          key={index}
          entering={FadeInUp.delay(100 * index).springify()}
          style={[
            styles.otpBox,
            focusedIndex === index && styles.otpBoxFocused,
            value[index] && styles.otpBoxFilled,
          ]}
        >
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value[index] || ''}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
            selectionColor={COLORS.gold600}
          />
        </Animated.View>
      ))}
    </View>
  );
}

function LoginScreen({ navigation }: Readonly<RootScreenProps<Paths.Login>>) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const logoPosition = useSharedValue(0);
  
  const handleSendOTP = () => {
    if (!acceptedTerms) {
      setError('Please accept Terms & Conditions');
      return;
    }
    
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowOTP(true);
    }, 1500);
  };
  
  const handleVerifyOTP = (otpValue: string) => {
    if (otpValue.length !== 6) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Example }],
      });
    }, 1000);
  };
  
  const handleResendOTP = () => {
    setOtp('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoPosition.value }],
  }));

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[styles.header, logoAnimatedStyle]}
          entering={FadeInDown.duration(800).springify()}
        >
          <Text style={styles.logoSymbol}>ॐ</Text>
          <Text style={styles.logoText}>श्री पालयाच्युत</Text>
          <Text style={styles.logoSubtext}>PALAYAACHYUTHA</Text>
        </Animated.View>

        <Animated.View 
          style={styles.content}
          entering={FadeInUp.delay(300).duration(600)}
        >
          {showOTP ? (
            <Animated.View 
              style={styles.section}
              entering={FadeInUp.springify()}
            >
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to{'\n'}
                <Text style={styles.phoneHighlight}>+91 {phoneNumber}</Text>
              </Text>

              <OTPInput
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyOTP}
              />

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <TouchableOpacity onPress={handleResendOTP}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (otp.length !== 6 || isLoading) && styles.buttonDisabled
                ]}
                onPress={() => handleVerifyOTP(otp)}
                disabled={otp.length !== 6 || isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.changeNumber}
                onPress={() => {
                  setShowOTP(false);
                  setOtp('');
                }}
              >
                <Text style={styles.changeNumberText}>Change mobile number</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View style={styles.section}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>
                Enter your mobile number to continue
              </Text>
              
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile Number"
                  placeholderTextColor={COLORS.gray400}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text.replace(/\D/g, ''));
                    setError('');
                  }}
                  selectionColor={COLORS.gold600}
                />
              </View>

              {error ? (
                <Animated.Text entering={FadeIn} style={styles.errorText}>
                  {error}
                </Animated.Text>
              ) : null}

              <Pressable
                style={styles.termsContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked
                ]}>
                  {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.link}>Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>
                </Text>
              </Pressable>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!phoneNumber || isLoading) && styles.buttonDisabled
                ]}
                onPress={handleSendOTP}
                disabled={!phoneNumber || isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: 32,
  },
  logoSymbol: {
    fontSize: 56,
    color: COLORS.gold600,
    fontWeight: '200',
  },
  logoText: {
    fontSize: 20,
    color: COLORS.maroon500,
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: 12,
    color: COLORS.brown500,
    fontWeight: '400',
    marginTop: 4,
    letterSpacing: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: COLORS.brown700,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.brown800,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  phoneHighlight: {
    color: COLORS.brown700,
    fontWeight: '600',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    backgroundColor: COLORS.cream200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.brown700,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: COLORS.cream100,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.brown800,
    letterSpacing: 2,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.gray400,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.gold600,
    borderColor: COLORS.gold600,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  link: {
    color: COLORS.maroon500,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.maroon500,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.maroon600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.cream200,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.cream100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  otpBoxFocused: {
    borderColor: COLORS.gold500,
    backgroundColor: COLORS.white,
  },
  otpBoxFilled: {
    backgroundColor: COLORS.cream200,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.brown800,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  resendLink: {
    fontSize: 14,
    color: COLORS.maroon500,
    fontWeight: '600',
  },
  changeNumber: {
    marginTop: 16,
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 14,
    color: COLORS.gray600,
    textDecorationLine: 'underline',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray400,
    textAlign: 'center',
  },
});

export default LoginScreen;
