/**
 * ParaPo! Mobile App - Main Application Entry
 * "Ang Smart at Ligtas na Byahe Mo"
 * Expo React Native with TypeScript
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { TierProvider } from './src/context/TierContext';
import { LiveTrackingProvider } from './src/context/LiveTrackingContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <TierProvider>
        <LiveTrackingProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </LiveTrackingProvider>
      </TierProvider>
    </SafeAreaProvider>
  );
}
