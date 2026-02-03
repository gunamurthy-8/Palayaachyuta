import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

// Divine, minimal color palette - Light creamy theme for Palayaachyutha
const colorsLight = {
  // Primary cream/ivory shades - Divine background
  cream50: '#FFFEF7',
  cream100: '#FFF9E8',
  cream200: '#F5EFE0',
  cream300: '#E8E0D0',
  
  // Divine gold accents
  gold400: '#D4AF37',
  gold500: '#C9A227',
  gold600: '#B8920F',
  gold700: '#8B6914',
  
  // Sacred maroon/burgundy
  maroon400: '#922B3E',
  maroon500: '#800020',
  maroon600: '#6B001A',
  maroon700: '#4A0012',
  
  // Warm browns for text
  brown100: '#E6DDD0',
  brown200: '#D4C4B0',
  brown500: '#6B5344',
  brown600: '#5A4639',
  brown700: '#4A3728',
  brown800: '#3A2A1E',
  
  // Grays
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray400: '#9E9E9E',
  gray600: '#757575',
  gray800: '#424242',
  
  // Utility
  red500: '#C13333',
  skeleton: '#E0D8C8',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

const colorsDark = {
  // Dark divine theme
  cream50: '#1A1918',
  cream100: '#252320',
  cream200: '#2D2A27',
  cream300: '#3D3835',
  
  gold400: '#E5C158',
  gold500: '#D4AF37',
  gold600: '#C9A227',
  gold700: '#B8920F',
  
  maroon400: '#B04060',
  maroon500: '#A0324F',
  maroon600: '#8B2942',
  maroon700: '#6B001A',
  
  brown100: '#3D3530',
  brown200: '#4A4035',
  brown500: '#8B7355',
  brown600: '#9A8265',
  brown700: '#A08060',
  brown800: '#B09070',
  
  gray50: '#212121',
  gray100: '#303030',
  gray200: '#424242',
  gray400: '#9E9E9E',
  gray600: '#BDBDBD',
  gray800: '#E0E0E0',
  
  red500: '#EF5350',
  skeleton: '#3D3530',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

const sizes = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 8, 12, 16, 24, 32],
    widths: [1, 2, 3],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.cream50,
    card: colorsLight.cream100,
    primary: colorsLight.gold600,
    text: colorsLight.brown700,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.cream50,
        card: colorsDark.cream100,
        primary: colorsDark.gold500,
        text: colorsDark.gray800,
      },
    },
  },
} as const satisfies ThemeConfiguration;
