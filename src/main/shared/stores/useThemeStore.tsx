// themeStore.ts
import { create } from 'zustand';

type ColorScale = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000?: string;
  1100?: string;
};

type Theme = {
  textBasicColor: string;
  inputBorderColor: string;
  inputPlaceholderColor: string;
  inputLabelColor: string;
  primary: ColorScale;
  info: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  danger: ColorScale;
  basic: ColorScale;
};

type ThemeStore = {
  theme: Theme;
};

export const useThemeStore = create<ThemeStore>(() => ({
  theme: {
    textBasicColor: '#222B45',
    inputBorderColor: '#ccc',
    inputPlaceholderColor: '#aaa',
    inputLabelColor: '#555',
    primary: {
      100: '#F2F6FF',
      200: '#D9E4FF',
      300: '#A6C1FF',
      400: '#598BFF',
      500: '#3366FF',
      600: '#274BDB',
      700: '#1A34B8',
      800: '#102694',
      900: '#091C7A',
    },
    info: {
      100: '#F2F8FF',
      200: '#C7E2FF',
      300: '#94CBFF',
      400: '#42AAFF',
      500: '#0095FF',
      600: '#006FD6',
      700: '#0057C2',
      800: '#0041A8',
      900: '#002885',
    },
    warning: {
      100: '#FFFDF2',
      200: '#FFF1C2',
      300: '#FFE59E',
      400: '#FFC94D',
      500: '#FFAA00',
      600: '#DB8B00',
      700: '#B86E00',
      800: '#945400',
      900: '#703C00',
    },
    success: {
      100: '#F0FFF4',
      200: '#C6F6D5',
      300: '#9AE6B4',
      400: '#68D391',
      500: '#48BB78',
      600: '#38A169',
      700: '#2F855A',
      800: '#276749',
      900: '#22543D',
    },
    danger: {
      100: '#FFF5F5',
      200: '#FED7D7',
      300: '#FEB2B2',
      400: '#FC8181',
      500: '#F56565',
      600: '#E53E3E',
      700: '#C53030',
      800: '#9B2C2C',
      900: '#FF3D71',
    },
    basic: {
      100: '#FFFFFF',
      200: '#F7F9FC',
      300: '#EDF1F7',
      400: '#E4E9F2',
      500: '#C5CEE0',
      600: '#8F9BB3',
      700: '#2E3A59',
      800: '#222B45',
      900: '#1A2138',
      1000: '#151A30',
      1100: '#101426',
    },
  },
}));
