/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { blue } from "react-native-reanimated/lib/typescript/Colors";

const tintColorLight = '#0d7377';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    blue: '#5DADE2',
    purple: '#A855F7',
    green: '#00D26A',
    orange: '#FFA500',
    gray: '#F5F5F5',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    blue: '#5DADE2',
    purple: '#A855F7',
    green: '#00D26A',
    orange: '#FFA500',
    gray: '#F5F5F5',
  },
};
