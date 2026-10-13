/**
 * ParaPo! Mobile App - ParaPo AI Assistant Service (Mock)
 * Filipino commuter guide for transit routes, LTFRB fare rules, and safety tips.
 */

import { ChatMessage, PromptSuggestion } from '../types/assistant';
import { MOCK_PROMPT_SUGGESTIONS } from './mockData';

export const assistantService = {
  /**
   * Get pre-configured prompt suggestions
   */
  async getPromptSuggestions(): Promise<PromptSuggestion[]> {
    return MOCK_PROMPT_SUGGESTIONS;
  },

  /**
   * Send question to ParaPo AI Assistant
   */
  async sendMessage(userText: string): Promise<ChatMessage> {
    // TODO: Implement backend integration with LLM / Gemini API for ParaPo AI Assistant
    // In production, integrate with a RAG pipeline loaded with LTFRB memorandums and Metro Manila transit maps.

    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = userText.toLowerCase();
        let reply = 'Magandang araw! Ako si ParaPo AI, ang iyong gabay sa byahe. Pwede mo akong tanungin ukol sa tamang pamasahe, sakayan ng dyip/UV, o safety tips sa kalsada.';
        let actions: ChatMessage['suggestedActions'] = [];

        if (lower.includes('pamasahe') || lower.includes('magkano') || lower.includes('fare')) {
          reply = 'Ayon sa pinakabagong LTFRB matrix:\n• Traditional Jeep: ₱13 base fare (unang 4km) + ₱1.80 bawat dagdag na km.\n• Modern Jeep: ₱15 base fare (unang 4km) + ₱2.20 bawat dagdag na km.\n• May 20% discount ang mga estudyante, senior citizens, at PWDs.';
          actions = [
            {
              label: 'Kalkulahin ang Pamasahe',
              actionType: 'ESTIMATE_FARE',
            },
          ];
        } else if (lower.includes('sakayan') || lower.includes('cubao') || lower.includes('philcoa') || lower.includes('paano pumunta')) {
          reply = 'Para sa rutang Cubao papuntang Philcoa:\n1. Sumakay sa traditional jeep sa tapat ng Farmers Plaza / Aurora Blvd na may karatulang "PHILCOA / UP DILIMAN" o "FAIRVIEW".\n2. Pamasahe ay humigit-kumulang ₱18.75 para sa 7.2 km.\n3. Bababa ka sa footbridge ng Philcoa.';
          actions = [
            {
              label: 'Tingnan ang Mapa ng Ruta',
              actionType: 'PLAN_ROUTE',
            },
          ];
        } else if (lower.includes('emergency') || lower.includes('pulis') || lower.includes('saklolo') || lower.includes('911')) {
          reply = 'Kung may emergency, tumawag agad sa National 911 o sa PNP 117. Maaari mo ring buksan ang aming Emergency Locator para sa pinakamalapit na ospital o presinto.';
          actions = [
            {
              label: 'Buksan ang Emergency Locator',
              actionType: 'CALL_EMERGENCY',
            },
          ];
        } else if (lower.includes('tracking') || lower.includes('nanay') || lower.includes('share') || lower.includes('safety')) {
          reply = 'Maaari mong i-share ang iyong live trip via SMS nang walang kailangang app ang iyong sinusulatan. I-click lamang ang Start Trip sa Ligtas Tracker.';
          actions = [
            {
              label: 'Pumunta sa Ligtas Tracker',
              actionType: 'OPEN_TRACKER',
            },
          ];
        }

        resolve({
          id: `msg-${Date.now()}`,
          sender: 'ASSISTANT',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: actions,
        });
      }, 500);
    });
  },
};
