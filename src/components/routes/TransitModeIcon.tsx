/**
 * ParaPo! Mobile App - Transit Mode Icon Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransitModeType } from '../../types/transit';
import { TRANSIT_MODES } from '../../constants/transitModes';
import { borderRadius, spacing, typography } from '../../constants/theme';

export interface TransitModeIconProps {
  mode: TransitModeType;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TransitModeIcon: React.FC<TransitModeIconProps> = ({
  mode,
  showLabel = false,
  size = 'md',
}) => {
  const meta = TRANSIT_MODES[mode] || {
    shortLabel: mode,
    iconName: 'bus',
    badgeBgColor: '#E2E8F0',
    badgeTextColor: '#334155',
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: meta.badgeBgColor,
          paddingHorizontal: showLabel ? spacing.sm : spacing.xs + 2,
          paddingVertical: spacing.xs,
        },
      ]}
    >
      <Ionicons
        name={meta.iconName as any}
        size={iconSize}
        color={meta.badgeTextColor}
      />
      {showLabel && (
        <Text style={[styles.label, { color: meta.badgeTextColor }]}>
          {meta.shortLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.micro,
    fontWeight: '700',
    marginLeft: 4,
  },
});
