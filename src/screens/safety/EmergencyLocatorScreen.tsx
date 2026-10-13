/**
 * ParaPo! Mobile App - Emergency Locator Dashboard Screen
 * Quick-dial hotlines (911, PNP 117, MMDA 136, Red Cross 143)
 * Nearby hospitals and police stations with 1-tap call stubs.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { EmergencyFacility, EmergencyContactInfo } from '../../types/safety';
import { emergencyService } from '../../api/emergencyService';
import { EmergencyCallCard } from '../../components/safety/EmergencyCallCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatDistance } from '../../utils/formatters';

export const EmergencyLocatorScreen: React.FC = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<EmergencyContactInfo[]>([]);
  const [facilities, setFacilities] = useState<EmergencyFacility[]>([]);
  const [filterType, setFilterType] = useState<'ALL' | 'HOSPITAL' | 'POLICE_STATION'>('ALL');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const c = await emergencyService.getNationalContacts();
    const f = await emergencyService.getNearbyFacilities();
    setContacts(c);
    setFacilities(f);
  };

  const handleCallFacility = (facility: EmergencyFacility) => {
    Alert.alert(
      `Tawagan ang ${facility.name}?`,
      `Numerong tatawagan: ${facility.phoneNumber}`,
      [
        { text: 'Kanselahin', style: 'cancel' },
        {
          text: 'Tawagan',
          onPress: async () => {
            const telUrl = `tel:${facility.phoneNumber.replace(/[^0-9]/g, '')}`;
            try {
              const supported = await Linking.canOpenURL(telUrl);
              if (supported) {
                await Linking.openURL(telUrl);
              } else {
                Alert.alert('Dialer Stub', `Tumatawag sa ${facility.phoneNumber}...`);
              }
            } catch (e) {
              Alert.alert('Dialer Stub', `Tumatawag sa ${facility.phoneNumber}...`);
            }
          },
        },
      ]
    );
  };

  const filteredFacilities = facilities.filter((f) => {
    if (filterType === 'ALL') return true;
    return f.type === filterType;
  });

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Assistance</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* National Emergency Hotline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Pambansang Emergency Hotlines (24/7)</Text>
          <Text style={styles.sectionSubtitle}>
            Direktang koneksyon sa rescue, pulisya, at ambulansya:
          </Text>

          {contacts.map((contact) => (
            <EmergencyCallCard key={contact.id} contact={contact} />
          ))}
        </View>

        {/* Nearby Facilities Filter */}
        <View style={styles.section}>
          <View style={styles.facilityHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Mga Kalapit na Pasilidad</Text>
              <Text style={styles.sectionSubtitle}>Batay sa kasalukuyang lokasyon sa Quezon City:</Text>
            </View>
          </View>

          {/* Filter Pills */}
          <View style={styles.filterRow}>
            {[
              { type: 'ALL', label: 'Lahat' },
              { type: 'HOSPITAL', label: 'Ospital (ER)' },
              { type: 'POLICE_STATION', label: 'Presinto ng Pulis' },
            ].map((item) => (
              <TouchableOpacity
                key={item.type}
                onPress={() => setFilterType(item.type as any)}
                style={[
                  styles.filterPill,
                  filterType === item.type && styles.filterPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    filterType === item.type && styles.filterPillTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Facilities List */}
          {filteredFacilities.map((fac) => {
            const isHospital = fac.type === 'HOSPITAL';
            return (
              <Card key={fac.id} variant="elevated" style={styles.facCard}>
                <View style={styles.facRow}>
                  <View style={[styles.facIconWrapper, isHospital ? styles.iconHosp : styles.iconPnp]}>
                    <Ionicons
                      name={isHospital ? 'medkit' : 'shield'}
                      size={20}
                      color={isHospital ? colors.danger : colors.primary}
                    />
                  </View>

                  <View style={styles.facTextContainer}>
                    <View style={styles.facTitleRow}>
                      <Text style={styles.facName}>{fac.name}</Text>
                    </View>
                    <Text style={styles.facAddress}>{fac.address}</Text>

                    <View style={styles.facMetaRow}>
                      <Badge
                        label={`${formatDistance(fac.distanceKm)} layo`}
                        bgColor="#EFF6FF"
                        textColor={colors.primary}
                        size="sm"
                      />
                      {fac.open24Hours && (
                        <Badge
                          label="Bukas 24 Oras"
                          bgColor="#DCFCE7"
                          textColor="#166534"
                          size="sm"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>
                  </View>

                  <Button
                    title="Tawag"
                    variant="outline"
                    size="sm"
                    onPress={() => handleCallFacility(fac)}
                    icon={<Ionicons name="call" size={14} color={colors.primary} />}
                  />
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  facilityHeaderRow: {
    marginBottom: spacing.xs,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginVertical: spacing.xs,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.primary,
  },
  filterPillText: {
    ...typography.micro,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  facCard: {
    marginVertical: spacing.xs + 2,
  },
  facRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconHosp: {
    backgroundColor: '#FEE2E2',
  },
  iconPnp: {
    backgroundColor: '#DBEAFE',
  },
  facTextContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  facTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facName: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  facAddress: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
  facMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
});
