/**
 * ParaPo! Mobile App - Account & Tier Settings Screen
 * Switch between Basic Tier (Ad-supported, 1 contact) and ParaPo Plus Tier (Offline mode, unlimited contacts)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTier } from '../../context/TierContext';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

export const AccountScreen: React.FC = () => {
  const {
    tier,
    config,
    toggleTier,
    trustedContacts,
    canAddMoreContacts,
    addTrustedContact,
    removeTrustedContact,
    isOfflineModeActive,
    setOfflineModeActive,
  } = useTier();

  const isPlus = tier === 'PARAPO_PLUS';

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRel, setNewContactRel] = useState('');

  const handleOfflineToggle = (value: boolean) => {
    if (!config.isOfflineModeEnabled) {
      Alert.alert(
        'ParaPo Plus Feature ★',
        'Ang Offline Mode ay eksklusibo sa ParaPo Plus. I-upgrade ang tier upang ma-cache ang mga ruta at LTFRB matrix kahit walang internet.',
        [
          { text: 'I-upgrade sa Plus', onPress: toggleTier },
          { text: 'Mamaya', style: 'cancel' },
        ]
      );
      return;
    }
    setOfflineModeActive(value);
  };

  const handleSaveContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      Alert.alert('Kulang ang Impormasyon', 'Pakilagay ang pangalan at cellphone number.');
      return;
    }

    const res = addTrustedContact({
      name: newContactName.trim(),
      phoneNumber: newContactPhone.trim(),
      relationship: newContactRel.trim() || 'Family',
      isPrimary: trustedContacts.length === 0,
    });

    if (res.success) {
      setNewContactName('');
      setNewContactPhone('');
      setNewContactRel('');
      setAddModalVisible(false);
    } else {
      Alert.alert('Limitasyon sa Tier', res.error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Account & Subscription" subtitle="Pamahalaan ang iyong tier at kaligtasan" showBrand={false} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tier Status Card */}
        <Card variant="elevated" style={[styles.tierCard, isPlus && styles.tierCardPlus]}>
          <View style={styles.tierHeader}>
            <View>
              <Text style={styles.tierStatusLabel}>KASALUKUYANG TIER</Text>
              <Text style={[styles.tierTitle, isPlus && styles.tierTitlePlus]}>
                {isPlus ? 'ParaPo Plus ★' : 'ParaPo Libre (Basic)'}
              </Text>
            </View>
            <Badge
              label={isPlus ? 'PREMIUM ACTIVE' : 'FREE TIER'}
              bgColor={isPlus ? '#FEF3C7' : '#EFF6FF'}
              textColor={isPlus ? '#B45309' : colors.primary}
            />
          </View>

          <Text style={styles.tierDescription}>
            {isPlus
              ? 'Naka-enable ang lahat ng safety at offline features. Walang advertisements.'
              : 'Libreng access na may suportang advertisements at 1 trusted contact para sa emergency.'}
          </Text>

          {/* Toggle Button Stub */}
          <View style={styles.tierActionRow}>
            <Button
              title={isPlus ? 'Subukan ang Libre (Basic Mode)' : 'Mag-upgrade sa ParaPo Plus ★'}
              variant={isPlus ? 'outline' : 'primary'}
              onPress={toggleTier}
              icon={<Ionicons name={isPlus ? 'swap-horizontal' : 'star'} size={16} color={isPlus ? colors.primary : '#FFF'} />}
              style={{ flex: 1 }}
            />
          </View>
        </Card>

        {/* Feature Comparison Matrix */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Paghahambing ng mga Benepisyo</Text>

          <View style={styles.featureItem}>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureName}>Trusted Contacts para sa SMS</Text>
              <Text style={styles.featureStatus}>
                Basic: 1 contact • Plus: Walang limitasyon
              </Text>
            </View>
            <Badge
              label={config.maxTrustedContacts === -1 ? 'Unlimited' : '1 Contact'}
              bgColor="#EFF6FF"
              textColor={colors.primary}
              size="sm"
            />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureName}>Offline Byahe Mode</Text>
              <Text style={styles.featureStatus}>
                Tingnan ang mga ruta at pamasahe kahit walang data
              </Text>
            </View>
            <Switch
              value={isOfflineModeActive}
              onValueChange={handleOfflineToggle}
              trackColor={{ false: colors.border, true: colors.secondaryLight }}
              thumbColor={isOfflineModeActive ? colors.secondary : '#f4f3f4'}
            />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureName}>Karanasan na Walang Patalastas (No Ads)</Text>
              <Text style={styles.featureStatus}>
                {config.hasAdBanners ? 'May commuter banner ads' : '100% Ad-Free Experience'}
              </Text>
            </View>
            <Ionicons
              name={config.hasAdBanners ? 'close-circle' : 'checkmark-circle'}
              size={22}
              color={config.hasAdBanners ? colors.textTertiary : colors.secondary}
            />
          </View>
        </View>

        {/* Trusted Contacts Management */}
        <View style={styles.sectionCard}>
          <View style={styles.contactsHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Listahan ng Trusted Contacts</Text>
              <Text style={styles.sectionSubtitle}>
                {trustedContacts.length} ng {config.maxTrustedContacts === -1 ? '∞' : config.maxTrustedContacts} na contacts
              </Text>
            </View>

            <Button
              title="+ Magdagdag"
              variant="outline"
              size="sm"
              onPress={() => {
                if (!canAddMoreContacts) {
                  Alert.alert(
                    'Limitado ang Basic Tier',
                    'Naka-maximum na 1 contact ka na. Mag-upgrade sa ParaPo Plus para magdagdag ng higit pa.',
                    [
                      { text: 'Mag-upgrade', onPress: toggleTier },
                      { text: 'Sige', style: 'cancel' },
                    ]
                  );
                } else {
                  setAddModalVisible(true);
                }
              }}
            />
          </View>

          {trustedContacts.map((contact) => (
            <View key={contact.id} style={styles.contactRow}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={16} color={colors.primary} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactNameText}>{contact.name}</Text>
                <Text style={styles.contactMetaText}>
                  {contact.phoneNumber} • {contact.relationship}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeTrustedContact(contact.id)}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Discount ID Verification Stub */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Katayuan ng Diskwento sa Pasahero</Text>
          <Text style={styles.sectionSubtitle}>
            Mandated 20% discount sa ilalim ng Philippine Laws:
          </Text>

          <View style={styles.discountStatusRow}>
            <View>
              <Text style={styles.discountTypeLabel}>Uri ng ID: Student ID / Senior Citizen ID / PWD ID</Text>
              <Text style={styles.discountVerifiedHint}>Auto-apply sa Fare Matrix calculator</Text>
            </View>
            <Badge label="Naka-activate" bgColor="#DCFCE7" textColor="#166534" size="sm" />
          </View>
        </View>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        title="Magdagdag ng Trusted Contact"
      >
        <Input
          label="Pangalan:"
          placeholder="Hal. Tatay, Nanay, Kapatid"
          value={newContactName}
          onChangeText={setNewContactName}
        />
        <Input
          label="Cellphone Number:"
          placeholder="0917-XXX-XXXX"
          keyboardType="phone-pad"
          value={newContactPhone}
          onChangeText={setNewContactPhone}
        />
        <Input
          label="Relasyon:"
          placeholder="Hal. Mother, Friend, Spouse"
          value={newContactRel}
          onChangeText={setNewContactRel}
        />

        <Button
          title="I-save ang Contact"
          variant="primary"
          onPress={handleSaveContact}
          style={{ marginTop: spacing.md }}
        />
      </Modal>
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
    paddingBottom: spacing.xxxl,
  },
  tierCard: {
    margin: spacing.md,
    backgroundColor: colors.surface,
  },
  tierCardPlus: {
    borderColor: '#F59E0B',
    borderWidth: 1.5,
    backgroundColor: '#FFFBEB',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tierStatusLabel: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  tierTitle: {
    ...typography.h2,
    color: colors.primary,
    marginTop: 2,
  },
  tierTitlePlus: {
    color: '#B45309',
  },
  tierDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  tierActionRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
  },
  sectionCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureTextCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  featureName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  featureStatus: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contactsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  contactDetails: {
    flex: 1,
  },
  contactNameText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  contactMetaText: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  deleteBtn: {
    padding: spacing.xs,
  },
  discountStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  discountTypeLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  discountVerifiedHint: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
