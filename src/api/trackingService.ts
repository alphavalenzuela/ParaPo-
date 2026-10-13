/**
 * ParaPo! Mobile App - Safety & Live Tracking Service (Mock)
 * Live trip sessions, location coordinates, SMS alert payload generation
 * No social media auth required.
 */

import { LiveTripSession, GeoLocation } from '../types/safety';
import { TransitModeType } from '../types/transit';
import { generateSmsTrackingPayload, generateWebTrackingUrl } from '../utils/smsPayloadGenerator';

export interface StartTripPayload {
  transitMode: TransitModeType;
  routeName: string;
  destination: string;
  vehiclePlateNumber?: string;
  todaBodyNumber?: string;
  initialLocation?: GeoLocation;
}

export const trackingService = {
  /**
   * Start a live trip session
   */
  async startTrip(payload: StartTripPayload): Promise<LiveTripSession> {
    // TODO: Implement backend integration with WebSocket / MQTT or server-sent events for live telematics
    // In production, creates an ephemeral redis/database key with a 4-hour TTL for the web tracking link.
    const tripId = `trip-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const shareableWebUrl = generateWebTrackingUrl(tripId);
    const smsPayload = generateSmsTrackingPayload({
      tripId,
      transitMode: payload.transitMode,
      routeName: payload.routeName,
      destination: payload.destination,
      vehiclePlateNumber: payload.vehiclePlateNumber,
      todaBodyNumber: payload.todaBodyNumber,
      currentLocationLabel: payload.initialLocation?.addressLabel || 'Kasulukuyang lokasyon',
    });

    const session: LiveTripSession = {
      tripId,
      transitMode: payload.transitMode,
      routeName: payload.routeName,
      vehiclePlateNumber: payload.vehiclePlateNumber,
      todaBodyNumber: payload.todaBodyNumber,
      destination: payload.destination,
      startedAt: new Date().toISOString(),
      isActive: true,
      currentLocation: payload.initialLocation,
      lastUpdated: new Date().toISOString(),
      shareableWebUrl,
      smsTrackingPayload: smsPayload,
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(session), 200);
    });
  },

  /**
   * Update current commuter coordinates
   */
  async updateLocation(tripId: string, location: GeoLocation): Promise<{ success: boolean }> {
    // TODO: Implement backend integration to broadcast coordinates to authorized tracking token subscribers
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 100);
    });
  },

  /**
   * End an active trip session
   */
  async endTrip(tripId: string): Promise<{ success: boolean }> {
    // TODO: Implement backend integration to close ephemeral session and expire web tracking page
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 200);
    });
  },
};
