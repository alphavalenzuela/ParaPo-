/**
 * ParaPo! Mobile App - Formatters
 */

import { RouteDensityLevel } from '../types/transit';
import { colors } from '../constants/theme';

export function formatPhilippinePeso(amount: number): string {
  return `₱${amount.toFixed(2)}`;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hrs = Math.floor(minutes / 60);
  const remainingMins = Math.round(minutes % 60);
  return remainingMins > 0 ? `${hrs}h ${remainingMins}m` : `${hrs}h`;
}

export function getDensityInfo(level: RouteDensityLevel): {
  label: string;
  tagalogLabel: string;
  color: string;
  bgColor: string;
} {
  switch (level) {
    case 'LOW':
      return {
        label: 'Light / Plenty of Seats',
        tagalogLabel: 'Maluwag / Maraming Uupuan',
        color: colors.densityLow,
        bgColor: '#D1FAE5',
      };
    case 'MODERATE':
      return {
        label: 'Moderate / Few Seats Left',
        tagalogLabel: 'Sakto Lang / Kaunti na Lang Uupuan',
        color: colors.densityModerate,
        bgColor: '#FEF3C7',
      };
    case 'HEAVY':
      return {
        label: 'Crowded / Standing Room',
        tagalogLabel: 'Siksikan / Tayuan Na',
        color: colors.densityHeavy,
        bgColor: '#FEE2E2',
      };
    case 'FULL_STANDBY':
      return {
        label: 'Full / Standby at Terminal',
        tagalogLabel: 'Punuan / Mahabang Pila',
        color: colors.densityFull,
        bgColor: '#FEE2E2',
      };
    default:
      return {
        label: 'Unknown',
        tagalogLabel: 'Walang Ulat',
        color: colors.textTertiary,
        bgColor: colors.surfaceSubtle,
      };
  }
}
