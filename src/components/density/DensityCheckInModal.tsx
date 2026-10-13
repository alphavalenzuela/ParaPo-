/**
 * ParaPo! Mobile App - Density Check-In Modal ("On Route")
 * Allows commuters to report real-time passenger capacity anonymously.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteDensityLevel, TransitModeType } from '../../types/transit';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { densityService } from '../../api/densityService';

export interface DensityCheckInModalProps {
  visible: boolean;
  onClose: () => void;
  routeName?: string;
  routeId?: string;
  transitMode?: TransitModeType;
}

const DENSITY_OPTIONS: { level: RouteDensityLevel; title: string; subtitle: string; color: string }[] = [
  {
    level: 'LOW',
    title: 'Maluwag / May Bakante',
    subtitle: 'Maraming upuan, madaling sumakay',
    color: colors.densityLow,
  },
  {
    level: 'MODERATE',
    title: 'Sakto Lang',
    subtitle: 'Kakaunti na lang ang bakante',
    color: colors.densityModerate,
  },
  {
    level: 'HEAVY',
    title: 'Siksikan / Tayuan',
    subtitle: 'Puno na, may nakatayo sa gitna',
    color: colors.densityHeavy,
  },
  {
    level: 'FULL_STANDBY',
    title: 'Punuan / Mahabang Pila',
    subtitle: 'Hindi na nagpapasakay, standby sa terminal',
    color: colors.densityFull,
  },
];

export const DensityCheckInModal: React.FC<DensityCheckInModalProps> = ({
  visible,
  onClose,
  routeName = 'Kasalukuyang Ruta',
  routeId = 'route-active',
  transitMode = 'JEEPNEY_TRADITIONAL',
}) => {
  const [selectedLevel, setSelectedLevel] = useState<RouteDensityLevel>('MODERATE');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await densityService.submitCheckIn({
        routeId,
        transitMode,
        densityLevel: selectedLevel,
        locationStopName: routeName,
      });

      Alert.alert(
        'Salamat sa Ulat!',
        'Nakatulong ang iyong anonymous check-in sa kapwa commuters na nagpaplanong sumakay.',
        [{ text: 'Ayos', onPress: onClose }]
      );
    } catch (e) {
      Alert.alert('Paumanhin', 'Hindi maipadala ang ulat sa ngayon.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title="On Route Density Check-in">
      <Text style={styles.prompt}>
        Kumusta ang sitwasyon sa sinasakyan mong <Text style={styles.routeName}>{routeName}</Text>?
      </Text>

      <View style={styles.optionsList}>
        {DENSITY_OPTIONS.map((opt) => {
          const isSelected = selectedLevel === opt.level;
          return (
            <TouchableOpacity
              key={opt.level}
              activeOpacity={0.8}
              onPress={() => setSelectedLevel(opt.level)}
              style={[
                styles.optionItem,
                isSelected && { borderColor: opt.color, backgroundColor: `${opt.color}10` },
              ]}
            >
              <View style={[styles.indicatorDot, { backgroundColor: opt.color }]} />
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, isSelected && { color: opt.color, fontWeight: '700' }]}>
                  {opt.title}
                </Text>
                <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
              </View>
              {isSelected && <Text style={[styles.checkMark, { color: opt.color }]}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.privacyNote}>
        🔒 Anonymous: Hindi kinokolekta ang iyong personal na pagkakakilanlan.
      </Text>

      <Button
        title={submitting ? 'Ipinapadala...' : 'Ipadala ang Ulat (Check-in)'}
        variant="primary"
        loading={submitting}
        onPress={handleSubmit}
        style={{ marginTop: spacing.md }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  prompt: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  routeName: {
    color: colors.primary,
    fontWeight: '700',
  },
  optionsList: {
    marginVertical: spacing.xs,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  optionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkMark: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: spacing.sm,
  },
  privacyNote: {
    ...typography.micro,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
