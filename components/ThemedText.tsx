import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'timeframeActive' | 'timeframeInactive' | 'calendarInactive' | 'calendarActive';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'timeframeActive' ? styles.timeframeActive : undefined,
        type === 'timeframeInactive' ? styles.timeframeInactive : undefined,
        type === 'calendarActive' ? styles.calendarActive : undefined,
        type === 'calendarInactive' ? styles.calendarInactive : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 600,
    color: '#FFF'
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  timeframeInactive: {
    lineHeight: 30,
    fontSize: 16,
    color: '#1E1E1E',
  },
  timeframeActive: {
    lineHeight: 30,
    fontSize: 16,
    color: '#D4DDDE',
  },

  calendarInactive: {
    color: '#0E392E',
    fontSize: 14,
  },
  calendarActive: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
