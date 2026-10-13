/**
 * ParaPo! Mobile App - ParaPo AI Assistant Screen
 * Chat UI interface template for transit and fare Q&A
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatMessage, PromptSuggestion } from '../../types/assistant';
import { assistantService } from '../../api/assistantService';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ASSISTANT',
    text: 'Kumusta! Ako si ParaPo AI, ang iyong gabay sa byahe. Pwede kang magtanong tungkol sa tamang pamasahe ayon sa LTFRB, sakayan ng jeep/UV/TODA, o safety features sa daan.',
    timestamp: 'Ngayon',
  },
];

export const AIAssistantScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    const s = await assistantService.getPromptSuggestions();
    setSuggestions(s);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const botResponse = await assistantService.sendMessage(query);
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage['suggestedActions']>[0]) => {
    switch (action.actionType) {
      case 'ESTIMATE_FARE':
        navigation.navigate('FareTab');
        break;
      case 'PLAN_ROUTE':
        navigation.navigate('RoutesTab');
        break;
      case 'CALL_EMERGENCY':
        navigation.navigate('EmergencyLocator');
        break;
      case 'OPEN_TRACKER':
        navigation.navigate('TrackerTab');
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header
        title="ParaPo AI Assistant"
        subtitle="Tanungan para sa pamasahe, ruta, at kaligtasan"
        showBrand={false}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggested Prompts Carousel */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Mga Karaniwang Tanong ng Commuter:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSendMessage(item.text)}
                style={styles.suggestionChip}
              >
                <Text style={styles.suggestionChipText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Message Stream */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                isUser ? styles.messageRowUser : styles.messageRowBot,
              ]}
            >
              {!isUser && (
                <View style={styles.botAvatar}>
                  <Ionicons name="sparkles" size={16} color="#FFF" />
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.bubbleUser : styles.bubbleBot,
                ]}
              >
                <Text style={[styles.messageText, isUser ? styles.textUser : styles.textBot]}>
                  {msg.text}
                </Text>

                {/* Interactive Action Buttons Attached to Response */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <View style={styles.actionsContainer}>
                    {msg.suggestedActions.map((action, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleActionClick(action)}
                        style={styles.actionBtn}
                      >
                        <Ionicons name="arrow-forward-circle" size={16} color={colors.primary} />
                        <Text style={styles.actionBtnText}>{action.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <Text style={[styles.timestamp, isUser ? styles.timeUser : styles.timeBot]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          );
        })}

        {isTyping && (
          <View style={[styles.messageRow, styles.messageRowBot]}>
            <View style={styles.botAvatar}>
              <Ionicons name="sparkles" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.bubbleBot, styles.typingBubble]}>
              <Text style={styles.typingText}>Nag-iisip si ParaPo AI...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Composer */}
      <View style={styles.composerBar}>
        <Input
          placeholder="Magtanong ukol sa byahe o pamasahe..."
          value={inputText}
          onChangeText={setInputText}
          containerStyle={{ flex: 1, marginVertical: 0 }}
          rightIcon={
            <TouchableOpacity
              onPress={() => handleSendMessage()}
              disabled={!inputText.trim()}
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            >
              <Ionicons name="send" size={18} color={inputText.trim() ? colors.primary : colors.textTertiary} />
            </TouchableOpacity>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  suggestionsContainer: {
    marginBottom: spacing.md,
  },
  suggestionsTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  suggestionsScroll: {
    flexDirection: 'row',
  },
  suggestionChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs + 2,
    maxWidth: 260,
  },
  suggestionChipText: {
    ...typography.micro,
    color: colors.primaryDark,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowBot: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '82%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...typography.body,
    lineHeight: 22,
  },
  textUser: {
    color: colors.textInverse,
  },
  textBot: {
    color: colors.textPrimary,
  },
  actionsContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
  },
  actionBtnText: {
    ...typography.micro,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 6,
  },
  timestamp: {
    ...typography.micro,
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeUser: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeBot: {
    color: colors.textTertiary,
  },
  typingBubble: {
    paddingVertical: spacing.sm,
  },
  typingText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  composerBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sendButton: {
    padding: spacing.xs,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});
