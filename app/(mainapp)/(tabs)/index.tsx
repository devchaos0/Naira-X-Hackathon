import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const colors = {
  purple900: "#26215C",
  purple700: "#3C3489",
  purple600: "#534AB7",
  purple400: "#7F77DD",
  purple200: "#AFA9EC",
  purple100: "#CECBF6",
  purple50: "#EEEDFE",
  teal900: "#04342C",
  teal800: "#085041",
  teal100: "#9FE1CB",
  gold300: "#F3C969",
  bg: "#FFFFFF",
  surface: "#F7F7F9",
  border: "#E7E6E9",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B70",
  textMuted: "#9B9AA0",
  white: "#FFFFFF",
} as const;

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  gold: "#E4A93B",
  goldLight: "#FBEED2",
  bg: "#FFFFFF",
  surface: "#F8F7FC",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
  success: "#1F9254",
  successBg: "#E4F5EA",
  danger: "#D8384B",
  dangerBg: "#FBE7EA",
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

const ACCOUNT: Account = {
  initials: "OO",
  greeting: "Good afternoon",
  name: "Olamide Oladele",
  balance: 482150,
  accountNumber: "0123456789",
  bankName: "Nomba",
  tier: "Hustler",
  points: 1240,
};

interface ChatHeaderProps {
  account: Account;
  balanceHidden: boolean;
  onToggleBalance: () => void;
  topInset: number;
}

interface TransactionItemProps {
  title: string;
  category: string;
  amount: string;
  time: string;
  positive?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const formatPoints = (value: number): string =>
  Number(value).toLocaleString("en-NG");

const formatMoney = (value: number): string =>
  "₦" + Number(value).toLocaleString("en-NG", { maximumFractionDigits: 0 });

const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";
``;

function ChatHeader({
  account,
  balanceHidden,
  onToggleBalance,
}: ChatHeaderProps) {
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
          {balanceHidden ? "••••••" : formatMoney(account.balance)}
        </Text>
        <TouchableOpacity
          onPress={onToggleBalance}
          accessibilityLabel="Toggle balance visibility"
        >
          <Feather
            name={balanceHidden ? "eye-off" : "eye"}
            size={16}
            color={colors.purple200}
          />
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
          <Text style={styles.pointsChipText}>
            {formatPoints(account.points)} XP
          </Text>
        </View>
      </View>
    </View>
  );
}

function TransactionItem({
  title,
  category,
  amount,
  time,
  positive,
  icon,
}: TransactionItemProps) {
  const tint = positive ? palette.success : palette.danger;
  const tintBg = positive ? palette.successBg : palette.dangerBg;

  return (
    <View style={styles.activity}>
      <View style={[styles.activityIcon, { backgroundColor: tintBg }]}>
        <Ionicons name={icon} size={20} color={tint} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{category}</Text>
        </View>
      </View>

      <View style={styles.amountBox}>
        <Text style={[styles.activityAmount, { color: tint }]}>{amount}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

function MoneySummary() {
  return (
    <View style={styles.moneyRow}>
      <View style={styles.moneyCard}>
        <View
          style={[styles.moneyIcon, { backgroundColor: palette.successBg }]}
        >
          <Ionicons name="arrow-down" size={18} color={palette.success} />
        </View>
        <Text style={styles.moneyLabel}>Total credit</Text>
        <Text style={styles.moneyValue}>₦450,000</Text>
      </View>

      <View style={styles.moneyCard}>
        <View style={[styles.moneyIcon, { backgroundColor: palette.dangerBg }]}>
          <Ionicons name="arrow-up" size={18} color={palette.danger} />
        </View>
        <Text style={styles.moneyLabel}>Total debit</Text>
        <Text style={styles.moneyValue}>₦120,500</Text>
      </View>
    </View>
  );
}

export default function Chat() {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ChatHeader
        account={ACCOUNT}
        balanceHidden={balanceHidden}
        onToggleBalance={() => setBalanceHidden((v) => !v)}
      />
      <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 20 }}>
        <View style={styles.quickActionRow}>
          <Pressable onPress={() => router.navigate("/chat")} style={styles.actionCard}>
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: palette.goldLight },
              ]}
            >
              <Feather name="send" size={18} color={palette.gold} />
            </View>
            <Text style={styles.actionTitle}>Chat transfer</Text>
            <Text style={styles.actionSubtitle}>Send money through chat</Text>
          </Pressable>
          <Pressable onPress={() => router.navigate("/fundme")} style={styles.actionCard}>
            <View
              style={[styles.actionIcon, { backgroundColor: colors.purple100 }]}
            >
              <Ionicons name="cash" size={18} color={colors.purple700} />
            </View>
            <Text style={styles.actionTitle}>Fund me</Text>
            <Text style={styles.actionSubtitle}>View bank & account info</Text>
          </Pressable>
        </View>
        {/* <MoneySummary /> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction history</Text>
          <View style={styles.historyCard}>
            <TransactionItem
              title="Wallet funding"
              category="Deposit"
              amount="+ ₦50,000"
              time="2m ago"
              positive
              icon="wallet"
            />
            <TransactionItem
              title="Sent to John"
              category="Transfer"
              amount="- ₦15,000"
              time="1h ago"
              icon="paper-plane"
            />
            <TransactionItem
              title="Netflix"
              category="Subscription"
              amount="- ₦4,500"
              time="Yesterday"
              icon="play"
            />
            <TransactionItem
              title="Cashback reward"
              category="Reward"
              amount="+ ₦2,000"
              time="3 days ago"
              positive
              icon="gift"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  header: {
    backgroundColor: colors.purple900,
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerUser: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.purple600,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.purple50, fontWeight: "600", fontSize: 13 },
  greeting: { color: colors.purple200, fontSize: 12 },
  userName: { color: colors.purple50, fontSize: 15, fontWeight: "600" },
  tierChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(243,201,105,0.15)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tierChipText: { color: colors.gold300, fontSize: 12, fontWeight: "600" },

  balanceLabel: { color: colors.purple200, fontSize: 12, marginBottom: 2 },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  balanceValue: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  accountChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  accountDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.purple400,
  },
  accountChipText: { color: colors.purple50, fontSize: 12 },
  accountChipMuted: { color: colors.purple200, fontSize: 12 },
  pointsChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  pointsChipText: { color: colors.purple100, fontSize: 12, fontWeight: "600" },

  // Money summary
  moneyRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
  moneyCard: {
    flex: 1,
    backgroundColor: palette.bg,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.hairline,
  },
  moneyIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  moneyLabel: { color: palette.muted, fontSize: 12 },
  quickActionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: palette.bg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.hairline,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.ink,
    marginBottom: 4,
    textAlign: "center",
  },
  actionSubtitle: {
    fontSize: 12,
    color: palette.muted,
    lineHeight: 18,
    textAlign: "center",
  },
  moneyValue: {
    fontFamily: FONT_NUMERIC,
    fontSize: 17,
    color: palette.ink,
    marginTop: 4,
  },

  // Transaction history
  section: { marginTop: 4 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: palette.ink },
  historyCard: {
    backgroundColor: palette.bg,
    borderRadius: 22,
    padding: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.hairline,
  },
  activity: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityTitle: { fontWeight: "700", color: palette.ink, fontSize: 14 },
  tag: {
    backgroundColor: palette.mist,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  tagText: { color: palette.indigo, fontSize: 11, fontWeight: "600" },
  amountBox: { alignItems: "flex-end" },
  activityAmount: { fontWeight: "700", fontSize: 13 },
  activityTime: { color: palette.muted, fontSize: 11, marginTop: 3 },
});
