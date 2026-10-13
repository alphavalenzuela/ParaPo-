/**
 * ParaPo! Mobile App - Account & Tier Subscription Context
 * Manages Basic Tier vs ParaPo Plus Tier state and feature gates.
 */

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { UserTier, TierFeatureConfig } from '../types/account';
import { TrustedContact } from '../types/safety';

interface TierContextType {
  tier: UserTier;
  config: TierFeatureConfig;
  trustedContacts: TrustedContact[];
  isOfflineModeActive: boolean;
  canAddMoreContacts: boolean;
  toggleTier: () => void;
  setTier: (tier: UserTier) => void;
  setOfflineModeActive: (active: boolean) => void;
  addTrustedContact: (contact: Omit<TrustedContact, 'id'>) => { success: boolean; error?: string };
  removeTrustedContact: (id: string) => void;
}

const TIER_CONFIGS: Record<UserTier, TierFeatureConfig> = {
  BASIC: {
    tier: 'BASIC',
    maxTrustedContacts: 1,
    isOfflineModeEnabled: false,
    hasAdBanners: true,
    hasPriorityDensityUpdates: false,
    badgeLabel: 'ParaPo Libre (Basic)',
  },
  PARAPO_PLUS: {
    tier: 'PARAPO_PLUS',
    maxTrustedContacts: -1, // Unlimited
    isOfflineModeEnabled: true,
    hasAdBanners: false,
    hasPriorityDensityUpdates: true,
    badgeLabel: 'ParaPo Plus ★',
  },
};

const INITIAL_CONTACTS: TrustedContact[] = [
  {
    id: 'tc-1',
    name: 'Nanay (Primary)',
    phoneNumber: '09171234567',
    relationship: 'Mother',
    isPrimary: true,
  },
];

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tier, setTierState] = useState<UserTier>('BASIC');
  const [isOfflineModeActive, setOfflineModeActive] = useState<boolean>(false);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>(INITIAL_CONTACTS);

  const config = useMemo(() => TIER_CONFIGS[tier], [tier]);

  const canAddMoreContacts = useMemo(() => {
    if (config.maxTrustedContacts === -1) return true;
    return trustedContacts.length < config.maxTrustedContacts;
  }, [config.maxTrustedContacts, trustedContacts.length]);

  const toggleTier = () => {
    // TODO: Implement backend integration with Apple App Store / Google Play In-App Purchases (StoreKit / BillingClient)
    setTierState((prev) => (prev === 'BASIC' ? 'PARAPO_PLUS' : 'BASIC'));
  };

  const setTier = (newTier: UserTier) => {
    setTierState(newTier);
  };

  const addTrustedContact = (contact: Omit<TrustedContact, 'id'>): { success: boolean; error?: string } => {
    if (!canAddMoreContacts) {
      return {
        success: false,
        error: 'Ang Basic tier ay limitado sa 1 trusted contact lamang. Mag-upgrade sa ParaPo Plus para sa unlimited contacts.',
      };
    }

    const newContact: TrustedContact = {
      ...contact,
      id: `tc-${Date.now().toString(36)}`,
    };

    // TODO: Implement backend integration to sync trusted contacts with secure cloud backup
    setTrustedContacts((prev) => [...prev, newContact]);
    return { success: true };
  };

  const removeTrustedContact = (id: string) => {
    // TODO: Implement backend integration to delete contact from user profile
    setTrustedContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <TierContext.Provider
      value={{
        tier,
        config,
        trustedContacts,
        isOfflineModeActive,
        canAddMoreContacts,
        toggleTier,
        setTier,
        setOfflineModeActive,
        addTrustedContact,
        removeTrustedContact,
      }}
    >
      {children}
    </TierContext.Provider>
  );
};

export const useTier = (): TierContextType => {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
};
