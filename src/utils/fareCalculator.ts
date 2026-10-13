/**
 * ParaPo! Mobile App - LTFRB Fare Calculation Engine
 * 
 * Formula:
 * Subtotal = BaseFare + (max(0, DistanceKm - BaseDistanceKm) * SucceedingKmRate)
 * Discount = Subtotal * DiscountRate (20% for Student/Senior/PWD)
 * Final Fare = Subtotal - Discount
 */

import { LTFRB_RATE_RULES, DISCOUNT_RATES } from '../constants/fareMatrices';
import { FareCalculationInput, FareBreakdown } from '../types/fare';

export function calculateFare(input: FareCalculationInput): FareBreakdown {
  const { mode, distanceKm, discountType } = input;
  const rule = LTFRB_RATE_RULES[mode];

  if (!rule) {
    throw new Error(`Unsupported transit mode: ${mode}`);
  }

  const normalizedDistance = Math.max(0, Number(distanceKm) || 0);
  const baseFare = rule.baseFare;
  const baseDistanceKm = rule.baseDistanceKm;
  const succeedingRate = rule.succeedingKmRate;

  // Calculate succeeding distance beyond the base distance
  const succeedingDistanceKm = Math.max(0, normalizedDistance - baseDistanceKm);
  const succeedingFare = succeedingDistanceKm * succeedingRate;

  // Raw subtotal fare before discount
  let subtotalFare = baseFare + succeedingFare;

  // Ensure minimum short trip fare if defined (e.g. Tricycles)
  if (rule.minimumShortTripFare && subtotalFare < rule.minimumShortTripFare) {
    subtotalFare = rule.minimumShortTripFare;
  }

  // Discount computation (20% for Student, Senior, PWD)
  const discountPercent = DISCOUNT_RATES[discountType] || 0.0;
  const rawDiscountAmount = subtotalFare * discountPercent;

  // Philippine round-off convention: Round to 2 decimal places or nearest 50 centavos
  const finalFare = Math.round((subtotalFare - rawDiscountAmount) * 100) / 100;
  const discountAmount = Math.round(rawDiscountAmount * 100) / 100;

  return {
    mode,
    modeLabel: rule.modeLabel,
    distanceKm: normalizedDistance,
    baseFare,
    baseDistanceKm,
    succeedingDistanceKm: Math.round(succeedingDistanceKm * 100) / 100,
    succeedingRate,
    succeedingFare: Math.round(succeedingFare * 100) / 100,
    subtotalFare: Math.round(subtotalFare * 100) / 100,
    discountType,
    discountPercent,
    discountAmount,
    finalFare,
    currency: 'PHP',
  };
}
