/**
 * ParaPo! Mobile App - Step-by-Step Leg Direction Component
 * Displays informal transit stops, signboard codes, and commuter instructions.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransitLegStep } from '../../types/transit';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { formatDistance, formatDuration, formatPhilippinePeso } from '../../utils/formatters';
import { TransitModeIcon } from './TransitModeIcon';
import { DensityBadge } from '../density/DensityBadge';

export interface StepDirectionItemProps {
  step: TransitLegStep;
  stepIndex: number;
  isLast: boolean;
}

export const StepDirectionItem: React.FC<StepDirectionItemProps> = ({
  step,
  stepIndex,
  isLast,
}) => {
  return (
    <View style={styles.container}>
      {/* Timeline indicator column */}
      <View style={styles.timelineColumn}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>{stepIndex + 1}</Text>
        </View>
        {!isLast && <View style={styles.timelineConnector} />}
      </View>

      {/* Step details content */}
      <View style={styles.contentColumn}>
        <View style={styles.headerRow}>
          <TransitModeIcon mode={step.mode} showLabel size="sm" />
          <DensityBadge level={step.currentDensity} showTagalog />
        </View>

        <Text style={styles.routeName}>{step.routeName}</Text>

        {step.signboardCode && (
          <View style={styles.signboardContainer}>
            <Text style={styles.signboardLabel}>KARATULA / SIGNBOARD:</Text>
            <View style={styles.signboardPill}>
              <Text style={styles.signboardText}>"{step.signboardCode}"</Text>
            </View>
          </View>
        )}

        {/* Origin Stop */}
        <View style={styles.stopRow}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <View style={styles.stopTextContainer}>
            <Text style={styles.stopName}>{step.originStop.name}</Text>
            {step.originStop.landmark && (
              <Text style={styles.stopLandmark}>Landmark: {step.originStop.landmark}</Text>
            )}
          </View>
        </View>

        {/* Commuter Instruction Box */}
        <View style={styles.instructionBox}>
          <Ionicons name="information-circle" size={16} color={colors.primary} />
          <Text style={styles.instructionText}>{step.instructions}</Text>
        </View>

        {/* Destination Stop */}
        <View style={styles.stopRow}>
          <Ionicons name="flag" size={16} color={colors.danger} />
          <View style={styles.stopTextContainer}>
            <Text style={styles.stopName}>{step.destinationStop.name}</Text>
            {step.destinationStop.landmark && (
              <Text style={styles.stopLandmark}>Landmark: {step.destinationStop.landmark}</Text>
            )}
          </View>
        </View>

        {/* Leg Metrics (Distance, Time, Fare) */}
        <View style={styles.metricsRow}>
          <Text style={styles.metricItem}>
            ⏱ {formatDuration(step.estimatedMinutes)}
          </Text>
          <Text style={styles.metricBullet}>•</Text>
          <Text style={styles.metricItem}>
            📍 {formatDistance(step.distanceKm)}
          </Text>
          <Text style={styles.metricBullet}>•</Text>
          <Text style={[styles.metricItem, styles.metricFare]}>
            {formatPhilippinePeso(step.fareEstimated)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  timelineColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: spacing.sm,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: colors.textInverse,
    fontWeight: '700',
    fontSize: 12,
  },
  timelineConnector: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  contentColumn: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  routeName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginVertical: 2,
  },
  signboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
    flexWrap: 'wrap',
  },
  signboardLabel: {
    ...typography.micro,
    color: colors.textSecondary,
    marginRight: 6,
  },
  signboardPill: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: '#EAB308',
  },
  signboardText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#854D0E',
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  stopTextContainer: {
    marginLeft: spacing.xs,
    flex: 1,
  },
  stopName: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stopLandmark: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginVertical: spacing.xs,
  },
  instructionText: {
    ...typography.caption,
    color: colors.primaryDark,
    marginLeft: spacing.xs,
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metricItem: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  metricBullet: {
    marginHorizontal: 6,
    color: colors.textTertiary,
  },
  metricFare: {
    color: colors.secondaryDark,
    fontWeight: '700',
  },
});
