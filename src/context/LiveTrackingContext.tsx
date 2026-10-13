/**
 * ParaPo! Mobile App - Live Tracking Context
 * Manages active trip session, live coordinates, SMS alert payload, and sharing states.
 * No social media authentication required.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Linking } from 'react-native';
import { LiveTripSession, GeoLocation } from '../types/safety';
import { TransitModeType } from '../types/transit';
import { trackingService, StartTripPayload } from '../api/trackingService';

interface LiveTrackingContextType {
  activeTrip: LiveTripSession | null;
  isTrackingActive: boolean;
  isLoading: boolean;
  startTrip: (params: Omit<StartTripPayload, 'initialLocation'>) => Promise<LiveTripSession>;
  stopTrip: () => Promise<void>;
  updateCoordinates: (coords: GeoLocation) => Promise<void>;
  shareViaSms: (recipientPhone?: string) => Promise<void>;
  getShareableLink: () => string | null;
}

const LiveTrackingContext = createContext<LiveTrackingContextType | undefined>(undefined);

export const LiveTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTrip, setActiveTrip] = useState<LiveTripSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isTrackingActive = !!activeTrip && activeTrip.isActive;

  const startTrip = async (params: Omit<StartTripPayload, 'initialLocation'>): Promise<LiveTripSession> => {
    setIsLoading(true);
    try {
      // Mock initial user location around Cubao / EDSA
      const initialLocation: GeoLocation = {
        latitude: 14.6198,
        longitude: 121.0515,
        timestamp: Date.now(),
        addressLabel: 'Cubao Transit Hub, Quezon City',
      };

      const session = await trackingService.startTrip({
        ...params,
        initialLocation,
      });

      setActiveTrip(session);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const stopTrip = async () => {
    if (!activeTrip) return;
    setIsLoading(true);
    try {
      await trackingService.endTrip(activeTrip.tripId);
      setActiveTrip(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCoordinates = async (coords: GeoLocation) => {
    if (!activeTrip) return;
    // TODO: Implement backend integration for GPS telemetry stream over WebSocket or BackgroundFetch
    setActiveTrip((prev) =>
      prev
        ? {
            ...prev,
            currentLocation: coords,
            lastUpdated: new Date().toISOString(),
          }
        : null
    );
    await trackingService.updateLocation(activeTrip.tripId, coords);
  };

  const shareViaSms = async (recipientPhone?: string) => {
    if (!activeTrip) {
      Alert.alert('Walang Byahe', 'Magsimula muna ng byahe bago mag-share ng SMS tracking.');
      return;
    }

    const payload = activeTrip.smsTrackingPayload;
    const recipient = recipientPhone || '';
    const smsUrl = `sms:${recipient}${recipient ? '?' : '?'}body=${encodeURIComponent(payload)}`;

    try {
      const supported = await Linking.canOpenURL(smsUrl);
      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        // Fallback for simulators or unsupported environments
        Alert.alert('SMS Alert Payload', payload);
      }
    } catch (error) {
      console.warn('Could not launch SMS app:', error);
      Alert.alert('SMS Alert', payload);
    }
  };

  const getShareableLink = (): string | null => {
    return activeTrip ? activeTrip.shareableWebUrl : null;
  };

  return (
    <LiveTrackingContext.Provider
      value={{
        activeTrip,
        isTrackingActive,
        isLoading,
        startTrip,
        stopTrip,
        updateCoordinates,
        shareViaSms,
        getShareableLink,
      }}
    >
      {children}
    </LiveTrackingContext.Provider>
  );
};

export const useLiveTracking = (): LiveTrackingContextType => {
  const context = useContext(LiveTrackingContext);
  if (!context) {
    throw new Error('useLiveTracking must be used within a LiveTrackingProvider');
  }
  return context;
};
