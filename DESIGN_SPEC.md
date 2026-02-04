# Design Specification - Sode Mutt App

## 🎨 Visual Design System

### Color Palette

#### Primary Colors
```
Cream Background:  #FFF8F0  (rgb(255, 248, 240))
Pure White:        #FFFFFF  (rgb(255, 255, 255))
Divine Gold:       #C9A227  (rgb(201, 162, 39))
Sacred Maroon:     #800020  (rgb(128, 0, 32))
Deep Brown:        #3A2920  (rgb(58, 41, 32))
```

#### Secondary Colors
```
Cream Light:       #FFF9E8  (rgb(255, 249, 232))
Cream Dark:        #F5EFE0  (rgb(245, 239, 224))
Gold Dark:         #B8920F  (rgb(184, 146, 15))
Maroon Dark:       #6B001A  (rgb(107, 0, 26))
Brown Medium:      #6B5344  (rgb(107, 83, 68))
Brown Dark:        #4A3728  (rgb(74, 55, 40))
```

#### Utility Colors
```
Text Gray:         #9E9E9E  (rgb(158, 158, 158))
Border Gray:       #E0E0E0  (rgb(224, 224, 224))
Error Red:         #C13333  (rgb(193, 51, 51))
Pixel Overlay:     rgba(201, 162, 39, 0.08-0.15)
```

---

### Typography

#### Font Families
```
Sanskrit Text (iOS):     Kohinoor Devanagari
Sanskrit Text (Android): Noto Sans Devanagari
English Text:            System Default (SF Pro / Roboto)
```

#### Text Sizes & Weights

**Headers:**
```
Extra Large:  36px / Semi-bold (600)    - Main titles
Large:        24px / Medium (500)       - Section headers
Medium:       20px / Regular (400)      - Accent text (Sanskrit)
```

**Body:**
```
Regular:      17px / Semi-bold (600)    - Primary actions
Standard:     15px / Regular (400)      - Body text
Small:        14px / Medium (500)       - Secondary text
Extra Small:  13px / Regular (400)      - Helper text
```

**Special:**
```
OTP Input:    26px / Bold (700)         - OTP digits
Phone Input:  17px / Semi-bold (600)    - Phone number
```

#### Letter Spacing
```
Sanskrit Headers:  1.0px
English Headers:  -0.5px (tight)
Body Text:         0.5px
Phone/OTP Input:   1.5px (wide)
```

---

### Spacing System

#### Padding/Margin Scale
```
Extra Small:   4px
Small:         8px
Medium:        12px
Regular:       16px
Large:         20px
Extra Large:   24px
XX Large:      28px
XXX Large:     32px
Huge:          40px
```

#### Component Spacing

**Cards:**
```
Padding:        28px (all sides)
Border Radius:  28px
Margin Bottom:  24px
```

**Buttons:**
```
Padding Vertical:   18px
Padding Horizontal: 20px
Border Radius:      14px
```

**Input Fields:**
```
Padding Vertical:   18px
Padding Horizontal: 20px
Border Radius:      14px
Border Width:       1px
```

**OTP Boxes:**
```
Width:         50px
Height:        60px
Border Radius: 14px
Border Width:  2px
Gap:           Flex space-between
```

---

### Shadows & Elevation

#### Card Shadow
```css
Shadow Color:   #4A3728 (Brown Dark)
Shadow Offset:  { width: 0, height: 8 }
Shadow Opacity: 0.12
Shadow Radius:  24px
Elevation:      8 (Android)
```

#### Button Shadow
```css
Shadow Color:   #6B001A (Maroon Dark)
Shadow Offset:  { width: 0, height: 6 }
Shadow Opacity: 0.35
Shadow Radius:  12px
Elevation:      6 (Android)
```

#### OTP Box Focus Shadow
```css
Shadow Color:   #C9A227 (Gold)
Shadow Offset:  { width: 0, height: 4 }
Shadow Opacity: 0.2
Shadow Radius:  8px
Elevation:      4 (Android)
```

---

### Animation Specifications

#### Splash Screen Animation

**Duration:** 3300ms total

**Phase 1: Text Reveal (2500ms)**
```
Timing Function: Cubic Bezier (0.4, 0, 0.2, 1)
Effects:
  - Opacity: 0 → 1
  - TranslateY: -20px → 0
  - Scale: 1.08 → 1.0

Word Stagger:
  - Word 0: 0ms - 250ms
  - Word 1: 150ms - 400ms
  - Word 2: 300ms - 550ms
  - etc. (150ms stagger, 250ms duration each)
```

**Phase 2: Logo Appear (800ms)**
```
Timing Function: Cubic Bezier (0.4, 0, 0.2, 1)
Effects:
  - Opacity: 0 → 1
  - Scale: 0.9 → 1.0
  - TranslateY: 10px → 0
Start: After 80% text completion
```

#### Login Screen Animations

**Header Entrance:**
```
Type: FadeInDown
Duration: 800ms
Spring: Yes
Delay: 0ms
```

**Card Entrance:**
```
Type: FadeInUp
Duration: 600ms
Delay: 300ms
```

**OTP Box Stagger:**
```
Type: FadeInUp + Spring
Duration: Auto (spring-based)
Delay: 100ms × box index
```

**Modal Entrance:**
```
Type: SlideInDown + Spring
Duration: Auto (spring-based)
```

---

### Interactive States

#### Buttons

**Default State:**
```
Background: #800020 (Maroon)
Text: #FFFFFF (White)
Shadow: Yes
```

**Disabled State:**
```
Background: #F5EFE0 (Cream Dark)
Text: #9E9E9E (Gray)
Shadow: None
Opacity: 1.0
```

**Pressed State:**
```
Active Opacity: 0.8
Scale: 0.98 (implicit)
```

#### Input Fields

**Default State:**
```
Background: #FFF9E8 (Cream Light)
Border: 1px solid #E0E0E0
Text: #3A2920 (Deep Brown)
```

**Focus State:**
```
Border: 2px solid #C9A227 (Gold)
Background: #FFFFFF (White)
Shadow: Gold shadow (OTP only)
```

**Filled State:**
```
Background: #F5EFE0 (Cream Dark)
Border: 2px solid #4A3728 (Brown Dark)
```

**Error State:**
```
Border: 2px solid #C13333 (Red)
Helper Text: #C13333 (Red)
```

#### Checkboxes

**Unchecked:**
```
Border: 2px solid #9E9E9E
Background: Transparent
Size: 24×24px
Border Radius: 7px
```

**Checked:**
```
Border: 2px solid #C9A227
Background: #C9A227 (Gold)
Checkmark: ✓ (16px, #FFFFFF)
```

---

### Screen Layouts

#### Splash Screen

```
┌─────────────────────────┐
│                         │
│                         │
│      [Pixel Layer]      │
│   [Frosted Overlay]     │
│                         │
│     वदिराज गुरुं वन्दे    │ ← 32px, centered
│     हयग्रीव पदाश्रयम्    │ ← 32px, centered
│                         │
│                         │
│                         │
│        [Logo]           │ ← 100×100px, bottom 15%
│                         │
└─────────────────────────┘
```

#### Login Screen

```
┌─────────────────────────┐
│    [Logo 80×80px]       │ ← Top 8%
│  वदिराज गुरुं वन्दे      │ ← 24px
│  हयग्रीव पदाश्रयम्       │ ← 18px
│                         │
│  ┌─────────────────┐    │
│  │   Welcome       │    │ ← Card starts
│  │   स्वागतम्       │    │
│  │                 │    │
│  │ Enter mobile... │    │
│  │                 │    │
│  │ [+91] [Input]   │    │ ← Phone input
│  │                 │    │
│  │ ☐ I agree...    │    │ ← Checkbox
│  │                 │    │
│  │  [Send OTP]     │    │ ← Button
│  └─────────────────┘    │
│                         │
│ श्री वदिराज गुरु...      │ ← Footer
└─────────────────────────┘
```

#### OTP Screen

```
┌─────────────────────────┐
│    [Logo 80×80px]       │
│  वदिराज गुरुं वन्दे      │
│  हयग्रीव पदाश्रयम्       │
│                         │
│  ┌─────────────────┐    │
│  │  Verification   │    │
│  │ कृपया ओटीपी...   │    │
│  │                 │    │
│  │ Code sent to    │    │
│  │ +91 98765...    │    │
│  │                 │    │
│  │ [_][_][_][_][_][_]│  │ ← 6 OTP boxes
│  │                 │    │
│  │ Didn't receive? │    │
│  │    Resend OTP   │    │
│  │                 │    │
│  │[Verify & Continue]│  │
│  │                 │    │
│  │ ← Change number │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

---

### Pixel Overlay Specification

```javascript
Pixel Size:     2.5px × 2.5px
Spacing:        18px (grid)
Color:          rgba(201, 162, 39, 0.08)
Opacity Range:  0.05 - 0.30 (random)
Shape:          Square with 1px border radius
Coverage:       Full screen
```

**Generation Formula:**
```javascript
pixels = (screenWidth / 18) × (screenHeight / 18)
Random opacity: Math.random() * 0.25 + 0.05
Position: grid-based (0, 18, 36, 54... px)
```

---

### Accessibility

#### Touch Targets
```
Minimum Size:     44×44px (iOS), 48×48px (Android)
Button Height:    18px padding × 2 + 17px text = ~53px ✓
Checkbox Size:    24×24px (needs 10px padding around)
OTP Box:          50×60px ✓
```

#### Color Contrast Ratios
```
White on Maroon:     11.5:1  ✓ (WCAG AAA)
Brown on Cream:       6.2:1  ✓ (WCAG AA)
Gold on White:        3.8:1  ✓ (WCAG AA Large)
Gray on White:        2.9:1  ~ (WCAG A Large)
```

#### Text Sizing
```
Minimum Body Text:   15px  ✓
Minimum Touch Text:  17px  ✓
Headers: 20px+  ✓
```

---

### Responsive Breakpoints

**Small Phones (<360px width):**
- Reduce OTP box size: 45×55px
- Reduce card padding: 24px
- Reduce header text: 32px → 28px

**Large Phones (>400px width):**
- Maintain current sizes
- Increase margins slightly

**Tablets (>600px width):**
- Max card width: 400px (centered)
- Increase all padding by 1.2x

---

### Performance Targets

**Animation Frame Rate:**
```
Target: 60 FPS
Acceptable: 55+ FPS
Splash: Use GPU-accelerated transforms only
```

**Load Times:**
```
Splash appear: <100ms
Login render: <200ms
OTP screen: <150ms
```

**Asset Sizes:**
```
Logo PNG: <50KB
Fonts: System (0KB)
Icons: Inline SVG or Unicode
```

---

## 📱 Platform-Specific Notes

### iOS
- Use SF Pro for English text
- Kohinoor Devanagari for Sanskrit
- Haptic feedback on OTP complete (optional)
- Safe area handling for notched devices

### Android
- Use Roboto for English text
- Noto Sans Devanagari for Sanskrit
- Material Design ripple effects
- Handle system back button in modals

---

## ✨ Special Effects

### Frosted Glass Effect
```
Base: Cream background (#FFF8F0)
Overlay: rgba(255, 248, 240, 0.85)
Pixels: Gold dots with low opacity
Result: Soft, divine appearance
```

### Text Deblur Animation
```
Start State:
  - Opacity: 0
  - Scale: 1.08
  - TranslateY: -20px
  - Filter: Simulated blur via scale

End State:
  - Opacity: 1
  - Scale: 1.0
  - TranslateY: 0
  - Filter: None (crisp)

Duration: 250ms per word
Easing: Cubic bezier (smooth deceleration)
```

---

**Last Updated:** February 3, 2026  
**Version:** 1.0  
**Platform:** React Native 0.80.2
