/**
 * ParaPo! Mobile App - Live Tracking Active Banner
 * Sticky or top-level status bar showing active transit tracking
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLiveTracking } from '../../context/LiveTrackingContext';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { Badge } from '../common/Badge';

export interface LiveTrackingBannerProps {
  onPressBanner?: () => void;
}

export const LiveTrackingBanner: React.FC<LiveTrackingBannerProps> = ({ onPressBanner }) => {
  const { isTrackingActive, activeTrip, shareViaSms } = useLiveTracking();

  if (!isTrackingActive || !activeTrip) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressBanner}
      style={styles.banner}
    >
      <View style={styles.leftContent}>
        <View style={styles.pulsingDot} />
        <View style={styles.textColumn}>
          <View style={styles.badgeRow}>
            <Text style={styles.title}>LIVE BYAHE TRACKING</Text>
            <Badge label="AKTIBO" bgColor="#DCFCE7" textColor="#15803D" size="sm" style={{ marginLeft: 6 }} />
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>
            Papuntang {activeTrip.destination} ({activeTrip.routeName})
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.shareBtn}
        onPress={() => shareViaSms()}
      >
        <Ionicons name="paper-plane" size={14} color={colors.textInverse} />
        <Text style={styles.shareText}>SMS Alert</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#064E3B',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399',
    marginRight: spacing.sm,
  },
  textColumn: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.micro,
    color: '#A7F3D0',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '600',
    marginTop: 1,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.sm,
  },
  shareText: {
    ...typography.micro,
    color: colors.textInverse,
    fontWeight: '700',
    marginLeft: 4,
  },
});
