/**
 * ParaPo! Mobile App - Transit & Route Types
 * Philippine Informal & Formal Transit Specifications
 */

export type TransitModeType = 
  | 'JEEPNEY_TRADITIONAL'
  | 'JEEPNEY_MODERN'
  | 'TRICYCLE_TODA'
  | 'UV_EXPRESS'
  | 'BUS_ORDINARY'
  | 'BUS_AIRCON';

export type RouteDensityLevel = 'LOW' | 'MODERATE' | 'HEAVY' | 'FULL_STANDBY';

export interface TransitStop {
  id: string;
  name: string;
  landmark?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isKnownTerminal?: boolean;
}

export interface TransitLegStep {
  id: string;
  mode: TransitModeType;
  routeName: string; // e.g. "Cubao - Philcoa via Aurora Blvd"
  signboardCode?: string; // e.g. "PHILCOA / UP DILIMAN"
  originStop: TransitStop;
  destinationStop: TransitStop;
  distanceKm: number;
  estimatedMinutes: number;
  instructions: string; // e.g. "Sumakay sa tapat ng Ali Mall. Iabot ang bayad pagkasakay."
  fareEstimated: number;
  currentDensity: RouteDensityLevel;
}

export interface RouteOption {
  id: string;
  title: string; // e.g. "Pinakamabilis via UV Express" or "Tipid Route via Trad Jeep"
  totalDistanceKm: number;
  totalDurationMinutes: number;
  totalEstimatedFare: number;
  transferCount: number;
  densityStatus: RouteDensityLevel;
  steps: TransitLegStep[];
  isRecommended?: boolean;
  tags?: string[]; // ['Fastest', 'Cheapest', 'Fewest Transfers']
}

export interface CommuterDensityReport {
  id: string;
  routeId: string;
  transitMode: TransitModeType;
  densityLevel: RouteDensityLevel;
  timestamp: string;
  reportedBy: string; // anonymous hash
  locationStopName: string;
}
