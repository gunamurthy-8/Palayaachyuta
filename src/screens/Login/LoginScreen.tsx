import type { RootScreenProps } from '@/navigation/types';

import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
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
  SlideInDown,
} from 'react-native-reanimated';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Paths } from '@/navigation/paths';
import { firebaseAuth } from '@/services/firebase';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Divine color palette - matching splash screen
const COLORS = {
  background: '#FFF8F0',
  cream: '#FFF9E8',
  creamDark: '#F5EFE0',
  gold: '#C9A227',
  goldDark: '#B8920F',
  maroon: '#800020',
  maroonDark: '#6B001A',
  brown: '#6B5344',
  brownDark: '#4A3728',
  brownDeep: '#3A2920',
  gray: '#9E9E9E',
  grayLight: '#E0E0E0',
  white: '#FFFFFF',
  error: '#C13333',
  pixelDot: 'rgba(201, 162, 39, 0.08)',
};

// Pixelated background
function PixelatedBackground() {
  const pixels = [];
  const pixelSize = 2.5;
  const spacing = 18;
  
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
              opacity: Math.random() * 0.25 + 0.05,
            },
          ]}
        />
      );
    }
  }
  
  return <View style={styles.pixelContainer}>{pixels}</View>;
}

interface OTPInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onComplete: (otp: string) => void;
}

// OTP Input Component - Divine styling
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
            selectionColor={COLORS.gold}
          />
        </Animated.View>
      ))}
    </View>
  );
}

// Privacy Policy Modal
interface PolicyModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly type: 'privacy' | 'terms';
}

function PolicyModal({ visible, onClose, type }: PolicyModalProps) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
  const content = type === 'privacy' 
    ? `Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application.

Information We Collect:
• Mobile phone number for authentication
• Device information for security purposes
• Usage data to improve our services

How We Use Your Information:
• To authenticate and verify your identity
• To provide and maintain our services
• To communicate with you about updates and features

Data Security:
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.

Your Rights:
You have the right to access, update, or delete your personal information at any time.

Contact Us:
If you have any questions about this Privacy Policy, please contact us at privacy@sodemutt.org`
    : `Welcome to our application. By using this app, you agree to these Terms & Conditions.

Acceptance of Terms:
By accessing and using this application, you accept and agree to be bound by the terms and conditions of this agreement.

User Responsibilities:
• Provide accurate and complete information during registration
• Maintain the confidentiality of your account
• Use the application only for lawful purposes

Service Usage:
• This app is for devotional and spiritual purposes
• Users must respect the sacred nature of the content
• Misuse of the application may result in account termination

Modifications:
We reserve the right to modify these terms at any time. Continued use of the app constitutes acceptance of modified terms.

Limitation of Liability:
The application is provided "as is" without warranties of any kind.

Contact:
For questions about these Terms, contact us at support@sodemutt.org`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          entering={SlideInDown.springify()}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalText}>{content}</Text>
          </ScrollView>
          
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>I Understand</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

function LoginScreen({ navigation }: Readonly<RootScreenProps<Paths.Login>>) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms'>('privacy');
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  
  const handleOpenPolicy = (type: 'privacy' | 'terms') => {
    setPolicyType(type);
    setShowPolicyModal(true);
  };
  
  const handleSendOTP = async () => {
    if (!acceptedTerms) {
      setError('Please accept Terms & Conditions and Privacy Policy');
      return;
    }
    
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const confirmResult = await firebaseAuth.sendOTP(phoneNumber);
      setConfirmation(confirmResult);
      setShowOTP(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    }
  };
  
  const handleVerifyOTP = async (otpValue: string) => {
    if (otpValue.length !== 6 || !confirmation) return;
    
    setIsLoading(true);
    
    try {
      await firebaseAuth.verifyOTP(otpValue, confirmation);
      
      // Successfully authenticated - AuthContext will detect the state change
      // and automatically switch to the MainStack (no manual navigation needed)
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Invalid OTP');
      setOtp('');
    }
  };
  
  const handleResendOTP = async () => {
    setOtp('');
    setError('');
    setIsLoading(true);
    
    try {
      const confirmResult = await firebaseAuth.sendOTP(phoneNumber);
      setConfirmation(confirmResult);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <PixelatedBackground />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Divine Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(800).springify()}
        >
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>वदिराज गुरुं वन्दे</Text>
          <Text style={styles.appSubtitle}>हयग्रीव पदाश्रयम्</Text>
        </Animated.View>

        {/* Main Content Card */}
        <Animated.View 
          style={styles.card}
          entering={FadeInUp.delay(300).duration(600)}
        >
          {showOTP ? (
            // OTP Verification Screen
            <View style={styles.section}>
              <View style={styles.titleSection}>
                <Text style={styles.titleMain}>Verification</Text>
                <Text style={styles.titleAccent}>कृपया ओटीपी दर्ज करें</Text>
              </View>
              
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
                <Text style={[
                  styles.buttonText,
                  (otp.length !== 6 || isLoading) && styles.buttonTextDisabled
                ]}>
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
                <Text style={styles.changeNumberText}>← Change mobile number</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Phone Number Input Screen
            <View style={styles.section}>
              <View style={styles.titleSection}>
                <Text style={styles.titleMain}>Welcome</Text>
                <Text style={styles.titleAccent}>स्वागतम्</Text>
              </View>
              
              <Text style={styles.subtitle}>
                Enter your mobile number to begin your spiritual journey
              </Text>
              
              {/* Phone Input */}
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile Number"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text.replaceAll(/\D/g, ''));
                    setError('');
                  }}
                  selectionColor={COLORS.gold}
                />
              </View>

              {error ? (
                <Animated.Text entering={FadeIn} style={styles.errorText}>
                  {error}
                </Animated.Text>
              ) : null}

              {/* Terms & Conditions Checkbox */}
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
                  <Text 
                    style={styles.link}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleOpenPolicy('terms');
                    }}
                  >
                    Terms & Conditions
                  </Text>
                  {' '}and{' '}
                  <Text 
                    style={styles.link}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleOpenPolicy('privacy');
                    }}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </Pressable>

              {/* Send OTP Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!phoneNumber || isLoading || !acceptedTerms) && styles.buttonDisabled
                ]}
                onPress={handleSendOTP}
                disabled={!phoneNumber || isLoading || !acceptedTerms}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.buttonText,
                  (!phoneNumber || isLoading || !acceptedTerms) && styles.buttonTextDisabled
                ]}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            श्री वदिराज गुरु पादुकाभ्यां नमः
          </Text>
        </View>
      </ScrollView>
      
      {/* Policy Modal */}
      <PolicyModal
        visible={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        type={policyType}
      />
    </KeyboardAvoidingView>
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
    borderRadius: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.brownDeep,
    marginTop: 12,
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Kohinoor Devanagari' : 'Noto Sans Devanagari',
  },
  appSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.maroon,
    marginTop: 4,
    letterSpacing: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'Kohinoor Devanagari' : 'Noto Sans Devanagari',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 28,
    marginBottom: 24,
    shadowColor: COLORS.brownDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  section: {
    width: '100%',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleMain: {
    fontSize: 36,
    fontWeight: '600',
    color: COLORS.brownDeep,
    letterSpacing: -0.5,
  },
  titleAccent: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.gold,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Kohinoor Devanagari' : 'Noto Sans Devanagari',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.brown,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  phoneHighlight: {
    color: COLORS.brownDark,
    fontWeight: '700',
    letterSpacing: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    backgroundColor: COLORS.creamDark,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  countryCodeText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 14,
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.brownDeep,
    letterSpacing: 1.5,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.brown,
    lineHeight: 20,
  },
  link: {
    color: COLORS.maroon,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLORS.maroon,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: COLORS.maroonDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: COLORS.creamDark,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: COLORS.gray,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  otpBox: {
    width: 50,
    height: 60,
    borderRadius: 14,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.grayLight,
  },
  otpBoxFocused: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  otpBoxFilled: {
    backgroundColor: COLORS.creamDark,
    borderColor: COLORS.brownDark,
  },
  otpInput: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.brownDeep,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.brown,
  },
  resendLink: {
    fontSize: 14,
    color: COLORS.maroon,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  changeNumber: {
    marginTop: 20,
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 15,
    color: COLORS.brown,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 28,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gold,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Kohinoor Devanagari' : 'Noto Sans Devanagari',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(58, 41, 32, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingTop: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.brownDeep,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.creamDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: COLORS.brownDark,
    fontWeight: '600',
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.brownDark,
  },
  modalButton: {
    backgroundColor: COLORS.maroon,
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});

export default LoginScreen;
