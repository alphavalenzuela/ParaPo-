/**
 * ParaPo! Mobile App - Safety, Live Tracking & Emergency Types
 */

import { TransitModeType } from './transit';

export type EmergencyType = 'NATIONAL_911' | 'PNP_POLICE' | 'MMDA' | 'RED_CROSS' | 'HOSPITAL' | 'BARANGAY';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
  addressLabel?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
  isPrimary: boolean;
}

export interface LiveTripSession {
  tripId: string;
  transitMode: TransitModeType;
  routeName: string;
  vehiclePlateNumber?: string;
  todaBodyNumber?: string;
  destination: string;
  startedAt: string;
  isActive: boolean;
  currentLocation?: GeoLocation;
  lastUpdated: string;
  shareableWebUrl: string;
  smsTrackingPayload: string;
}

export interface EmergencyContactInfo {
  id: string;
  name: string;
  type: EmergencyType;
  phoneNumber: string;
  description: string;
  isNationalEmergency?: boolean;
}

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'POLICE_STATION' | 'HOSPITAL' | 'FIRE_STATION' | 'BARANGAY_HALL';
  address: string;
  distanceKm: number;
  phoneNumber: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  open24Hours: boolean;
}
