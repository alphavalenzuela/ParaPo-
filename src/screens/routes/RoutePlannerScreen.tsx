/**
 * ParaPo! Mobile App - Smart Route Matching & P2P Directions Screen
 * Route planner for Philippine informal transit (Jeepney, TODA, UV Express, Bus)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { RouteOption } from '../../types/transit';
import { routeService } from '../../api/routeService';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RouteCard } from '../../components/routes/RouteCard';
import { LiveTrackingBanner } from '../../components/safety/LiveTrackingBanner';
import { DensityCheckInModal } from '../../components/density/DensityCheckInModal';
import { AdBannerStub } from '../../components/common/AdBannerStub';
import { MOCK_POPULAR_LANDMARKS } from '../../api/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RoutePlannerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [origin, setOrigin] = useState('Cubao Farmers Terminal');
  const [destination, setDestination] = useState('Philcoa Footbridge');
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [densityModalVisible, setDensityModalVisible] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await routeService.searchRoutes({
        origin,
        destination,
      });
      setRoutes(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapStops = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <View style={styles.container}>
      <Header />
      <LiveTrackingBanner onPressBanner={() => navigation.navigate('MainTabs' as any)} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Input Search Box */}
        <View style={styles.searchCard}>
          <Text style={styles.cardHeading}>Saan ang Byahe Mo? (Plan Byahe)</Text>

          <View style={styles.inputsRow}>
            <View style={styles.inputsColumn}>
              <Input
                label="Mula (Origin):"
                value={origin}
                onChangeText={setOrigin}
                placeholder="Hal. Cubao, EDSA, Quiapo"
                leftIcon={<Ionicons name="radio-button-on" size={16} color={colors.secondary} />}
              />
              <Input
                label="Pupuntahan (Destination):"
                value={destination}
                onChangeText={setDestination}
                placeholder="Hal. Philcoa, Fairview, Makati"
                leftIcon={<Ionicons name="location" size={16} color={colors.danger} />}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSwapStops}
              style={styles.swapButton}
            >
              <Ionicons name="swap-vertical" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Quick Landmark Chips */}
          <Text style={styles.chipsLabel}>Mabilisang Sakayan:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            {MOCK_POPULAR_LANDMARKS.slice(0, 5).map((landmark) => (
              <TouchableOpacity
                key={landmark}
                onPress={() => setDestination(landmark)}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{landmark}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actionRow}>
            <Button
              title="Hanapin ang Byahe"
              variant="primary"
              loading={loading}
              onPress={handleSearch}
              icon={<Ionicons name="search" size={16} color="#FFF" />}
              style={{ flex: 1 }}
            />
            <Button
              title="On Route"
              variant="outline"
              onPress={() => setDensityModalVisible(true)}
              icon={<Ionicons name="people" size={16} color={colors.primary} />}
              style={styles.densityBtn}
            />
          </View>
        </View>

        {/* Results List */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeaderRow}>
            <Text style={styles.resultsHeading}>
              Mga Rutang Tugma ({routes.length})
            </Text>
            <Text style={styles.filterHint}>Jeep • TODA • UV • Bus</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Naghahanap ng pinakamagandang ruta...</Text>
            </View>
          ) : (
            routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onPress={() => navigation.navigate('RouteDetail', { route })}
              />
            ))
          )}
        </View>

        {/* Ad Banner for Basic Tier */}
        <AdBannerStub placement="BOTTOM_BANNER" />
      </ScrollView>

      {/* Density Check-In Modal */}
      <DensityCheckInModal
        visible={densityModalVisible}
        onClose={() => setDensityModalVisible(false)}
        routeName={`${origin} → ${destination}`}
      />
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
    paddingBottom: spacing.xxl,
  },
  searchCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeading: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputsColumn: {
    flex: 1,
  },
  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipsLabel: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  densityBtn: {
    paddingHorizontal: spacing.md,
  },
  resultsSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  resultsHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  filterHint: {
    ...typography.micro,
    color: colors.textTertiary,
  },
  loadingContainer: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  loadingText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
