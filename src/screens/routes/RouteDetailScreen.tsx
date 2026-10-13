/**
 * ParaPo! Mobile App - Route Detail & Step-by-Step Directions Screen
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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { formatDistance, formatDuration, formatPhilippinePeso } from '../../utils/formatters';
import { StepDirectionItem } from '../../components/routes/StepDirectionItem';
import { DensityBadge } from '../../components/density/DensityBadge';
import { Button } from '../../components/common/Button';
import { DensityCheckInModal } from '../../components/density/DensityCheckInModal';
import { ShareLinkModal } from '../../components/safety/ShareLinkModal';
import { useLiveTracking } from '../../context/LiveTrackingContext';

type RouteDetailRouteProp = RouteProp<RootStackParamList, 'RouteDetail'>;

export const RouteDetailScreen: React.FC = () => {
  const route = useRoute<RouteDetailRouteProp>();
  const navigation = useNavigation();
  const { route: selectedRoute } = route.params;

  const { startTrip, isTrackingActive } = useLiveTracking();
  const [densityModalVisible, setDensityModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [startingTrip, setStartingTrip] = useState(false);

  const handleStartLiveTrip = async () => {
    setStartingTrip(true);
    try {
      const firstStep = selectedRoute.steps[0];
      const lastStep = selectedRoute.steps[selectedRoute.steps.length - 1];

      await startTrip({
        transitMode: firstStep.mode,
        routeName: selectedRoute.title,
        destination: lastStep.destinationStop.name,
      });

      Alert.alert(
        'Simula ng Live Byahe!',
        'Aktibo na ang iyong live tracking. Nais mo bang ipadala ang SMS link sa iyong pamilya?',
        [
          { text: 'Mamaya Na', style: 'cancel' },
          { text: 'I-share via SMS', onPress: () => setShareModalVisible(true) },
        ]
      );
    } catch (e) {
      Alert.alert('Paumanhin', 'Hindi masimulan ang tracking sa ngayon.');
    } finally {
      setStartingTrip(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          Gabay sa Byahe
        </Text>
        <TouchableOpacity
          onPress={() => setDensityModalVisible(true)}
          style={styles.densityTopBtn}
        >
          <Ionicons name="people-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Overview Banner */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.routeTitle}>{selectedRoute.title}</Text>
            <DensityBadge level={selectedRoute.densityStatus} />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>ORAS</Text>
              <Text style={styles.metricValue}>{formatDuration(selectedRoute.totalDurationMinutes)}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>PAMASAHE</Text>
              <Text style={[styles.metricValue, { color: colors.secondaryDark }]}>
                {formatPhilippinePeso(selectedRoute.totalEstimatedFare)}
              </Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>DISTANSYA</Text>
              <Text style={styles.metricValue}>{formatDistance(selectedRoute.totalDistanceKm)}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>LIPAT</Text>
              <Text style={styles.metricValue}>
                {selectedRoute.transferCount === 0 ? 'Diretso' : `${selectedRoute.transferCount} sakay`}
              </Text>
            </View>
          </View>
        </View>

        {/* Step-by-Step Directions */}
        <View style={styles.directionsSection}>
          <Text style={styles.sectionHeader}>Hakbang-hakbang na Sakayan (P2P Steps)</Text>
          <Text style={styles.sectionSubheader}>
            Sundin ang mga paalala sa karatula at sakayan:
          </Text>

          {selectedRoute.steps.map((step, index) => (
            <StepDirectionItem
              key={step.id}
              step={step}
              stepIndex={index}
              isLast={index === selectedRoute.steps.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <Button
          title={
            isTrackingActive
              ? 'Aktibo ang Live Byahe (I-share SMS)'
              : 'Simulan ang Live Byahe (Live Tracker)'
          }
          variant={isTrackingActive ? 'secondary' : 'primary'}
          loading={startingTrip}
          icon={<Ionicons name="shield-checkmark" size={18} color="#FFF" />}
          onPress={() => {
            if (isTrackingActive) {
              setShareModalVisible(true);
            } else {
              handleStartLiveTrip();
            }
          }}
        />
      </View>

      {/* Modals */}
      <DensityCheckInModal
        visible={densityModalVisible}
        onClose={() => setDensityModalVisible(false)}
        routeName={selectedRoute.title}
        routeId={selectedRoute.id}
      />

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
  navBar: {
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
  navTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: spacing.sm,
  },
  densityTopBtn: {
    padding: spacing.xs,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  routeTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  metricCell: {
    alignItems: 'center',
  },
  metricLabel: {
    ...typography.micro,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  metricValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  directionsSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubheader: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
