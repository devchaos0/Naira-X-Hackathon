import { getLeaderboard } from "@/api/mainapi/mainapi";
import { LeaderboardUser } from "@/api/type";
import { ListRow, RankCard } from "@/components/leaderboard/LeaderboardCards";
import { PodiumItem } from "@/components/leaderboard/LeaderboardPodium";
import {
  colors,
  font,
  Tier,
  User,
} from "@/components/leaderboard/LeaderboardShared";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_BG = "#0D1426";

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

const TIER_NAMES = new Set<Tier>([
  "Starter",
  "Hustler",
  "Grinder",
  "Big Player",
  "Big Boss",
  "Don",
  "Legend",
  "Odogwu",
]);

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

  return order.find((tier) => xp >= TIER_THRESHOLDS[tier]) ?? "Starter";
}

function normalizeLeaderboardUser(item: LeaderboardUser, index: number): User {
  const firstName = item.firstName?.trim() ?? "";
  const lastName = item.lastName?.trim() ?? "";
  const name = `${firstName} ${lastName}`.trim() || `User ${index + 1}`;
  const xPoints = Number(item.xPoints ?? 0);
  const apiTier = item.tier as Tier | undefined;

  return {
    id: index + 1,
    name,
    xPoints,
    tier: apiTier && TIER_NAMES.has(apiTier) ? apiTier : tierForXP(xPoints),
  };
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderboard = useCallback(async (showInitialLoader = false) => {
    if (showInitialLoader) {
      setLoading(true);
    }

    setError(null);

    try {
      const response = await getLeaderboard();
      const apiUsers = Array.isArray(response?.data)
        ? response.data
            .map(normalizeLeaderboardUser)
            .sort((a, b) => b.xPoints - a.xPoints)
        : [];

      setUsers(apiUsers);
    } catch {
      setUsers([]);
      setError("Unable to load leaderboard right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboard(true);
  }, [loadLeaderboard]);

  const topUsers = useMemo(
    () =>
      [
        { user: users[1], rank: 2 as const, delay: 150 },
        { user: users[0], rank: 1 as const, delay: 0 },
        { user: users[2], rank: 3 as const, delay: 300 },
      ].filter((item): item is { user: User; rank: 1 | 2 | 3; delay: number } =>
        Boolean(item.user),
      ),
    [users],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadLeaderboard();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor={SCREEN_BG} />

      <View style={styles.bgGlow} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#7DD3FC"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Top Ballers</Text>

          <View style={styles.headerPill}>
            <Text style={styles.headerPillText}>All-time</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Loading leaderboard...</Text>
          </View>
        ) : error ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{error}</Text>
          </View>
        ) : users.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No leaderboard data yet.</Text>
          </View>
        ) : (
          <>
            <View style={styles.podiumRow}>
              {topUsers.map(({ user, rank, delay }) => (
                <PodiumItem
                  key={user.id}
                  user={user}
                  rank={rank}
                  delay={delay}
                  styles={styles}
                />
              ))}
            </View>

            {users.length > 3 ? (
              <>
                <Text style={styles.sectionTitle}>Ranks 4-10</Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.rankCardsContent}
                >
                  {users.slice(3, 10).map((user, index) => (
                    <RankCard
                      key={user.id}
                      user={user}
                      rank={index + 4}
                      styles={styles}
                    />
                  ))}
                </ScrollView>
              </>
            ) : null}

            <Text style={styles.sectionTitle}>Full ranking</Text>

            <View style={styles.listContent}>
              {users.map((user, index) => (
                <ListRow
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  isYou={false}
                  styles={styles}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollContent: {
    paddingBottom: 160,
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
  emptyState: {
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontFamily: font.bodyMedium,
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
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
    fontFamily: font.bodyMedium,
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
  rankCardsContent: {
    paddingHorizontal: 20,
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
    fontFamily: font.bodyMedium,
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
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
});
