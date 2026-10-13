/**
 * ParaPo! Mobile App - Live Route Density Badge
 * Visual indicator for crowd levels: Light, Moderate, Heavy, Full Standby
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteDensityLevel } from '../../types/transit';
import { getDensityInfo } from '../../utils/formatters';
import { borderRadius, spacing, typography } from '../../constants/theme';

export interface DensityBadgeProps {
  level: RouteDensityLevel;
  showTagalog?: boolean;
}

export const DensityBadge: React.FC<DensityBadgeProps> = ({
  level,
  showTagalog = true,
}) => {
  const info = getDensityInfo(level);

  return (
    <View style={[styles.container, { backgroundColor: info.bgColor }]}>
      <View style={[styles.dot, { backgroundColor: info.color }]} />
      <Text style={[styles.text, { color: info.color }]}>
        {showTagalog ? info.tagalogLabel : info.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    ...typography.micro,
    fontWeight: '700',
  },
});
