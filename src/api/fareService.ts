/**
 * ParaPo! Mobile App - Fare Service (Mock)
 * Calculator based on LTFRB rates with 20% discount support
 */

import { FareCalculationInput, FareBreakdown, LTFRBRateRule } from '../types/fare';
import { calculateFare } from '../utils/fareCalculator';
import { LTFRB_RATE_RULES } from '../constants/fareMatrices';

export const fareService = {
  /**
   * Calculate fare based on distance and mode
   */
  async computeFare(input: FareCalculationInput): Promise<FareBreakdown> {
    // TODO: Implement backend integration for live LTFRB fare matrix updates
    // In production, this can also sync dynamic fuel surcharge adjustments or local TODA fare matrices.
    return new Promise((resolve) => {
      setTimeout(() => {
        const breakdown = calculateFare(input);
        resolve(breakdown);
      }, 150);
    });
  },

  /**
   * Fetch current official LTFRB fare matrix rules
   */
  async getActiveFareMatrices(): Promise<Record<string, LTFRBRateRule>> {
    // TODO: Implement backend integration to fetch updated LTFRB Memorandum Circular rates
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(LTFRB_RATE_RULES);
      }, 200);
    });
  },
};
