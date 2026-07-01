import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  colors,
  font,
  Tier,
  User,
} from "@/components/leaderboard/LeaderboardShared";

import { PodiumItem } from "@/components/leaderboard/LeaderboardPodium";

import { ListRow, RankCard } from "@/components/leaderboard/LeaderboardCards";

const TIER_THRESHOLDS: Record<Tier, number> = {
  Starter: 0,
  Hustler: 500,
  Grinder: 2000,
  "Big Player": 6000,
  "Big Boss": 15000,
  Don: 35000,
  Legend: 75000,
  Odogwu: 150000,
};

function tierForXP(xp: number): Tier {
  const order: Tier[] = [
    "Odogwu",
    "Legend",
    "Don",
    "Big Boss",
    "Big Player",
    "Grinder",
    "Hustler",
    "Starter",
  ];

  return order.find((t) => xp >= TIER_THRESHOLDS[t]) ?? "Starter";
}

const NAMES = [
  "CryptoKing",
  "XpointQueen",
  "MoneyMoves",
  "FinFlex",
  "StackMaster",
  "CashFlow",
  "HustleHard",
  "TopEarner",
  "WealthWiz",
  "PrimePlayer",
  "DiamondDog",
  "BullRun",
  "RichieRich",
  "BigBaller",
  "SpendLord",
  "AlphaApe",
  "BetaBoss",
  "GammaG",
  "DeltaForce",
  "OmegaOne",
];

function generateUsers(): User[] {
  const users: User[] = [];

  for (let i = 0; i < 100; i++) {
    const xp = Math.max(0, Math.floor(160000 - i * 1500 + Math.random() * 300));

    users.push({
      id: i + 1,
      name:
        NAMES[i % NAMES.length] +
        (i >= NAMES.length ? String(Math.floor(i / NAMES.length)) : ""),

      xPoints: xp,
      tier: tierForXP(xp),
    });
  }

  return users.sort((a, b) => b.xPoints - a.xPoints);
}

const USERS = generateUsers();

const CURRENT_USER_ID = 45;

const currentUser = USERS.find((u) => u.id === CURRENT_USER_ID) ?? USERS[44];

export default function Leaderboard() {
  const cardY = useRef(new Animated.Value(80)).current;

  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),

      Animated.parallel([
        Animated.spring(cardY, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }),

        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const rank = USERS.findIndex((u) => u.id === CURRENT_USER_ID) + 1;

  const ahead = rank > 1 ? USERS[rank - 2] : null;

  const xpToOvertake = ahead ? ahead.xPoints - currentUser.xPoints : 0;

  const progress = ahead
    ? Math.min(100, (currentUser.xPoints / ahead.xPoints) * 100)
    : 100;

  return (
    <View style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgBase} />

      <View style={styles.bgGlow} />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 160,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Top Ballers</Text>

          <View style={styles.headerPill}>
            <Text style={styles.headerPillText}>All-time</Text>
          </View>
        </View>

        <View style={styles.podiumRow}>
          <PodiumItem user={USERS[1]} rank={2} delay={150} styles={styles} />

          <PodiumItem user={USERS[0]} rank={1} delay={0} styles={styles} />

          <PodiumItem user={USERS[2]} rank={3} delay={300} styles={styles} />
        </View>

        <Text style={styles.sectionTitle}>Ranks 4–10</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          {USERS.slice(3, 10).map((u, i) => (
            <RankCard key={u.id} user={u} rank={i + 4} styles={styles} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Full ranking</Text>

        <View style={{ paddingHorizontal: 16 }}>
          {USERS.slice(10, 100).map((u, i) => (
            <ListRow
              key={u.id}
              user={u}
              rank={i + 11}
              isYou={u.id === CURRENT_USER_ID}
              styles={styles}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1426",
  },

  bgGlow: {
    position: "absolute",
    top: -100,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.violet,
    opacity: 0.07,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: font.display,
    fontSize: 26,
    color: "#F1F5F9",
  },

  headerPill: {
    backgroundColor: "#16213E",
    borderWidth: 1,
    borderColor: "#22304F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  headerPillText: {
    fontFamily: font.bodyMedium,
    fontSize: 12,
    color: "#7DD3FC",
  },

  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 18,
    marginTop: 24,
    marginBottom: 8,
  },

  podiumName: {
    fontFamily: font.bodyMedium,
    fontSize: 13,
    color: "#F1F5F9",
    marginBottom: 4,
  },

  step: {
    width: "88%",
    marginTop: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 1,
    backgroundColor: "#16213E",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },

  stepRank: {
    fontFamily: font.display,
    fontSize: 20,
    color: "#F1F5F9",
  },

  stepPoints: {
    fontFamily: font.body,
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },

  sectionTitle: {
    fontFamily: font.bodyMedium,
    fontSize: 15,
    color: "#F1F5F9",
    marginLeft: 20,
    marginTop: 28,
    marginBottom: 12,
  },

  rankCard: {
    width: 118,
    backgroundColor: "#16213E",
    borderWidth: 1,
    borderColor: "#22304F",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
  },

  rankCardRank: {
    fontFamily: font.bodyMedium,
    fontSize: 12,
    color: "#5B6B85",
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  rankCardName: {
    fontFamily: font.bodyMedium,
    fontSize: 12.5,
    color: "#F1F5F9",
    marginTop: 8,
    marginBottom: 6,
  },

  rankCardPoints: {
    fontFamily: font.body,
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 8,
  },

  listRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#22304F",
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
  },

  listRowActive: {
    borderColor: colors.sky,
    backgroundColor: colors.sky + "12",
  },

  listRank: {
    width: 28,
    fontFamily: font.bodyMedium,
    fontSize: 13,
    color: "#5B6B85",
    textAlign: "center",
  },

  listName: {
    fontFamily: font.bodyMedium,
    fontSize: 13.5,
    color: "#F1F5F9",
    marginBottom: 4,
  },

  listPoints: {
    fontFamily: font.bodyMedium,
    fontSize: 13,
    color: "#7DD3FC",
  },

  floatingCard: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 100,
    backgroundColor: "#16213E",
    borderWidth: 1,
    borderColor: "#22304F",
    borderRadius: 22,
    padding: 16,
  },

  floatingTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  floatingLabel: {
    fontFamily: font.body,
    fontSize: 11,
    color: "#5B6B85",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  floatingRank: {
    fontFamily: font.display,
    fontSize: 26,
    color: "#F1F5F9",
  },

  floatingProgressBox: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 12,
  },

  floatingProgressLabel: {
    fontFamily: font.body,
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 8,
  },

  progressTrack: {
    height: 6,
    backgroundColor: "#22304F",
    borderRadius: 3,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
});
