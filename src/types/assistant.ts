/**
 * ParaPo! Mobile App - AI Assistant Types
 * Tagalog/English Commuter Q&A Interface
 */

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT' | 'SYSTEM';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'PLAN_ROUTE' | 'ESTIMATE_FARE' | 'CALL_EMERGENCY' | 'OPEN_TRACKER';
    payload?: Record<string, any>;
  }[];
}

export interface PromptSuggestion {
  id: string;
  text: string;
  category: 'FARE' | 'ROUTE' | 'SAFETY' | 'COMMUTE_TIPS';
}
