/**
 * ParaPo! Mobile App - Bottom Tab Navigation
 * 5 Core Philippine Commuter Modules:
 * 1. Plan Byahe (Routes & Density)
 * 2. Pamasahe (LTFRB Calculator)
 * 3. Ligtas Tracker (Safety & Live SMS)
 * 4. ParaPo AI (Transit Assistant)
 * 5. Account (Plus & Contacts)
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import { RoutePlannerScreen } from '../screens/routes/RoutePlannerScreen';
import { FareEstimatorScreen } from '../screens/fares/FareEstimatorScreen';
import { LiveTrackerScreen } from '../screens/safety/LiveTrackerScreen';
import { AIAssistantScreen } from '../screens/assistant/AIAssistantScreen';
import { AccountScreen } from '../screens/account/AccountScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="RoutesTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="RoutesTab"
        component={RoutePlannerScreen}
        options={{
          tabBarLabel: 'Plan Byahe',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FareTab"
        component={FareEstimatorScreen}
        options={{
          tabBarLabel: 'Pamasahe',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TrackerTab"
        component={LiveTrackerScreen}
        options={{
          tabBarLabel: 'Ligtas Tracker',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AssistantTab"
        component={AIAssistantScreen}
        options={{
          tabBarLabel: 'ParaPo AI',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size - 2} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
