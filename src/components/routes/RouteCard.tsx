/**
 * ParaPo! Mobile App - Route Recommendation Card
 * Summarizes travel time, fare estimate, transfers, and route density.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteOption } from '../../types/transit';
import { colors, borderRadius, spacing, typography, shadows } from '../../constants/theme';
import { formatDistance, formatDuration, formatPhilippinePeso } from '../../utils/formatters';
import { TransitModeIcon } from './TransitModeIcon';
import { DensityBadge } from '../density/DensityBadge';
import { Badge } from '../common/Badge';

export interface RouteCardProps {
  route: RouteOption;
  onPress: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.card,
        route.isRecommended && styles.recommendedCard,
      ]}
    >
      {/* Top Tag & Recommendation Strip */}
      <View style={styles.topRow}>
        <View style={styles.tagsContainer}>
          {route.isRecommended && (
            <Badge
              label="REKOMENDADO"
              bgColor="#D1FAE5"
              textColor="#065F46"
              size="sm"
              style={{ marginRight: 6 }}
            />
          )}
          {route.tags?.map((t) => (
            <Badge
              key={t}
              label={t}
              bgColor="#F1F5F9"
              textColor="#475569"
              size="sm"
              style={{ marginRight: 4 }}
            />
          ))}
        </View>

        <DensityBadge level={route.densityStatus} />
      </View>

      {/* Title & Modes Sequence */}
      <Text style={styles.title}>{route.title}</Text>

      {/* Transit mode pills flow */}
      <View style={styles.modesRow}>
        {route.steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <TransitModeIcon mode={step.mode} showLabel size="sm" />
            {idx < route.steps.length - 1 && (
              <Ionicons
                name="arrow-forward"
                size={14}
                color={colors.textTertiary}
                style={{ marginHorizontal: 6 }}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Route Key Figures */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>ORAS NG BYAHE</Text>
          <Text style={styles.metricValuePrimary}>{formatDuration(route.totalDurationMinutes)}</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>PAMASAHE</Text>
          <Text style={styles.metricValueSecondary}>{formatPhilippinePeso(route.totalEstimatedFare)}</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>LIPAT / SAKAY</Text>
          <Text style={styles.metricValueMuted}>
            {route.transferCount === 0 ? 'Diretso' : `${route.transferCount} Lipat`}
          </Text>
        </View>
      </View>

      {/* Tap to view directions footer */}
      <View style={styles.footerRow}>
        <Text style={styles.footerDistance}>Distansya: {formatDistance(route.totalDistanceKm)}</Text>
        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>Tingnan ang Byahe</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  recommendedCard: {
    borderColor: colors.secondary,
    borderWidth: 1.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginVertical: 4,
  },
  modesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs + 2,
    flexWrap: 'wrap',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  metricLabel: {
    ...typography.micro,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  metricValuePrimary: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  metricValueSecondary: {
    ...typography.bodyBold,
    color: colors.secondaryDark,
  },
  metricValueMuted: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.xs,
  },
  footerDistance: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    marginRight: 2,
  },
});
