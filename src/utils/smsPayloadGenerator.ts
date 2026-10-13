/**
 * ParaPo! Mobile App - SMS & Web Link Payload Generator
 * Generates privacy-first, lightweight SMS alert strings and web tracking URLs.
 * No social media authentication required.
 */

import { LiveTripSession } from '../types/safety';
import { TRANSIT_MODES } from '../constants/transitModes';

const BASE_TRACKING_URL = 'https://parapo.ph/live-track';

export function generateWebTrackingUrl(tripId: string): string {
  // In production, tripId can be an encrypted one-time token
  return `${BASE_TRACKING_URL}?trip=${encodeURIComponent(tripId)}`;
}

export function generateSmsTrackingPayload(session: {
  tripId: string;
  transitMode: LiveTripSession['transitMode'];
  routeName: string;
  destination: string;
  vehiclePlateNumber?: string;
  todaBodyNumber?: string;
  currentLocationLabel?: string;
}): string {
  const modeMeta = TRANSIT_MODES[session.transitMode];
  const modeLabel = modeMeta ? modeMeta.label : session.transitMode;
  const trackingUrl = generateWebTrackingUrl(session.tripId);

  const vehicleId = session.vehiclePlateNumber 
    ? `Plaka: ${session.vehiclePlateNumber}` 
    : session.todaBodyNumber 
    ? `TODA #: ${session.todaBodyNumber}` 
    : '';

  const locationInfo = session.currentLocationLabel 
    ? `Mula sa: ${session.currentLocationLabel}. ` 
    : '';

  return (
    `[ParaPo! Live Byahe Alert]\n` +
    `Nasa byahe po ako sakay ng ${modeLabel} (${session.routeName}) papuntang ${session.destination}.\n` +
    `${vehicleId ? vehicleId + '\n' : ''}` +
    `${locationInfo}` +
    `Maaari ninyong subaybayan ang aking live location nang walang app dito:\n` +
    `${trackingUrl}\n` +
    `Mensaheng awtomatikong nabuo ng ParaPo! para sa kaligtasan.`
  );
}

export function generateEmergencySmsPayload(params: {
  currentLocationName: string;
  tripId?: string;
}): string {
  const trackingUrl = params.tripId ? `\nSundan ang lokasyon: ${generateWebTrackingUrl(params.tripId)}` : '';
  return (
    `[EMERGENCY ALERT - ParaPo!]\n` +
    `Nasa panganib po ako o nangangailangan ng agarang tulong habang nagco-commute sa ${params.currentLocationName}.${trackingUrl}\n` +
    `Mangyaring tawagan ako agad o tumawag sa 911 / PNP.`
  );
}
