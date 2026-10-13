/**
 * ParaPo! Mobile App - Fare & Travel Time Estimator Screen
 * Official LTFRB Formula: Fare = Base + [Succeeding Km * Rate]
 * Mandated 20% Student / Senior / PWD Discount Computation
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransitModeType } from '../../types/transit';
import { DiscountType, FareBreakdown } from '../../types/fare';
import { TRANSIT_MODES } from '../../constants/transitModes';
import { calculateFare } from '../../utils/fareCalculator';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { FareBreakdownCard } from '../../components/fare/FareBreakdownCard';
import { DiscountSelector } from '../../components/fare/DiscountSelector';
import { AdBannerStub } from '../../components/common/AdBannerStub';
import { formatPhilippinePeso, formatDuration } from '../../utils/formatters';

const MODES_LIST: TransitModeType[] = [
  'JEEPNEY_TRADITIONAL',
  'JEEPNEY_MODERN',
  'TRICYCLE_TODA',
  'UV_EXPRESS',
  'BUS_ORDINARY',
  'BUS_AIRCON',
];

export const FareEstimatorScreen: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<TransitModeType>('JEEPNEY_TRADITIONAL');
  const [distanceKmStr, setDistanceKmStr] = useState('7.2');
  const [discountType, setDiscountType] = useState<DiscountType>('REGULAR');

  const distanceKm = useMemo(() => {
    const parsed = parseFloat(distanceKmStr);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [distanceKmStr]);

  // Primary computed fare breakdown
  const primaryBreakdown = useMemo<FareBreakdown>(() => {
    return calculateFare({
      mode: selectedMode,
      distanceKm,
      discountType,
    });
  }, [selectedMode, distanceKm, discountType]);

  // Travel time estimate heuristic (avg 18 km/h in Metro Manila traffic)
  const estimatedMinutes = useMemo(() => {
    const speedKmH = selectedMode === 'UV_EXPRESS' ? 22 : selectedMode === 'TRICYCLE_TODA' ? 15 : 18;
    return Math.round((distanceKm / speedKmH) * 60) + 5; // +5 mins dwell time
  }, [distanceKm, selectedMode]);

  // Multi-mode comparison array
  const modeComparisons = useMemo(() => {
    return MODES_LIST.map((mode) => {
      const breakdown = calculateFare({ mode, distanceKm, discountType });
      const meta = TRANSIT_MODES[mode];
      return {
        mode,
        label: meta.shortLabel,
        fare: breakdown.finalFare,
        baseFare: breakdown.baseFare,
      };
    });
  }, [distanceKm, discountType]);

  const handleStepDistance = (delta: number) => {
    const nextVal = Math.max(1, Math.round((distanceKm + delta) * 10) / 10);
    setDistanceKmStr(nextVal.toString());
  };

  return (
    <View style={styles.container}>
      <Header title="Tantiya ng Pamasahe" subtitle="Kalkulador ayon sa opisyal na LTFRB rate matrix" showBrand={false} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transit Mode Selection Tabs */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pumili ng Sasakyan (Transit Mode):</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modesScroll}>
            {MODES_LIST.map((mode) => {
              const meta = TRANSIT_MODES[mode];
              const isSelected = selectedMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setSelectedMode(mode)}
                  style={[
                    styles.modeTab,
                    isSelected && styles.modeTabActive,
                  ]}
                >
                  <Text style={[styles.modeTabText, isSelected && styles.modeTabTextActive]}>
                    {meta.shortLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Distance Input & Quick Steppers */}
          <View style={styles.distanceRow}>
            <View style={{ flex: 1 }}>
              <Input
                label="Distansya ng Byahe (Kilometro / Km):"
                value={distanceKmStr}
                onChangeText={setDistanceKmStr}
                keyboardType="numeric"
                leftIcon={<Ionicons name="speedometer-outline" size={18} color={colors.primary} />}
              />
            </View>

            <View style={styles.steppersContainer}>
              <TouchableOpacity
                onPress={() => handleStepDistance(-1)}
                style={styles.stepBtn}
              >
                <Text style={styles.stepBtnText}>-1 km</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleStepDistance(1)}
                style={styles.stepBtn}
              >
                <Text style={styles.stepBtnText}>+1 km</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Distance Presets */}
          <View style={styles.presetRow}>
            <Text style={styles.presetLabel}>Karaniwang Distansya:</Text>
            {[
              { label: 'Short (4 km)', val: '4.0' },
              { label: 'Medium (7.2 km)', val: '7.2' },
              { label: 'Long (12 km)', val: '12.0' },
            ].map((p) => (
              <TouchableOpacity
                key={p.val}
                onPress={() => setDistanceKmStr(p.val)}
                style={styles.presetChip}
              >
                <Text style={styles.presetChipText}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 20% Discount Selector */}
          <DiscountSelector selected={discountType} onSelect={setDiscountType} />
        </View>

        {/* Travel Time Estimate Pill */}
        <View style={styles.timeEstimateCard}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <View style={styles.timeEstimateTextContainer}>
            <Text style={styles.timeEstimateTitle}>Tantiyang Oras ng Byahe sa Kalsada:</Text>
            <Text style={styles.timeEstimateValue}>
              Humigit-kumulang {formatDuration(estimatedMinutes)} (kasama ang regular traffic)
            </Text>
          </View>
        </View>

        {/* Official Breakdown Card */}
        <View style={styles.breakdownSection}>
          <FareBreakdownCard breakdown={primaryBreakdown} />
        </View>

        {/* Mode Comparison Table */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Paghahambing sa Ibang Sasakyan ({distanceKm} km):</Text>
          <Text style={styles.sectionSubtitle}>
            Tingnan kung magkano ang aabutin ng parehong distansya sa iba't ibang public transport:
          </Text>

          <View style={styles.comparisonTable}>
            {modeComparisons.map((item) => {
              const isCurrent = item.mode === selectedMode;
              return (
                <TouchableOpacity
                  key={item.mode}
                  onPress={() => setSelectedMode(item.mode)}
                  style={[
                    styles.comparisonRow,
                    isCurrent && styles.comparisonRowCurrent,
                  ]}
                >
                  <Text style={[styles.comparisonLabel, isCurrent && styles.comparisonTextCurrent]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.comparisonFare, isCurrent && styles.comparisonTextCurrent]}>
                    {formatPhilippinePeso(item.fare)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Ad Banner for Basic Tier */}
        <AdBannerStub placement="BOTTOM_BANNER" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  modesScroll: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  modeTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    marginRight: spacing.xs + 2,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  modeTabActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.primary,
  },
  modeTabText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: spacing.xs,
  },
  steppersContainer: {
    flexDirection: 'row',
    marginLeft: spacing.sm,
    marginBottom: spacing.xs + 2,
    gap: 4,
  },
  stepBtn: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm + 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBtnText: {
    ...typography.micro,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: spacing.xs,
  },
  presetLabel: {
    ...typography.micro,
    color: colors.textTertiary,
  },
  presetChip: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presetChipText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  timeEstimateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  timeEstimateTextContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  timeEstimateTitle: {
    ...typography.micro,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  timeEstimateValue: {
    ...typography.caption,
    color: colors.primaryDark,
    marginTop: 1,
  },
  breakdownSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  comparisonTable: {
    marginTop: spacing.xs,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRadius: borderRadius.xs,
  },
  comparisonRowCurrent: {
    backgroundColor: '#EFF6FF',
    borderBottomColor: colors.primaryMuted,
  },
  comparisonLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  comparisonFare: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  comparisonTextCurrent: {
    color: colors.primary,
    fontWeight: '700',
  },
});
