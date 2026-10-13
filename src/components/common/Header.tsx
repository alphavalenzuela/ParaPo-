/**
 * ParaPo! Mobile App - Reusable Header Component
 * Displays brand identity "ParaPo! - Ang Smart at Ligtas na Byahe Mo"
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import { useTier } from '../../context/TierContext';
import { Badge } from './Badge';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBrand?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBrand = true,
  rightAction,
}) => {
  const { tier, config } = useTier();
  const isPlus = tier === 'PARAPO_PLUS';

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <View style={styles.titleArea}>
          {showBrand ? (
            <View>
              <View style={styles.brandRow}>
                <Text style={styles.brandName}>ParaPo!</Text>
                <Badge
                  label={isPlus ? 'PLUS' : 'LIBRE'}
                  bgColor={isPlus ? '#FEF3C7' : '#DBEAFE'}
                  textColor={isPlus ? '#B45309' : '#1D4ED8'}
                  size="sm"
                  style={{ marginLeft: spacing.sm }}
                />
              </View>
              <Text style={styles.brandTagline}>Ang Smart at Ligtas na Byahe Mo</Text>
            </View>
          ) : (
            <View>
              {title && <Text style={styles.pageTitle}>{title}</Text>}
              {subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
            </View>
          )}
        </View>

        {rightAction && <View style={styles.rightActionArea}>{rightAction}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleArea: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '800',
  },
  brandTagline: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pageTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  pageSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightActionArea: {
    marginLeft: spacing.md,
  },
});
