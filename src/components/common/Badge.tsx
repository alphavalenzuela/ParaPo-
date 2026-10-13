/**
 * ParaPo! Mobile App - Reusable Badge Component
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { borderRadius, spacing, colors } from '../../constants/theme';

export interface BadgeProps {
  label: string;
  bgColor?: string;
  textColor?: string;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  bgColor = colors.primaryMuted,
  textColor = colors.primaryDark,
  size = 'md',
  style,
  textStyle,
  icon,
}) => {
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          paddingHorizontal: isSm ? spacing.xs + 2 : spacing.sm + 2,
          paddingVertical: isSm ? 2 : spacing.xs,
        },
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: isSm ? 11 : 12,
            marginLeft: icon ? 4 : 0,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
