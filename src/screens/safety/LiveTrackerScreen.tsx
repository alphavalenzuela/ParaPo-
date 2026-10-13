/**
 * ParaPo! Mobile App - Safety & Live Tracking Screen
 * Live trip tracking state shell with SMS/web link payload generators
 * No social media auth required.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { TransitModeType } from '../../types/transit';
import { TRANSIT_MODES } from '../../constants/transitModes';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ShareLinkModal } from '../../components/safety/ShareLinkModal';
import { useLiveTracking } from '../../context/LiveTrackingContext';
import { useTier } from '../../context/TierContext';
import { AdBannerStub } from '../../components/common/AdBannerStub';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LiveTrackerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isTrackingActive, activeTrip, startTrip, stopTrip, shareViaSms } = useLiveTracking();
  const { tier, config, trustedContacts } = useTier();

  const [mode, setMode] = useState<TransitModeType>('JEEPNEY_TRADITIONAL');
  const [routeName, setRouteName] = useState('Cubao - Philcoa');
  const [destination, setDestination] = useState('Philcoa Footbridge');
  const [vehiclePlate, setVehiclePlate] = useState('ABC 1234');
  const [todaNumber, setTodaNumber] = useState('');
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleToggleTrip = async () => {
    if (isTrackingActive) {
      Alert.alert(
        'Tapusin ang Byahe?',
        'Nakarating ka na ba sa iyong destinasyon? Mawawalan ng bisa ang live tracking link pagkatapos nito.',
        [
          { text: 'Ipagpatuloy Pa', style: 'cancel' },
          {
            text: 'Oo, Tapusin Na',
            style: 'destructive',
            onPress: async () => {
              await stopTrip();
              Alert.alert('Nakarating Ka Na Ligtas!', 'Salamat sa paggamit ng ParaPo! Ligtas Tracker.');
            },
          },
        ]
      );
    } else {
      setIsStarting(true);
      try {
        await startTrip({
          transitMode: mode,
          routeName,
          destination,
          vehiclePlateNumber: vehiclePlate || undefined,
          todaBodyNumber: todaNumber || undefined,
        });
        setShareModalVisible(true);
      } finally {
        setIsStarting(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Ligtas Tracker"
        subtitle="Live location telemetry at SMS alert generator"
        showBrand={false}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('EmergencyLocator')}
            style={styles.sosButton}
          >
            <Ionicons name="warning" size={16} color="#FFF" />
            <Text style={styles.sosButtonText}>911 SOS</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Trip Telemetry Card */}
        {isTrackingActive && activeTrip ? (
          <Card variant="elevated" style={styles.activeTripCard}>
            <View style={styles.activeHeader}>
              <View style={styles.pulseContainer}>
                <View style={styles.pulseDot} />
                <Text style={styles.liveLabel}>AKTIBONG BYAHE (LIVE)</Text>
              </View>
              <Badge label="GPS TRACKING" bgColor="#DCFCE7" textColor="#166534" size="sm" />
            </View>

            <Text style={styles.activeRouteTitle}>{activeTrip.routeName}</Text>
            <Text style={styles.activeDestSubtitle}>Destinasyon: {activeTrip.destination}</Text>

            {activeTrip.vehiclePlateNumber && (
              <View style={styles.plateContainer}>
                <Text style={styles.plateLabel}>Plaka ng Sasakyan:</Text>
                <Text style={styles.plateValue}>{activeTrip.vehiclePlateNumber}</Text>
              </View>
            )}

            {/* GPS Telemetry Shell */}
            <View style={styles.telemetryShell}>
              <Ionicons name="navigate-circle" size={24} color={colors.secondary} />
              <View style={styles.telemetryTexts}>
                <Text style={styles.telemetryCoords}>
                  Lat: {activeTrip.currentLocation?.latitude.toFixed(4) || '14.6198'} • Long:{' '}
                  {activeTrip.currentLocation?.longitude.toFixed(4) || '121.0515'}
                </Text>
                <Text style={styles.telemetryLocationName}>
                  {activeTrip.currentLocation?.addressLabel || 'Cubao Transit Hub, EDSA'}
                </Text>
              </View>
            </View>

            {/* Actions for Active Trip */}
            <View style={styles.activeActionsGrid}>
              <Button
                title="I-share via SMS"
                variant="secondary"
                icon={<Ionicons name="paper-plane" size={16} color="#FFF" />}
                onPress={() => setShareModalVisible(true)}
                style={{ flex: 1 }}
              />
              <Button
                title="Tapusin"
                variant="danger"
                onPress={handleToggleTrip}
                style={{ minWidth: 90 }}
              />
            </View>
          </Card>
        ) : (
          /* Start New Trip Form */
          <View style={styles.formCard}>
            <Text style={styles.formHeading}>Simulan ang Ligtas na Byahe</Text>
            <Text style={styles.formSubheading}>
              I-broadcast ang iyong live status sa pamamagitan ng SMS nang walang kailangang social media login:
            </Text>

            {/* Mode Selector */}
            <Text style={styles.inputSectionLabel}>Sasakyan:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modesScroll}>
              {(['JEEPNEY_TRADITIONAL', 'JEEPNEY_MODERN', 'TRICYCLE_TODA', 'UV_EXPRESS'] as TransitModeType[]).map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMode(m)}
                  style={[styles.modePill, mode === m && styles.modePillActive]}
                >
                  <Text style={[styles.modePillText, mode === m && styles.modePillTextActive]}>
                    {TRANSIT_MODES[m].shortLabel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Input
              label="Ruta / Byahe:"
              value={routeName}
              onChangeText={setRouteName}
              placeholder="Hal. Cubao - Philcoa via Aurora"
            />

            <Input
              label="Destinasyon:"
              value={destination}
              onChangeText={setDestination}
              placeholder="Hal. Philcoa Footbridge"
            />

            <View style={styles.plateRow}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Plaka ng Sasakyan (Opsyonal):"
                  value={vehiclePlate}
                  onChangeText={setVehiclePlate}
                  placeholder="Hal. NDF 8492"
                />
              </View>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Input
                  label="TODA Body # (Kung Tricycle):"
                  value={todaNumber}
                  onChangeText={setTodaNumber}
                  placeholder="Hal. TODA-042"
                />
              </View>
            </View>

            <Button
              title="Simulan ang Live Tracking"
              variant="primary"
              loading={isStarting}
              icon={<Ionicons name="play" size={16} color="#FFF" />}
              onPress={handleToggleTrip}
              style={{ marginTop: spacing.md }}
            />
          </View>
        )}

        {/* Trusted Contacts Shell */}
        <View style={styles.contactsCard}>
          <View style={styles.contactsHeader}>
            <View>
              <Text style={styles.contactsHeading}>Mga Trusted Contact</Text>
              <Text style={styles.contactsSubheading}>
                {tier === 'BASIC'
                  ? 'Limitado sa 1 contact sa Libre (Basic Tier)'
                  : 'Unlimited contacts (ParaPo Plus Active ★)'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AccountTab' as any)}>
              <Text style={styles.manageLink}>Pamahalaan</Text>
            </TouchableOpacity>
          </View>

          {trustedContacts.map((contact) => (
            <View key={contact.id} style={styles.contactItem}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={18} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phoneNumber} ({contact.relationship})</Text>
              </View>
              <TouchableOpacity
                onPress={() => shareViaSms(contact.phoneNumber)}
                style={styles.sendSmsIconBtn}
              >
                <Ionicons name="chatbubble-ellipses" size={18} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Emergency Quick Jump */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EmergencyLocator')}
          style={styles.emergencyBannerCard}
        >
          <Ionicons name="shield" size={28} color={colors.danger} />
          <View style={styles.emergencyBannerTexts}>
            <Text style={styles.emergencyBannerTitle}>Emergency Assistance Dashboard</Text>
            <Text style={styles.emergencyBannerSubtitle}>
              I-access ang 911 dialer, pinakamalapit na ospital at presinto ng pulisya.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.danger} />
        </TouchableOpacity>

        {/* Ad Banner for Basic Tier */}
        <AdBannerStub placement="BOTTOM_BANNER" />
      </ScrollView>

      {/* Share SMS Modal */}
      <ShareLinkModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.sm,
  },
  sosButtonText: {
    ...typography.micro,
    color: colors.textInverse,
    fontWeight: '800',
    marginLeft: 4,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  activeTripCard: {
    backgroundColor: '#064E3B',
    borderColor: '#059669',
    borderWidth: 1.5,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  pulseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399',
    marginRight: 6,
  },
  liveLabel: {
    ...typography.micro,
    color: '#A7F3D0',
    fontWeight: '800',
  },
  activeRouteTitle: {
    ...typography.h2,
    color: colors.textInverse,
    marginTop: 4,
  },
  activeDestSubtitle: {
    ...typography.caption,
    color: '#D1FAE5',
    marginTop: 2,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  plateLabel: {
    ...typography.micro,
    color: '#A7F3D0',
    marginRight: 6,
  },
  plateValue: {
    ...typography.micro,
    color: colors.textInverse,
    fontWeight: '700',
  },
  telemetryShell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: spacing.md,
  },
  telemetryTexts: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  telemetryCoords: {
    ...typography.micro,
    color: '#D1FAE5',
    fontFamily: 'monospace',
  },
  telemetryLocationName: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '600',
    marginTop: 2,
  },
  activeActionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  formCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  formSubheading: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  inputSectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  modesScroll: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  modePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.full,
    marginRight: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modePillActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.primary,
  },
  modePillText: {
    ...typography.micro,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modePillTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  plateRow: {
    flexDirection: 'row',
  },
  contactsCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  contactsHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  contactsSubheading: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
  manageLink: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  contactPhone: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 1,
  },
  sendSmsIconBtn: {
    padding: spacing.xs,
  },
  emergencyBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
  },
  emergencyBannerTexts: {
    flex: 1,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
  },
  emergencyBannerTitle: {
    ...typography.bodyBold,
    color: colors.danger,
  },
  emergencyBannerSubtitle: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
