import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const colors = {
  purple900: '#26215C',
  purple700: '#3C3489',
  purple600: '#534AB7',
  purple400: '#7F77DD',
  purple200: '#AFA9EC',
  purple100: '#CECBF6',
  purple50: '#EEEDFE',
  teal900: '#04342C',
  teal800: '#085041',
  teal100: '#9FE1CB',
  gold300: '#F3C969',
  bg: '#FFFFFF',
  surface: '#F7F7F9',
  border: '#E7E6E9',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B70',
  textMuted: '#9B9AA0',
  white: '#FFFFFF',
} as const;

interface Account {
  initials: string;
  greeting: string;
  name: string;
  balance: number;
  accountNumber: string;
  bankName: string;
  tier: string;
  points: number;
}

interface TransferDetails {
  to: string;
  bank: string;
  amount: number;
}

type ConfirmOutcome = 'confirmed' | 'cancelled';

interface DateMessage {
  id: string;
  type: 'date';
  text: string;
}

interface BotMessage {
  id: string;
  type: 'bot';
  text: string;
}

interface UserMessage {
  id: string;
  type: 'user';
  text: string;
}

interface ConfirmMessage {
  id: string;
  type: 'confirm';
  text: string;
  details: TransferDetails;
  resolved: boolean;
  outcome?: ConfirmOutcome;
}

type ChatMessage = DateMessage | BotMessage | UserMessage | ConfirmMessage;

const ACCOUNT: Account = {
  initials: 'OO',
  greeting: 'Good afternoon',
  name: 'Olamide Oladele',
  balance: 482150,
  accountNumber: '0123456789',
  bankName: 'Nomba',
  tier: 'Hustler',
  points: 1240,
};

const initialMessages: ChatMessage[] = [
  { id: 'd1', type: 'date', text: 'Today' },
  {
    id: 'm1',
    type: 'bot',
    text: "Hey Olamide — try \"send 5k to Femi\" or \"or perform any transaction\" and I'll handle it.",
  },
  { id: 'm2', type: 'user', text: 'send 15,000 to Amaka, GTBank' },
  {
    id: 'm3',
    type: 'confirm',
    text: 'Confirm this transfer',
    details: {
      to: 'Amaka Nwosu',
      bank: 'GTBank · 0089213456',
      amount: 15000,
    },
    resolved: false,
  },
];

const formatMoney = (value: number): string =>
  '₦' + Number(value).toLocaleString('en-NG', { maximumFractionDigits: 0 });

const formatPoints = (value: number): string => Number(value).toLocaleString('en-NG');


interface ChatHeaderProps {
  account: Account;
  balanceHidden: boolean;
  onToggleBalance: () => void;
  topInset: number;
}

function ChatHeader({ account, balanceHidden, onToggleBalance, }: ChatHeaderProps) {
  return (
    <View style={[styles.header]}>
      <View style={styles.headerTopRow}>
        <View style={styles.headerUser}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{account.initials}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>{account.greeting}</Text>
            <Text style={styles.userName}>{account.name}</Text>
          </View>
        </View>
        <View style={styles.tierChip}>
          <Feather name="award" size={12} color={colors.gold300} />
          <Text style={styles.tierChipText}>{account.tier}</Text>
        </View>
      </View>

      <Text style={styles.balanceLabel}>Available balance</Text>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceValue}>
          {balanceHidden ? '••••••' : formatMoney(account.balance)}
        </Text>
        <TouchableOpacity onPress={onToggleBalance} accessibilityLabel="Toggle balance visibility">
          <Feather name={balanceHidden ? 'eye-off' : 'eye'} size={16} color={colors.purple200} />
        </TouchableOpacity>
      </View>

      <View style={styles.chipRow}>
        <View style={styles.accountChip}>
          <View style={styles.accountDot} />
          <Text style={styles.accountChipText}>{account.name}</Text>
          <Text style={styles.accountChipMuted}>{account.accountNumber}</Text>
          <Text style={styles.accountChipMuted}>·</Text>
          <Text style={styles.accountChipMuted}>{account.bankName}</Text>
        </View>
        <View style={styles.pointsChip}>
          <Feather name="zap" size={12} color={colors.purple100} />
          <Text style={styles.pointsChipText}>{formatPoints(account.points)} XP</Text>
        </View>
      </View>
    </View>
  );
}

function DateSeparator({ text }: { text: string }) {
  return <Text style={styles.dateSeparator}>{text.toUpperCase()}</Text>;
}

function BotBubble({ text }: { text: string }) {
  return (
    <View style={[styles.bubble, styles.botBubble]}>
      <Text style={styles.botText}>{text}</Text>
    </View>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <View style={[styles.bubble, styles.userBubble]}>
      <Text style={styles.userText}>{text}</Text>
    </View>
  );
}

function SuccessBubble({ text }: { text: string }) {
  return (
    <View style={[styles.bubble, styles.successBubble]}>
      <Feather name="check" size={14} color={colors.teal100} />
      <Text style={styles.successText}>{text}</Text>
    </View>
  );
}

interface ConfirmCardProps {
  message: ConfirmMessage;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

function ConfirmCard({ message, onConfirm, onCancel }: ConfirmCardProps) {
  const { details, resolved, outcome, id, text } = message;

  if (resolved) {
    return (
      <SuccessBubble
        text={
          outcome === 'confirmed'
            ? `Sent. ${formatMoney(details.amount)} to ${details.to}.`
            : 'Transfer cancelled.'
        }
      />
    );
  }

  return (
    <View style={[styles.bubble, styles.botBubble, styles.confirmBubble]}>
      <Text style={styles.confirmTitle}>{text}</Text>
      <View style={styles.confirmDetailsBox}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>To</Text>
          <Text style={styles.confirmValue}>{details.to}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Bank</Text>
          <Text style={styles.confirmValue}>{details.bank}</Text>
        </View>
        <View style={[styles.confirmRow, styles.confirmAmountRow]}>
          <Text style={styles.confirmLabel}>Amount</Text>
          <Text style={styles.confirmAmountValue}>{formatMoney(details.amount)}</Text>
        </View>
      </View>
      <View style={styles.confirmActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(id)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => onConfirm(id)}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface MessageRowProps {
  item: ChatMessage;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

function MessageRow({ item, onConfirm, onCancel }: MessageRowProps) {
  switch (item.type) {
    case 'date':
      return <DateSeparator text={item.text} />;
    case 'bot':
      return <BotBubble text={item.text} />;
    case 'user':
      return <UserBubble text={item.text} />;
    case 'confirm':
      return <ConfirmCard message={item} onConfirm={onConfirm} onCancel={onCancel} />;
    default:
      return null;
  }
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [balanceHidden, setBalanceHidden] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const insets = useSafeAreaInsets();

  const tabBarHeight = useBottomTabBarHeight();

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, []);

  const handleConfirm = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, resolved: true, outcome: 'confirmed' } : m)),
      );
      scrollToEnd();

    },
    [scrollToEnd],
  );

  const handleCancel = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, resolved: true, outcome: 'cancelled' } : m)),
      );
      scrollToEnd();
    },
    [scrollToEnd],
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: UserMessage = { id: `u-${Date.now()}`, type: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    scrollToEnd();
  }, [input, scrollToEnd]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ChatMessage>) => (
      <MessageRow item={item} onConfirm={handleConfirm} onCancel={handleCancel} />
    ),
    [handleConfirm, handleCancel],
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ChatHeader
        account={ACCOUNT}
        balanceHidden={balanceHidden}
        onToggleBalance={() => setBalanceHidden((v) => !v)}
      />
      

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          onContentSizeChange={scrollToEnd}
        />

        <View style={[styles.inputBar, { marginBottom: tabBarHeight + 12 }]}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Send money, pay a bill, check balance..."
            placeholderTextColor={colors.textMuted}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!input.trim()}
            accessibilityLabel="Send message"
          >
            <Feather name="arrow-up" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },

  header: {
  backgroundColor: colors.purple900,
  paddingHorizontal: 18,
  paddingTop: 0,
  paddingBottom: 20,
},
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerUser: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.purple600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.purple50, fontWeight: '600', fontSize: 13 },
  greeting: { color: colors.purple200, fontSize: 12 },
  userName: { color: colors.purple50, fontSize: 15, fontWeight: '600' },
  tierChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(243,201,105,0.15)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tierChipText: { color: colors.gold300, fontSize: 12, fontWeight: '600' },
  balanceLabel: { color: colors.purple200, fontSize: 12, marginBottom: 2 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  balanceValue: { color: colors.white, fontSize: 30, fontWeight: '700', letterSpacing: -0.3 },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  accountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  accountDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.purple400 },
  accountChipText: { color: colors.purple50, fontSize: 12 },
  accountChipMuted: { color: colors.purple200, fontSize: 12 },
  pointsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  pointsChipText: { color: colors.purple100, fontSize: 12, fontWeight: '600' },

  // Chat list
  listContent: { padding: 16, gap: 12 },
  dateSeparator: {
    alignSelf: 'center',
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bubble: { maxWidth: '82%', borderRadius: 16, paddingVertical: 11, paddingHorizontal: 14, marginBottom: 12 },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
  },
  botText: { color: colors.textPrimary, fontSize: 14, lineHeight: 20 },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.purple900,
    borderTopRightRadius: 4,
  },
  userText: { color: colors.purple50, fontSize: 14, lineHeight: 20 },
  successBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.teal800,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  successText: { color: colors.teal100, fontSize: 14 },

  // Confirm card
  confirmBubble: { paddingVertical: 4, paddingHorizontal: 4 },
  confirmTitle: { fontSize: 14, color: colors.textPrimary, padding: 8 },
  confirmDetailsBox: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  confirmRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  confirmLabel: { color: colors.textMuted, fontSize: 13 },
  confirmValue: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  confirmAmountRow: {
    marginBottom: 0,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  confirmAmountValue: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  confirmActions: { flexDirection: 'row', gap: 8, padding: 8 },
  cancelButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelButtonText: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  confirmButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: colors.purple900,
    alignItems: 'center',
  },
  confirmButtonText: { color: colors.purple50, fontSize: 13, fontWeight: '600' },

  
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    marginHorizontal: 12
  },
  input: { flex: 1, fontSize: 14, color: colors.textPrimary, paddingVertical: 8 },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.purple900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { opacity: 0.4 },
});