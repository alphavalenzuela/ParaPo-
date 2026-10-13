/**
 * ParaPo! Mobile App - Emergency Locator Service (Mock)
 * Philippine emergency facilities, hospitals, PNP stations, 911 hotlines
 */

import { EmergencyFacility, EmergencyContactInfo } from '../types/safety';
import { NATIONAL_EMERGENCY_CONTACTS } from '../constants/emergencyContacts';
import { MOCK_NEARBY_EMERGENCY_FACILITIES } from './mockData';

export const emergencyService = {
  /**
   * Get national hotlines (911, PNP 117, MMDA 136, Red Cross 143)
   */
  async getNationalContacts(): Promise<EmergencyContactInfo[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(NATIONAL_EMERGENCY_CONTACTS), 100);
    });
  },

  /**
   * Get nearby hospitals, police stations, and emergency facilities
   */
  async getNearbyFacilities(coords?: { latitude: number; longitude: number }): Promise<EmergencyFacility[]> {
    // TODO: Implement backend integration with GIS database or Google Places / Overpass OpenStreetMap API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NEARBY_EMERGENCY_FACILITIES);
      }, 300);
    });
  },

  /**
   * Dispatch stub for automated emergency ping
   */
  async triggerEmergencySignal(params: {
    tripId?: string;
    coordinates?: { latitude: number; longitude: number };
    message?: string;
  }): Promise<{ success: boolean; alertId: string }> {
    // TODO: Implement backend integration with NDRRMC / 911 dispatch webhook or trusted contact SMS gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          alertId: `alert-${Date.now().toString(36)}`,
        });
      }, 400);
    });
  },
};
