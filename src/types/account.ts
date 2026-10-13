/**
 * ParaPo! Mobile App - Account & Tier Subscription Types
 */

import { TrustedContact } from './safety';

export type UserTier = 'BASIC' | 'PARAPO_PLUS';

export interface TierFeatureConfig {
  tier: UserTier;
  maxTrustedContacts: number; // 1 for BASIC, unlimited (-1) for PLUS
  isOfflineModeEnabled: boolean;
  hasAdBanners: boolean;
  hasPriorityDensityUpdates: boolean;
  badgeLabel: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  tier: UserTier;
  discountVerified: boolean;
  discountType: 'REGULAR' | 'STUDENT' | 'SENIOR' | 'PWD';
  trustedContacts: TrustedContact[];
}
