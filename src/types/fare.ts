/**
 * ParaPo! Mobile App - Fare & LTFRB Matrix Types
 */

import { TransitModeType } from './transit';

export type DiscountType = 'REGULAR' | 'STUDENT' | 'SENIOR' | 'PWD';

export interface LTFRBRateRule {
  mode: TransitModeType;
  modeLabel: string;
  baseFare: number;              // Initial base fare (₱)
  baseDistanceKm: number;        // First N km covered by base fare (usually 4.0 km)
  succeedingKmRate: number;      // Per km rate thereafter (₱)
  effectiveDate: string;         // LTFRB Memorandum Circular date
  minimumShortTripFare?: number; // Special rule for Tricycles/TODAs
}

export interface FareCalculationInput {
  mode: TransitModeType;
  distanceKm: number;
  discountType: DiscountType;
}

export interface FareBreakdown {
  mode: TransitModeType;
  modeLabel: string;
  distanceKm: number;
  baseFare: number;
  baseDistanceKm: number;
  succeedingDistanceKm: number;
  succeedingRate: number;
  succeedingFare: number;
  subtotalFare: number;
  discountType: DiscountType;
  discountPercent: number; // e.g. 0.20 (20%)
  discountAmount: number;
  finalFare: number; // Rounded according to PH transport conventions
  currency: 'PHP';
}
