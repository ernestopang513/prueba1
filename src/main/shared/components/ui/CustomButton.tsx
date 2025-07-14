// CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';

const STATUS_COLORS: Record<string, string> = {
  primary: '#3366FF',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  basic: '#8F9BB3',
};

type Props = {
  title: string;
  onPress?: () => void;
  status?: keyof typeof STATUS_COLORS;
  appearance?: 'filled' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  status = 'primary',
  appearance = 'filled',
  disabled = false,
  loading = false,
}: Props) => {
  const color = STATUS_COLORS[status] || STATUS_COLORS.primary;

  const backgroundColor =
    appearance === 'filled' ? color :
    appearance === 'ghost' ? 'transparent' : 'white';

  const borderColor = appearance === 'ghost' ? 'transparent' : color;

  const textColor =
    appearance === 'filled' ? 'white' : color;

  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          opacity,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
