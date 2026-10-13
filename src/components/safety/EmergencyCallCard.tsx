/**
 * ParaPo! Mobile App - Emergency Hotline Card
 * 1-Tap quick-dial UI stub for 911, PNP, MMDA, Red Cross
 */

import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyContactInfo } from '../../types/safety';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export interface EmergencyCallCardProps {
  contact: EmergencyContactInfo;
}

export const EmergencyCallCard: React.FC<EmergencyCallCardProps> = ({ contact }) => {
  const handleDial = () => {
    // Stub for calling native telephone dialer
    const telUrl = `tel:${contact.phoneNumber}`;
    Alert.alert(
      `Tawagan ang ${contact.name}?`,
      `Numerong tatawagan: ${contact.phoneNumber}`,
      [
        { text: 'Kanselahin', style: 'cancel' },
        {
          text: 'Tawagan Agad',
          style: 'destructive',
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(telUrl);
              if (supported) {
                await Linking.openURL(telUrl);
              } else {
                Alert.alert('Dialer Stub', `Tumatawag sa ${contact.phoneNumber}...`);
              }
            } catch (e) {
              Alert.alert('Dialer Stub', `Tumatawag sa ${contact.phoneNumber}...`);
            }
          },
        },
      ]
    );
  };

  const is911 = contact.phoneNumber === '911';

  return (
    <Card
      variant="elevated"
      style={[
        styles.card,
        is911 && styles.card911,
      ]}
    >
      <View style={styles.contentRow}>
        <View style={[styles.iconWrapper, is911 ? styles.iconWrapper911 : styles.iconWrapperNormal]}>
          <Ionicons
            name={is911 ? 'shield-checkmark' : 'call'}
            size={22}
            color={is911 ? colors.danger : colors.primary}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, is911 && styles.title911]}>{contact.name}</Text>
          </View>
          <Text style={styles.description}>{contact.description}</Text>
          <Text style={styles.phoneLabel}>Hotline: {contact.phoneNumber}</Text>
        </View>

        <Button
          title="Tawag"
          variant={is911 ? 'danger' : 'primary'}
          size="sm"
          onPress={handleDial}
          icon={<Ionicons name="call" size={14} color="#FFF" />}
          style={styles.callButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginVertical: spacing.xs + 2,
    borderColor: colors.border,
  },
  card911: {
    borderColor: colors.danger,
    borderWidth: 1.5,
    backgroundColor: '#FEF2F2',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconWrapperNormal: {
    backgroundColor: '#EFF6FF',
  },
  iconWrapper911: {
    backgroundColor: '#FEE2E2',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  title911: {
    color: colors.danger,
    fontWeight: '800',
  },
  description: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
  phoneLabel: {
    ...typography.micro,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: 4,
  },
  callButton: {
    minWidth: 78,
  },
});
