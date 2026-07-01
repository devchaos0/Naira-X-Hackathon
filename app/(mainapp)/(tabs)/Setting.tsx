import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

const FONT_DISPLAY = "Fraunces_600SemiBold";
const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";

const RING_SIZE = 62;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function XPRing({ progress }: { progress: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress, anim]);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [RING_CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.ringWrap}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke={palette.gold}
          strokeWidth={RING_STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${RING_CIRCUMFERENCE}, ${RING_CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          originX={RING_SIZE / 2}
          originY={RING_SIZE / 2}
        />
      </Svg>
      <View style={styles.ringCenter} pointerEvents="none">
        <MaterialCommunityIcons name="crown" size={18} color={palette.gold} />
      </View>
    </View>
  );
}

interface TransactionItemProps {
  title: string;
  category: string;
  amount: string;
  time: string;
  positive?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
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

const Setting = () => {
  const [profileImage] = useState("https://i.pravatar.cc/300");

  const xp = 12450;
  const xpToNext = 37550;
  const xpProgress = xp / (xp + xpToNext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* PROFILE HERO */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <Pressable style={styles.editAvatar} onPress={() => {}}>
              <Ionicons name="camera" size={13} color={palette.bg} />
            </Pressable>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.heroName}>Oladele</Text>
            <Text style={styles.heroEmail}>oladele@email.com</Text>
          </View>
        </View>

        <View style={styles.xpRow}>
          <XPRing progress={xpProgress} />

          <View style={styles.xpInfo}>
            <View style={styles.xpTopLine}>
              <Text style={styles.xpValue}>
                {xp.toLocaleString("en-NG")} XP
              </Text>
              <View style={styles.levelChip}>
                <Text style={styles.levelChipText}>Odogwu</Text>
              </View>
            </View>
            <Text style={styles.xpNext}>
              {xpToNext.toLocaleString("en-NG")} XP to Legend
            </Text>
          </View>
        </View>
      </View>

      {/* MONEY SUMMARY */}
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
          <View
            style={[styles.moneyIcon, { backgroundColor: palette.dangerBg }]}
          >
            <Ionicons name="arrow-up" size={18} color={palette.danger} />
          </View>
          <Text style={styles.moneyLabel}>Total debit</Text>
          <Text style={styles.moneyValue}>₦120,500</Text>
        </View>
      </View>

      {/* TRANSACTION HISTORY */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.surface },
  content: { padding: 20, paddingBottom: 60 },

  // Hero
  hero: {
    backgroundColor: palette.ink,
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,
  },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarWrap: { position: "relative" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  editAvatar: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.gold,
    justifyContent: "center",
    alignItems: "center",
  },
  heroName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 19,
    color: palette.bg,
  },
  heroEmail: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 2 },

  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ringCenter: { position: "absolute" },
  xpInfo: { flex: 1 },
  xpTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  xpValue: { fontFamily: FONT_NUMERIC, fontSize: 16, color: palette.bg },
  levelChip: {
    backgroundColor: "rgba(228,169,59,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelChipText: { color: palette.gold, fontSize: 11, fontWeight: "700" },
  xpNext: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 6 },

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

export default Setting;
