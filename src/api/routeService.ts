/**
 * ParaPo! Mobile App - Route Matching Service (Mock)
 * Philippine Informal Transit (Jeepney, TODA, UV Express, Bus)
 */

import { RouteOption } from '../types/transit';
import { MOCK_ROUTE_OPTIONS } from './mockData';

export interface RouteSearchQuery {
  origin: string;
  destination: string;
  preferredModes?: string[];
}

export const routeService = {
  /**
   * Search for multi-modal transit routes between two points
   */
  async searchRoutes(query: RouteSearchQuery): Promise<RouteOption[]> {
    // TODO: Implement backend integration with routing API (e.g. OpenTripPlanner or custom Philippine transit routing engine)
    // Example: const response = await apiClient.post('/api/v1/routes/match', query);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        // Return realistic mock routes filtered or adjusted
        resolve(MOCK_ROUTE_OPTIONS);
      }, 400);
    });
  },

  /**
   * Get specific route details by ID
   */
  async getRouteById(routeId: string): Promise<RouteOption | null> {
    // TODO: Implement backend integration to fetch cached route path, geometry, and real-time stops
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = MOCK_ROUTE_OPTIONS.find((r) => r.id === routeId) || null;
        resolve(found);
      }, 200);
    });
  },

  /**
   * Get popular origin/destination suggestions
   */
  async getPopularStops(): Promise<string[]> {
    // TODO: Implement backend integration for geocoding and recent landmark popularity
    return [
      'Cubao Araneta Center',
      'Philcoa Footbridge',
      'UP Diliman',
      'Fairview Center Mall',
      'One Ayala Makati',
      'Quiapo Church',
    ];
  },
};
