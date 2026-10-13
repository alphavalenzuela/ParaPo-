/**
 * ParaPo! Mobile App - Discount Selector Component
 * Mandated 20% Discount for Student, Senior Citizen, and PWD
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DiscountType } from '../../types/fare';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

export interface DiscountSelectorProps {
  selected: DiscountType;
  onSelect: (discount: DiscountType) => void;
}

const DISCOUNT_OPTIONS: { type: DiscountType; label: string; tag: string }[] = [
  { type: 'REGULAR', label: 'Regular', tag: 'Standard' },
  { type: 'STUDENT', label: 'Student', tag: '-20%' },
  { type: 'SENIOR', label: 'Senior', tag: '-20%' },
  { type: 'PWD', label: 'PWD', tag: '-20%' },
];

export const DiscountSelector: React.FC<DiscountSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pumili ng Uri ng Pasahero (Discount Status):</Text>
      <View style={styles.tabsRow}>
        {DISCOUNT_OPTIONS.map((item) => {
          const isSelected = selected === item.type;
          return (
            <TouchableOpacity
              key={item.type}
              activeOpacity={0.8}
              onPress={() => onSelect(item.type)}
              style={[
                styles.tabButton,
                isSelected && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isSelected && styles.tabTextActive,
                ]}
              >
                {item.label}
              </Text>
              <View
                style={[
                  styles.tagBadge,
                  isSelected ? styles.tagBadgeActive : styles.tagBadgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    isSelected ? styles.tagTextActive : styles.tagTextInactive,
                  ]}
                >
                  {item.tag}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs + 2,
    fontWeight: '600',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  tabButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.primary,
  },
  tabText: {
    ...typography.micro,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  tagBadge: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: borderRadius.xs,
    marginTop: 4,
  },
  tagBadgeActive: {
    backgroundColor: colors.primary,
  },
  tagBadgeInactive: {
    backgroundColor: colors.border,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
  },
  tagTextActive: {
    color: colors.textInverse,
  },
  tagTextInactive: {
    color: colors.textSecondary,
  },
});
