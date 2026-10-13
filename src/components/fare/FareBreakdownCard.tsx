/**
 * ParaPo! Mobile App - Fare Breakdown Card Component
 * Formats official LTFRB calculation: Base Fare + Succeeding Km - Discount
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FareBreakdown } from '../../types/fare';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { formatPhilippinePeso, formatDistance } from '../../utils/formatters';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export interface FareBreakdownCardProps {
  breakdown: FareBreakdown;
}

export const FareBreakdownCard: React.FC<FareBreakdownCardProps> = ({ breakdown }) => {
  const isDiscounted = breakdown.discountType !== 'REGULAR';

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.modeInfo}>
          <Text style={styles.modeTitle}>{breakdown.modeLabel}</Text>
          <Text style={styles.distanceSubtitle}>Kabuuang Distansya: {formatDistance(breakdown.distanceKm)}</Text>
        </View>
        <Badge
          label={breakdown.discountType}
          bgColor={isDiscounted ? '#D1FAE5' : '#F1F5F9'}
          textColor={isDiscounted ? '#047857' : '#475569'}
          size="sm"
        />
      </View>

      <View style={styles.divider} />

      {/* Itemized Calculation Lines */}
      <View style={styles.lineItem}>
        <Text style={styles.lineLabel}>
          Unang {breakdown.baseDistanceKm.toFixed(1)} km (Base Fare)
        </Text>
        <Text style={styles.lineValue}>{formatPhilippinePeso(breakdown.baseFare)}</Text>
      </View>

      <View style={styles.lineItem}>
        <Text style={styles.lineLabel}>
          Succeeding {formatDistance(breakdown.succeedingDistanceKm)} (@ ₱{breakdown.succeedingRate.toFixed(2)}/km)
        </Text>
        <Text style={styles.lineValue}>{formatPhilippinePeso(breakdown.succeedingFare)}</Text>
      </View>

      <View style={styles.lineItem}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotalValue}>{formatPhilippinePeso(breakdown.subtotalFare)}</Text>
      </View>

      {isDiscounted && (
        <View style={styles.discountRow}>
          <Text style={styles.discountLabel}>
            20% Discount ({breakdown.discountType})
          </Text>
          <Text style={styles.discountValue}>- {formatPhilippinePeso(breakdown.discountAmount)}</Text>
        </View>
      )}

      <View style={styles.totalRow}>
        <View>
          <Text style={styles.totalLabel}>Kabuuang Pamasahe (Final)</Text>
          <Text style={styles.legalNotice}>Sang-ayon sa LTFRB Fare Matrix</Text>
        </View>
        <Text style={styles.finalAmount}>{formatPhilippinePeso(breakdown.finalFare)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modeInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  modeTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  distanceSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  lineLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  lineValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  subtotalLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  subtotalValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: spacing.xs + 4,
    borderRadius: borderRadius.xs,
    marginTop: spacing.xs,
  },
  discountLabel: {
    ...typography.caption,
    color: '#065F46',
    fontWeight: '600',
  },
  discountValue: {
    ...typography.caption,
    color: '#065F46',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1.5,
    borderTopColor: colors.border,
  },
  totalLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  legalNotice: {
    ...typography.micro,
    color: colors.textTertiary,
  },
  finalAmount: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '800',
  },
});
