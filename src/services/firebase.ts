import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Firebase Authentication Service
 * Handles OTP-based authentication for Indian mobile numbers
 */

export class FirebaseAuthService {
  /**
   * Send OTP to the provided phone number
   * @param phoneNumber - 10-digit Indian mobile number (without +91)
   * @returns Promise with confirmation result
   */
  async sendOTP(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    try {
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
    return auth().currentUser;
  }
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
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
