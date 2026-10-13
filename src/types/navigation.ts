/**
 * ParaPo! Mobile App - Navigation Param List Types
 */

import { RouteOption } from './transit';

export type RootStackParamList = {
  MainTabs: undefined;
  RouteDetail: { route: RouteOption };
  EmergencyLocator: undefined;
  DensityCheckIn: { routeId?: string; routeName?: string };
  ShareTrip: undefined;
};

export type MainTabParamList = {
  RoutesTab: undefined;
  FareTab: undefined;
  TrackerTab: undefined;
  AssistantTab: undefined;
  AccountTab: undefined;
};
