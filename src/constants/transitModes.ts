/**
 * ParaPo! Mobile App - Transit Modes Metadata
 */

import { TransitModeType } from '../types/transit';

export interface TransitModeMeta {
  type: TransitModeType;
  label: string;
  tagalogLabel: string;
  shortLabel: string;
  iconName: string; // Expo Vector Icons (Ionicons / MaterialCommunityIcons)
  badgeBgColor: string;
  badgeTextColor: string;
  category: 'INFORMAL' | 'FORMAL';
  description: string;
}

export const TRANSIT_MODES: Record<TransitModeType, TransitModeMeta> = {
  JEEPNEY_TRADITIONAL: {
    type: 'JEEPNEY_TRADITIONAL',
    label: 'Traditional Jeepney',
    tagalogLabel: 'Tradisiyunal na Dyip',
    shortLabel: 'Trad Jeep',
    iconName: 'bus-outline',
    badgeBgColor: '#FEF3C7',
    badgeTextColor: '#B45309',
    category: 'INFORMAL',
    description: 'Barya lang po sa umaga. Pasuyo ng bayad sa katabi.',
  },
  JEEPNEY_MODERN: {
    type: 'JEEPNEY_MODERN',
    label: 'Modern Jeepney / MPUJ',
    tagalogLabel: 'Modernong Dyip (BEEP/Mini-bus)',
    shortLabel: 'Modern Jeep',
    iconName: 'bus',
    badgeBgColor: '#DBEAFE',
    badgeTextColor: '#1D4ED8',
    category: 'INFORMAL',
    description: 'May aircon, CCTV, at tap-card o cash payment.',
  },
  TRICYCLE_TODA: {
    type: 'TRICYCLE_TODA',
    label: 'Tricycle / TODA',
    tagalogLabel: 'Tricycle TODA',
    shortLabel: 'Tricycle',
    iconName: 'bicycle-outline',
    badgeBgColor: '#E0E7FF',
    badgeTextColor: '#4338CA',
    category: 'INFORMAL',
    description: 'Direktang sakay sa looban at barangay terminal.',
  },
  UV_EXPRESS: {
    type: 'UV_EXPRESS',
    label: 'UV Express / Van',
    tagalogLabel: 'UV Express / FX',
    shortLabel: 'UV Express',
    iconName: 'car-outline',
    badgeBgColor: '#D1FAE5',
    badgeTextColor: '#047857',
    category: 'INFORMAL',
    description: 'Point-to-point aircon van para sa mabilis na byahe.',
  },
  BUS_ORDINARY: {
    type: 'BUS_ORDINARY',
    label: 'Ordinary Bus',
    tagalogLabel: 'Ordinaryong Bus',
    shortLabel: 'Ord Bus',
    iconName: 'bus',
    badgeBgColor: '#F3E8FF',
    badgeTextColor: '#7E22CE',
    category: 'FORMAL',
    description: 'Bukas ang bintana, regular highway at city route.',
  },
  BUS_AIRCON: {
    type: 'BUS_AIRCON',
    label: 'Airconditioned Bus',
    tagalogLabel: 'Aircon Bus',
    shortLabel: 'Aircon Bus',
    iconName: 'snow-outline',
    badgeBgColor: '#CCFBF1',
    badgeTextColor: '#0F766E',
    category: 'FORMAL',
    description: 'Malamig na byahe para sa mahahabang ruta at EDSA carousel.',
  },
};
