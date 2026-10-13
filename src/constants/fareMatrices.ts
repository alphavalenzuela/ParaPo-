/**
 * ParaPo! Mobile App - LTFRB Fare Rate Matrices
 * Official Fare Formula: Fare = BaseFare + max(0, DistanceKm - BaseDistanceKm) * SucceedingRate
 * Discount Formula: FinalFare = Fare * (1 - 0.20) for Student / Senior / PWD
 */

import { TransitModeType } from '../types/transit';
import { LTFRBRateRule } from '../types/fare';

export const LTFRB_RATE_RULES: Record<TransitModeType, LTFRBRateRule> = {
  JEEPNEY_TRADITIONAL: {
    mode: 'JEEPNEY_TRADITIONAL',
    modeLabel: 'Traditional Public Utility Jeepney (PUJ)',
    baseFare: 13.00,
    baseDistanceKm: 4.0,
    succeedingKmRate: 1.80,
    effectiveDate: 'October 2023 LTFRB MC',
  },
  JEEPNEY_MODERN: {
    mode: 'JEEPNEY_MODERN',
    modeLabel: 'Modern Public Utility Jeepney (MPUJ)',
    baseFare: 15.00,
    baseDistanceKm: 4.0,
    succeedingKmRate: 2.20,
    effectiveDate: 'October 2023 LTFRB MC',
  },
  TRICYCLE_TODA: {
    mode: 'TRICYCLE_TODA',
    modeLabel: 'Tricycle (Local TODA Ordinance Matrix)',
    baseFare: 15.00,
    baseDistanceKm: 1.0,
    succeedingKmRate: 5.00,
    effectiveDate: 'Local City Ordinance 2024',
    minimumShortTripFare: 15.00,
  },
  UV_EXPRESS: {
    mode: 'UV_EXPRESS',
    modeLabel: 'UV Express Service',
    baseFare: 15.00,
    baseDistanceKm: 4.0,
    succeedingKmRate: 2.50,
    effectiveDate: 'LTFRB Fare Matrix 2023',
  },
  BUS_ORDINARY: {
    mode: 'BUS_ORDINARY',
    modeLabel: 'Ordinary Public Utility Bus (PUB)',
    baseFare: 15.00,
    baseDistanceKm: 5.0,
    succeedingKmRate: 2.65,
    effectiveDate: 'LTFRB City Bus Matrix',
  },
  BUS_AIRCON: {
    mode: 'BUS_AIRCON',
    modeLabel: 'Airconditioned Public Utility Bus (PUB)',
    baseFare: 17.00,
    baseDistanceKm: 5.0,
    succeedingKmRate: 3.10,
    effectiveDate: 'LTFRB City Bus Matrix',
  },
};

export const DISCOUNT_RATES = {
  REGULAR: 0.0,
  STUDENT: 0.20, // 20% mandated by Republic Act No. 11314
  SENIOR: 0.20,  // 20% mandated by Republic Act No. 9994
  PWD: 0.20,     // 20% mandated by Republic Act No. 10754
};
