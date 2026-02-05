import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { storage } from '@/App';

/**
 * Firebase Authentication Service
 * Handles OTP-based authentication for Indian mobile numbers
 */

// MOCK MODE - Set to true to use dummy OTP for development
const MOCK_AUTH_MODE = true;
const MOCK_OTP = '123456';

// Mock user storage key
const MOCK_USER_KEY = 'mock_authenticated_user';

export class FirebaseAuthService {
  /**
   * Send OTP to the provided phone number
   * @param phoneNumber - 10-digit Indian mobile number (without +91)
   * @returns Promise with confirmation result
   */
  async sendOTP(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    try {
      // MOCK MODE: Return a dummy confirmation for development
      if (MOCK_AUTH_MODE) {
        console.log('🔧 MOCK MODE: OTP sent successfully. Use OTP: ' + MOCK_OTP);
        return {
          verificationId: 'mock-verification-id',
          confirm: async (code: string) => {
            if (code === MOCK_OTP) {
              console.log('✅ MOCK MODE: OTP verified successfully');
              
              // Store mock user in MMKV to simulate authentication
              const mockUser = {
                uid: 'mock-user-id',
                phoneNumber: `+91${phoneNumber}`,
                displayName: null,
                email: null,
                photoURL: null,
                providerId: 'phone',
              };
              
              storage.set(MOCK_USER_KEY, JSON.stringify(mockUser));
              storage.set('isLoggedIn', true);
              storage.set('userId', mockUser.uid);
              
              return {
                user: mockUser as any,
              } as FirebaseAuthTypes.UserCredential;
            } else {
              throw new Error('Invalid OTP. Use: ' + MOCK_OTP);
            }
          },
        } as any;
      }
      
      const fullPhoneNumber = `+91${phoneNumber}`;
      
      // For development: Enable phone auth testing
      // Note: In production, ensure Firebase console has proper test numbers configured
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber, true);
      
      return confirmation;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  }
  
  /**
   * Verify OTP code
   * @param code - 6-digit OTP code
   * @param confirmation - The confirmation object from sendOTP
   * @returns Promise with user credentials
   */
  async verifyOTP(
    code: string,
    confirmation: FirebaseAuthTypes.ConfirmationResult
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const userCredential = await confirmation.confirm(code);
      if (!userCredential) {
        throw new Error('Failed to verify OTP');
      }
      return userCredential;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw new Error('Invalid OTP. Please try again.');
    }
  }
  
  /**
   * Get current authenticated user
   * @returns Current user or null
   */
  getCurrentUser(): FirebaseAuthTypes.User | null {
    // MOCK MODE: Return a mock user if stored
    if (MOCK_AUTH_MODE) {
      const mockUserData = storage.getString(MOCK_USER_KEY);
      if (mockUserData) {
        return JSON.parse(mockUserData) as any;
      }
      return null;
    }
    return auth().currentUser;
  }
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      if (MOCK_AUTH_MODE) {
        // Clear mock user data
        storage.delete(MOCK_USER_KEY);
        storage.delete('isLoggedIn');
        storage.delete('userId');
        console.log('🔧 MOCK MODE: User signed out');
        return;
      }
      
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }
  
  /**
   * Listen to auth state changes
   * @param callback - Function to call when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return auth().onAuthStateChanged(callback);
  }
}

// Export singleton instance
export const firebaseAuth = new FirebaseAuthService();
