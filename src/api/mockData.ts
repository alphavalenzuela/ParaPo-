/**
 * ParaPo! Mobile App - Mock Datasets
 * Realistic Philippine transit routes, terminals, landmarks, and emergency facilities.
 */

import { RouteOption, CommuterDensityReport } from '../types/transit';
import { EmergencyFacility } from '../types/safety';
import { PromptSuggestion } from '../types/assistant';

export const MOCK_POPULAR_LANDMARKS = [
  'Cubao Araneta Center (Farmer\'s Plaza)',
  'Philcoa (Commonwealth Ave / Masaya St)',
  'UP Diliman (Vinzon\'s Hall)',
  'SM City North EDSA / Trinoma',
  'Fairview Center Mall (FCM)',
  'Ayala Center Makati (One Ayala)',
  'Quiapo Church (Plaza Miranda)',
  'Taft Avenue (Pedro Gil / PGH)',
  'Anonas LRT-2 Station',
  'Katipunan Ave (Ateneo / Miriam)',
];

export const MOCK_ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-cubao-philcoa-jeep',
    title: 'Diretsong Traditional Jeepney',
    totalDistanceKm: 7.2,
    totalDurationMinutes: 28,
    totalEstimatedFare: 18.75,
    transferCount: 0,
    densityStatus: 'MODERATE',
    isRecommended: true,
    tags: ['Pinakamura', 'Diretsong Sakay', 'Frequent'],
    steps: [
      {
        id: 'step-1',
        mode: 'JEEPNEY_TRADITIONAL',
        routeName: 'Cubao - Philcoa / Lagro via Aurora Blvd & Commonwealth',
        signboardCode: 'PHILCOA / UP DILIMAN',
        originStop: {
          id: 'stop-cubao-farmers',
          name: 'Cubao Farmers Terminal',
          landmark: 'Katapat ng MRT Cubao Station',
          coordinates: { latitude: 14.6198, longitude: 121.0515 },
          isKnownTerminal: true,
        },
        destinationStop: {
          id: 'stop-philcoa-overpass',
          name: 'Philcoa Footbridge',
          landmark: 'Sa tapat ng dating Chowking Philcoa',
          coordinates: { latitude: 14.6534, longitude: 121.0531 },
          isKnownTerminal: false,
        },
        distanceKm: 7.2,
        estimatedMinutes: 28,
        instructions: 'Pumila sa tapat ng Farmer\'s Garden. Iabot ang barya sa driver o pasuyo sa katabi ("Pakisuyo po sa Philcoa").',
        fareEstimated: 18.75,
        currentDensity: 'MODERATE',
      },
    ],
  },
  {
    id: 'route-cubao-philcoa-multi',
    title: 'Modern Jeep + Toda Tricycle (Iwas Traffic)',
    totalDistanceKm: 6.8,
    totalDurationMinutes: 22,
    totalEstimatedFare: 36.00,
    transferCount: 1,
    densityStatus: 'LOW',
    tags: ['May Aircon', 'Mabilis'],
    steps: [
      {
        id: 'step-multi-1',
        mode: 'JEEPNEY_MODERN',
        routeName: 'MPUJ Cubao - Commonwealth Market',
        signboardCode: 'COMMONWEALTH / LITEX',
        originStop: {
          id: 'stop-cubao-modern',
          name: 'General Romulo Modern Jeep Bay',
          landmark: 'Ali Mall Transport Terminal',
          coordinates: { latitude: 14.6205, longitude: 121.0532 },
          isKnownTerminal: true,
        },
        destinationStop: {
          id: 'stop-qc-circle',
          name: 'Elliptical Road / Maharlika',
          landmark: 'QC Hall Gate',
          coordinates: { latitude: 14.6480, longitude: 121.0505 },
        },
        distanceKm: 5.5,
        estimatedMinutes: 16,
        instructions: 'Sumakay sa airconditioned modern PUJ. Pwedeng magbayad via beep card o cash sa konduktor.',
        fareEstimated: 18.30,
        currentDensity: 'LOW',
      },
      {
        id: 'step-multi-2',
        mode: 'TRICYCLE_TODA',
        routeName: 'City Hall TODA to Philcoa Terminal',
        signboardCode: 'TODA PILA',
        originStop: {
          id: 'stop-qc-circle',
          name: 'City Hall TODA Terminal',
          landmark: 'Sa tabi ng NHA Compound',
          coordinates: { latitude: 14.6480, longitude: 121.0505 },
          isKnownTerminal: true,
        },
        destinationStop: {
          id: 'stop-philcoa-overpass',
          name: 'Philcoa Masaya St',
          landmark: 'Terminal ng UP Ikot',
          coordinates: { latitude: 14.6534, longitude: 121.0531 },
        },
        distanceKm: 1.3,
        estimatedMinutes: 6,
        instructions: 'Sumakay sa TODA special o regular. Ihanda ang barya para sa tricycle driver.',
        fareEstimated: 17.70,
        currentDensity: 'LOW',
      },
    ],
  },
  {
    id: 'route-cubao-philcoa-uv',
    title: 'UV Express P2P / Direct Van',
    totalDistanceKm: 7.0,
    totalDurationMinutes: 25,
    totalEstimatedFare: 25.00,
    transferCount: 0,
    densityStatus: 'HEAVY',
    tags: ['Aircon Van', 'Point-to-Point'],
    steps: [
      {
        id: 'step-uv-1',
        mode: 'UV_EXPRESS',
        routeName: 'Cubao - Fairview via Commonwealth',
        signboardCode: 'FAIRVIEW / PHILCOA',
        originStop: {
          id: 'stop-cubao-uv',
          name: 'Araneta City UV Express Terminal',
          landmark: 'Ground Floor, Manhattan Parkview',
          coordinates: { latitude: 14.6210, longitude: 121.0528 },
          isKnownTerminal: true,
        },
        destinationStop: {
          id: 'stop-philcoa-drop',
          name: 'Philcoa Shell Station Drop-off',
          landmark: 'Harap ng Jollibee Philcoa',
          coordinates: { latitude: 14.6530, longitude: 121.0525 },
        },
        distanceKm: 7.0,
        estimatedMinutes: 25,
        instructions: 'Sabihin sa dispatcher "Philcoa isa po". Magbayad bago sumakay o bago umalis ang van.',
        fareEstimated: 25.00,
        currentDensity: 'HEAVY',
      },
    ],
  },
];

export const MOCK_NEARBY_EMERGENCY_FACILITIES: EmergencyFacility[] = [
  {
    id: 'fac-ecmc',
    name: 'East Avenue Medical Center (EAMC)',
    type: 'HOSPITAL',
    address: 'East Ave, Diliman, Quezon City',
    distanceKm: 1.2,
    phoneNumber: '(02) 8928-0611',
    coordinates: { latitude: 14.6406, longitude: 121.0494 },
    open24Hours: true,
  },
  {
    id: 'fac-phc',
    name: 'Philippine Heart Center - ER',
    type: 'HOSPITAL',
    address: 'East Ave cor. Matalino St, QC',
    distanceKm: 1.4,
    phoneNumber: '(02) 8925-2401',
    coordinates: { latitude: 14.6425, longitude: 121.0505 },
    open24Hours: true,
  },
  {
    id: 'fac-pnp-station9',
    name: 'PNP Police Station 9 (Anonas)',
    type: 'POLICE_STATION',
    address: 'Anonas St, Project 3, Quezon City',
    distanceKm: 1.8,
    phoneNumber: '(02) 8921-2741',
    coordinates: { latitude: 14.6295, longitude: 121.0638 },
    open24Hours: true,
  },
  {
    id: 'fac-pnp-station10',
    name: 'PNP Police Station 10 (Kamuning)',
    type: 'POLICE_STATION',
    address: 'EDSA cor. Kamuning Rd, Quezon City',
    distanceKm: 2.1,
    phoneNumber: '(02) 8927-4665',
    coordinates: { latitude: 14.6308, longitude: 121.0429 },
    open24Hours: true,
  },
  {
    id: 'fac-brgy-diliman',
    name: 'Barangay Central Emergency Rescue Base',
    type: 'BARANGAY_HALL',
    address: 'Matalino St, Central, Quezon City',
    distanceKm: 0.8,
    phoneNumber: '(02) 8926-1188',
    coordinates: { latitude: 14.6441, longitude: 121.0487 },
    open24Hours: true,
  },
];

export const MOCK_DENSITY_REPORTS: CommuterDensityReport[] = [
  {
    id: 'report-1',
    routeId: 'route-cubao-philcoa-jeep',
    transitMode: 'JEEPNEY_TRADITIONAL',
    densityLevel: 'MODERATE',
    timestamp: '2 mins ago',
    reportedBy: 'anon-782a',
    locationStopName: 'Cubao Farmers Terminal',
  },
  {
    id: 'report-2',
    routeId: 'route-cubao-philcoa-uv',
    transitMode: 'UV_EXPRESS',
    densityLevel: 'HEAVY',
    timestamp: '5 mins ago',
    reportedBy: 'anon-451f',
    locationStopName: 'Araneta City UV Bay',
  },
  {
    id: 'report-3',
    routeId: 'route-cubao-philcoa-multi',
    transitMode: 'JEEPNEY_MODERN',
    densityLevel: 'LOW',
    timestamp: '8 mins ago',
    reportedBy: 'anon-990c',
    locationStopName: 'Ali Mall Terminal',
  },
];

export const MOCK_PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: 'p-1',
    text: 'Magkano pamasahe sa traditional jeep mula Cubao hanggang Philcoa?',
    category: 'FARE',
  },
  {
    id: 'p-2',
    text: 'May 20% discount ba ang mga college students kapag weekends at holidays?',
    category: 'FARE',
  },
  {
    id: 'p-3',
    text: 'Saan ang sakayan ng UV Express mula Cubao pa-Fairview?',
    category: 'ROUTE',
  },
  {
    id: 'p-4',
    text: 'Paano mag-share ng live trip SMS sa aking nanay o kasama sa bahay?',
    category: 'SAFETY',
  },
];
