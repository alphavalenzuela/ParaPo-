/**
 * ParaPo! Mobile App - Live Route Density Service (Mock)
 * Anonymous commuter density check-ins and crowd-sourced status
 */

import { CommuterDensityReport, RouteDensityLevel, TransitModeType } from '../types/transit';
import { MOCK_DENSITY_REPORTS } from './mockData';

export interface SubmitDensityPayload {
  routeId: string;
  transitMode: TransitModeType;
  densityLevel: RouteDensityLevel;
  locationStopName: string;
}

export const densityService = {
  /**
   * Get latest density reports for a specific route or general area
   */
  async getDensityReports(routeId?: string): Promise<CommuterDensityReport[]> {
    // TODO: Implement backend integration with real-time crowd-sourced density ingestion
    // In production, aggregate commuter reports using a sliding 30-minute window
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!routeId) {
          resolve(MOCK_DENSITY_REPORTS);
        } else {
          resolve(MOCK_DENSITY_REPORTS.filter((r) => r.routeId === routeId));
        }
      }, 250);
    });
  },

  /**
   * Submit an anonymous commuter density check-in ("On Route")
   */
  async submitCheckIn(payload: SubmitDensityPayload): Promise<{ success: boolean; reportId: string }> {
    // TODO: Implement backend integration to store report anonymously (no PII, rate-limited by IP/device fingerprint)
    return new Promise((resolve) => {
      setTimeout(() => {
        const reportId = `report-${Date.now().toString(36)}`;
        resolve({ success: true, reportId });
      }, 300);
    });
  },
};
