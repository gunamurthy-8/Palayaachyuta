# Quick Start Guide - Firebase OTP Setup

## 🚀 Get Started in 10 Minutes

### Step 1: Create Firebase Project (2 min)

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it: **Sode Mutt** or **sode-matha**
4. Disable Google Analytics (optional for now)
5. Click "Create project"

---

### Step 2: Add Android App (3 min)

1. In Firebase console, click "Add app" → Android icon
2. **Android package name**: `com.muttmobile`
3. Download `google-services.json`
4. Copy it to: `android/app/google-services.json`

```bash
# On Windows (from project root)
Copy-Item "path\to\your\downloaded\google-services.json" "android\app\google-services.json"
```

---

### Step 3: Enable Phone Authentication (1 min)

1. In Firebase console, go to **Authentication** (left sidebar)
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Click on **Phone** provider
5. Click "Enable" toggle
6. Click "Save"

---

### Step 4: Add Test Phone Number (1 min)

**For Development Testing (No SMS costs):**

1. In Authentication → Sign-in method → Phone
2. Scroll to "Phone numbers for testing"
3. Click "Add phone number"
4. Add your number: `+91XXXXXXXXXX`
5. Set verification code: `123456` (or any 6 digits)
6. Click "Add"

**Example:**
```
Phone: +919876543210
Code: 123456
```

---

### Step 5: Rebuild Your App (3 min)

```bash
# Clean and rebuild Android
cd android
./gradlew clean
cd ..
npm run android

# OR if on Windows:
cd android
.\gradlew.bat clean
cd ..
npm run android
```

---

## 🎯 Test Your App

### Testing with Test Phone Number:

1. Open app → Splash screen plays (3 seconds)
2. Login screen appears
3. Check "Terms & Conditions" checkbox
4. Enter test number: `9876543210` (without +91)
5. Click "Send OTP"
6. Enter code: `123456`
7. Click "Verify & Continue"
8. ✅ You're logged in!

---

## 📱 For iOS Setup (Later)

1. In Firebase console, click "Add app" → iOS icon
2. **iOS bundle ID**: `com.muttmobile`
3. Download `GoogleService-Info.plist`
4. Open Xcode → Add file to ios/MuttMobile folder
5. Run: `cd ios && pod install`
6. Rebuild iOS app

---

## 🐛 Quick Troubleshooting

### "Firebase not initialized"
```bash
# Rebuild the app completely
cd android
./gradlew clean
cd ..
npm run android
```

### "OTP not sending"
- Check if Phone auth is enabled in Firebase console
- Verify you're using a test phone number
- Check you entered the number correctly (10 digits, no +91)

### "Invalid OTP"
- Use the exact code you set in Firebase console
- For test numbers, it's NOT a real SMS code
- Common test code: `123456`

---

## 🎨 What You'll See

### Splash Screen (3 seconds):
- Cream background with golden pixels
- Sanskrit text reveals word by word:
  - `वदिराज गुरुं वन्दे`
  - `हयग्रीव पदाश्रयम्`
- Logo appears at bottom
- Auto-navigates to login

### Login Screen:
- Divine header with logo and Sanskrit text
- Phone number input (+91 prefix)
- Terms & Conditions checkbox (required)
- Send OTP button
- Then OTP verification with 6 boxes
- Smooth animations throughout

---

## 📋 Checklist Before Testing

- [ ] Firebase project created
- [ ] Android app added to Firebase
- [ ] `google-services.json` in `android/app/`
- [ ] Phone authentication enabled in Firebase
- [ ] Test phone number added in Firebase
- [ ] App rebuilt after adding Firebase config
- [ ] Logo file exists at `assets/logo.png`

---

## 🔥 Production Setup (Later)

When ready for real users:

1. **Remove test phone numbers** from Firebase
2. **Enable reCAPTCHA** (automatic for production)
3. **Add SHA-1 certificate** to Firebase:
   ```bash
   cd android
   ./gradlew signingReport
   # Copy SHA-1 hash → Firebase console → Project settings → Your apps
   ```
4. **Monitor SMS quota** in Firebase console
5. **Set up billing** if expecting high traffic

---

## 💡 Tips

- **Development**: Use test numbers to avoid SMS costs
- **Logo**: Replace `assets/logo.png` with your actual logo
- **Colors**: Adjust colors in color palette constants if needed
- **Text**: Sanskrit text can be changed in component files

---

## 📞 Need Help?

1. Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed setup
2. Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for architecture
3. Firebase docs: https://rnfirebase.io
4. React Native Firebase Auth: https://rnfirebase.io/auth/phone-auth

---

**Estimated Time**: 10 minutes to fully working OTP authentication!

**Next**: Once working, you can add user profile storage with Firestore, push notifications, and more features.
