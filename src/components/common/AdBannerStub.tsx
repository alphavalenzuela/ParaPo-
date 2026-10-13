/**
 * ParaPo! Mobile App - Ad Banner Stub
 * Displayed only for Basic Tier commuters (Ad-supported)
 * Automatically hidden for ParaPo Plus members.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { useTier } from '../../context/TierContext';

export interface AdBannerStubProps {
  placement?: 'BOTTOM_BANNER' | 'IN_FEED';
  onUpgradePress?: () => void;
}

export const AdBannerStub: React.FC<AdBannerStubProps> = ({
  placement = 'BOTTOM_BANNER',
  onUpgradePress,
}) => {
  const { config, toggleTier } = useTier();

  // If tier does not have ads, do not render
  if (!config.hasAdBanners) {
    return null;
  }

  const handleUpgrade = () => {
    if (onUpgradePress) {
      onUpgradePress();
    } else {
      toggleTier();
    }
  };

  return (
    <View style={[styles.container, placement === 'IN_FEED' ? styles.inFeed : styles.bottomBanner]}>
      <View style={styles.adHeader}>
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>ADVERTISEMENT</Text>
        </View>
        <TouchableOpacity onPress={handleUpgrade}>
          <Text style={styles.removeAdsText}>Remove Ads with Plus ★</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adContent}>
        <Text style={styles.adTitle}>Ingat sa Byahe! Mag-baon ng Barya</Text>
        <Text style={styles.adSubtitle}>Sponsored Commuter Notice • I-upgrade ang ParaPo! para sa Offline Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  bottomBanner: {
    marginHorizontal: spacing.md,
  },
  inFeed: {
    marginHorizontal: 0,
  },
  adHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  adBadge: {
    backgroundColor: '#94A3B8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  adBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textInverse,
    letterSpacing: 0.5,
  },
  removeAdsText: {
    ...typography.micro,
    color: colors.primary,
    fontWeight: '700',
  },
  adContent: {
    marginTop: 2,
  },
  adTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  adSubtitle: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
