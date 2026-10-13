/**
 * ParaPo! Mobile App - Navigation Types
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { RouteOption } from '../types/transit';

export type MainTabParamList = {
  RoutesTab: undefined;
  FareTab: undefined;
  TrackerTab: undefined;
  AssistantTab: undefined;
  AccountTab: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  RouteDetail: { route: RouteOption };
  EmergencyLocator: undefined;
};
