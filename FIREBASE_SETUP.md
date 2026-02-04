# Firebase Setup Guide for Sode Mutt App

## Prerequisites
1. Create a Firebase project at https://console.firebase.google.com
2. Add Android and iOS apps to your project

## Android Setup

### 1. Download google-services.json
1. Go to Firebase Console → Project Settings
2. Under "Your apps", select your Android app
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### 2. Update android/build.gradle
Add to dependencies:
```gradle
classpath 'com.google.gms:google-services:4.4.0'
```

### 3. Update android/app/build.gradle
Add at the bottom:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 4. Enable Phone Authentication
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Phone" provider
3. Add your phone numbers for testing (if needed)

## iOS Setup

### 1. Download GoogleService-Info.plist
1. Go to Firebase Console → Project Settings
2. Under "Your apps", select your iOS app
3. Download `GoogleService-Info.plist`
4. Add it to your Xcode project (ios/MuttMobile folder)

### 2. Update ios/Podfile
Add Firebase pods:
```ruby
pod 'Firebase/Auth'
```

Then run:
```bash
cd ios
pod install
```

### 3. Update ios/MuttMobile/AppDelegate.swift
Add at the top:
```swift
import Firebase
```

In `application(_:didFinishLaunchingWithOptions:)`, add:
```swift
FirebaseApp.configure()
```

### 4. Enable Phone Auth Capability
1. In Xcode, select your project
2. Go to Signing & Capabilities
3. Add "Push Notifications" capability

## Testing Phone Authentication

### For Development (Test Numbers)
Add test phone numbers in Firebase Console:
1. Go to Authentication → Sign-in method → Phone
2. Scroll to "Phone numbers for testing"
3. Add: +91XXXXXXXXXX with code: 123456

### For Production
1. Enable reCAPTCHA verification (automatically enabled)
2. Ensure your app's SHA-1 certificate is added (Android)
3. Add authorized domains in Firebase Console

## Environment Configuration

Create `.env` file in project root (if using environment variables):
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

## Security Rules

### 1. Enable App Check (Recommended)
Protects your Firebase backend from abuse.

### 2. Set up Firestore Rules (when you add database)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Important Notes

1. **Phone Authentication Quota**: Firebase has daily SMS quotas. Monitor usage in console.
2. **Security**: Never commit `google-services.json` or `GoogleService-Info.plist` to public repos.
3. **Test Mode**: Use test phone numbers during development to avoid SMS costs.
4. **Production**: Request quota increase if expecting high traffic.

## Troubleshooting

### Android Issues
- Ensure `google-services.json` is in correct location
- Check package name matches Firebase console
- Rebuild app after adding configuration

### iOS Issues
- Ensure `GoogleService-Info.plist` is added to Xcode project (not just folder)
- Check bundle identifier matches Firebase console
- Run `pod install` after adding Firebase
- Clean build folder if issues persist

## Next Steps After Setup

1. Test with development phone numbers
2. Implement user profile storage (Firestore)
3. Add analytics tracking
4. Set up Cloud Functions for backend logic
5. Configure push notifications

## Current Implementation

The app uses `FirebaseAuthService` located in `src/services/firebase.ts`:
- `sendOTP(phoneNumber)`: Sends OTP to phone
- `verifyOTP(code, confirmation)`: Verifies OTP code
- `getCurrentUser()`: Gets authenticated user
- `signOut()`: Signs out user
- `onAuthStateChanged(callback)`: Listens to auth changes

## Firebase Console Configuration Checklist

- [ ] Project created
- [ ] Android app added with package name
- [ ] iOS app added with bundle ID
- [ ] Phone authentication enabled
- [ ] Test phone numbers added (for development)
- [ ] SHA-1 certificate added (Android)
- [ ] App Check enabled (optional but recommended)
- [ ] Billing enabled (if expecting production use)

## Contact

For Firebase-specific issues, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- React Native Firebase: https://rnfirebase.io
