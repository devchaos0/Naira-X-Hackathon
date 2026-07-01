import { CrowdFundItem } from "@/api/type";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  violet: "#6D5FE0",
  gold: "#E4A93B",
  goldDeep: "#946A17",
  goldLight: "#FBEED2",
  bg: "#FFFFFF",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
} as const;

const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";

interface CrowdFundCardProps {
  item: CrowdFundItem;
  onPress: (item: CrowdFundItem) => void;
}

const formatNaira = (value: number): string =>
  "₦" + Number(value).toLocaleString("en-NG", { maximumFractionDigits: 0 });

const CrowdFundCard: React.FC<CrowdFundCardProps> = ({ item, onPress }) => {
  const progress = Math.min((item.raisedAmount / item.targetAmount) * 100, 100);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item)}
      style={styles.card}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="people" size={20} color={palette.indigo} />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.typeRow}>
            <View style={styles.badge}>
              <Ionicons
                name={item.code ? "lock-closed-outline" : "globe-outline"}
                size={11}
                color={palette.indigo}
              />
              <Text style={styles.badgeText}>
                {item.code ? "Private" : "Public"}
              </Text>
            </View>

            {item.code && (
              <View style={styles.codeBadge}>
                <Text style={styles.code}>{item.code}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* DESCRIPTION */}
      {item.details ? (
        <Text style={styles.description} numberOfLines={2}>
          {item.details}
        </Text>
      ) : null}

      {/* PROGRESS */}
      <View style={styles.progressBlock}>
        <View style={styles.progressTop}>
          <View>
            <Text style={styles.small}>Raised</Text>
            <Text style={styles.raised}>{formatNaira(item.raisedAmount)}</Text>
            <Text style={styles.target}>
              of {formatNaira(item.targetAmount)} target
            </Text>
          </View>

          <View style={styles.percentPill}>
            <Text style={styles.percentText}>{Math.round(progress)}%</Text>
          </View>
        </View>

        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: animation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>

      {/* META FOOTER */}
      <View style={styles.footer}>
        <Ionicons name="time-outline" size={14} color={palette.muted} />
        <Text style={styles.durationText}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.bg,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.hairline,
    shadowColor: palette.indigo,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.mist,
  },
  headerText: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700", color: palette.ink },

  typeRow: { flexDirection: "row", gap: 8, marginTop: 6 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: palette.mist,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, color: palette.indigo, fontWeight: "700" },
  codeBadge: {
    backgroundColor: palette.goldLight,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 20,
  },
  code: { color: palette.goldDeep, fontSize: 11, fontWeight: "800" },

  description: {
    marginTop: 14,
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
  },

  progressBlock: { marginTop: 18 },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  small: { color: palette.muted, fontSize: 11 },
  raised: {
    fontFamily: FONT_NUMERIC,
    fontSize: 19,
    color: palette.ink,
    marginTop: 2,
  },
  target: { color: palette.muted, fontSize: 12, marginTop: 3 },
  percentPill: {
    backgroundColor: palette.mist,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  percentText: { color: palette.indigo, fontWeight: "800", fontSize: 12 },

  track: {
    height: 8,
    backgroundColor: palette.mist,
    borderRadius: 20,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: palette.gold,
    borderRadius: 20,
  },

  footer: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  durationText: { color: palette.muted, fontSize: 12 },
});

export default CrowdFundCard;
