/**
 * ParaPo! Mobile App - Share Link & SMS Payload Modal
 * Generates privacy-first tracking message without requiring social media auth.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLiveTracking } from '../../context/LiveTrackingContext';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatPhilippineMobileNumber, isValidPhilippineMobileNumber } from '../../utils/validators';

export interface ShareLinkModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ visible, onClose }) => {
  const { activeTrip, shareViaSms } = useLiveTracking();
  const [recipientNumber, setRecipientNumber] = useState('');
  const [numberError, setNumberError] = useState('');

  if (!activeTrip) {
    return null;
  }

  const handleSendSms = () => {
    if (recipientNumber && !isValidPhilippineMobileNumber(recipientNumber)) {
      setNumberError('Maglagay ng wastong PH mobile number (e.g. 09171234567)');
      return;
    }
    setNumberError('');
    shareViaSms(recipientNumber);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="I-share ang Live Byahe via SMS">
      <Text style={styles.description}>
        Ipadala ang ligtas na link sa iyong pamilya o trusted contact. Hindi nila kailangang mag-install ng app o mag-sign in gamit ang social media.
      </Text>

      <Input
        label="Numero ng Pagpapadalhan (Opsyonal):"
        placeholder="0917-XXX-XXXX"
        keyboardType="phone-pad"
        value={recipientNumber}
        onChangeText={(text) => {
          setRecipientNumber(text);
          if (numberError) setNumberError('');
        }}
        error={numberError}
      />

      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>Mensaheng Ipapadala sa SMS:</Text>
        <Text style={styles.previewContent}>{activeTrip.smsTrackingPayload}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Button
          title="Buksan ang SMS App"
          variant="secondary"
          onPress={handleSendSms}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  previewBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.sm,
  },
  previewTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  previewContent: {
    ...typography.caption,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  actionsRow: {
    marginTop: spacing.md,
  },
});
