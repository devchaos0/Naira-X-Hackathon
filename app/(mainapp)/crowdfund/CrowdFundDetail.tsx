
import RankBadge from "@/components/rankBadge";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const Clipboard = require("react-native/Libraries/Components/Clipboard/Clipboard").default;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  gold: "#E4A93B",
  goldDeep: "#946A17",
  goldLight: "#FBEED2",
  bg: "#FFFFFF",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
} as const;

const FONT_DISPLAY = "Fraunces_600SemiBold";
const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";

const formatNaira = (value: number): string =>
  "₦" + Number(value || 0).toLocaleString("en-NG", { maximumFractionDigits: 0 });

const mockMembers = [
  { name: "Olamide", amount: 250000 },
  { name: "David", amount: 120000 },
  { name: "Sarah", amount: 45000 },
  { name: "Mike", amount: 10000 },
];


const DIAL_SIZE = 188;
const DIAL_STROKE = 11;
const DIAL_RADIUS = (DIAL_SIZE - DIAL_STROKE) / 2;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;

function PotDial({ progress }: { progress: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress / 100,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress, anim]);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [DIAL_CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.dialWrap}>
      <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
        <Circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={DIAL_RADIUS}
          stroke={palette.mist}
          strokeWidth={DIAL_STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={DIAL_RADIUS}
          stroke={palette.gold}
          strokeWidth={DIAL_STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${DIAL_CIRCUMFERENCE}, ${DIAL_CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          originX={DIAL_SIZE / 2}
          originY={DIAL_SIZE / 2}
        />
      </Svg>
      <View style={styles.dialCenter} pointerEvents="none">
        <Text style={styles.dialPercent}>{Math.round(progress)}%</Text>
        <Text style={styles.dialLabel}>funded</Text>
      </View>
    </View>
  );
}

export default function CrowdFundDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { name, details, duration, targetAmount, raisedAmount, code, createdAt } =
    params as Record<string, string>;

  const isPrivate = Boolean(code && code.trim().length > 0);

  const progress = Math.min(
    (Number(raisedAmount) / Number(targetAmount)) * 100 || 0,
    100,
  );

  const copyCode = () => {
    Clipboard.setString(code ?? "");
    Alert.alert("Copied", "Invite code copied");
  };

  const share = async () => {
    await Share.share({
      message: isPrivate
        ? `Join my squad "${name}" — code: ${code}`
        : `Join my squad "${name}" on Nairax.`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={20} color={palette.ink} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Squad</Text>

        <TouchableOpacity onPress={share} style={styles.headerButton}>
          <Ionicons name="share-outline" size={20} color={palette.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* HERO */}
        <View style={styles.hero}>
          <PotDial progress={progress} />

          <Text style={styles.name}>{name}</Text>
          {details ? <Text style={styles.description}>{details}</Text> : null}

          <View style={styles.badgeRow}>
            <View style={styles.typeBadge}>
              <Ionicons
                name={isPrivate ? "lock-closed-outline" : "globe-outline"}
                size={13}
                color={palette.indigo}
              />
              <Text style={styles.badgeText}>
                {isPrivate ? "Private squad" : "Public squad"}
              </Text>
            </View>
            {duration ? (
              <View style={styles.typeBadge}>
                <Ionicons name="time-outline" size={13} color={palette.indigo} />
                <Text style={styles.badgeText}>{duration}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.moneyRow}>
          <View>
            <Text style={styles.label}>Raised</Text>
            <Text style={styles.money}>{formatNaira(Number(raisedAmount))}</Text>
          </View>
          <View style={styles.moneyDivider} />
          <View style={styles.moneyRight}>
            <Text style={styles.label}>Goal</Text>
            <Text style={styles.goal}>{formatNaira(Number(targetAmount))}</Text>
          </View>
        </View>

        {/* INVITE — private squads only */}
        {isPrivate && (
          <View style={styles.invite}>
            <View>
              <Text style={styles.inviteLabel}>Invite code</Text>
              <Text style={styles.code}>{code}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={copyCode} style={styles.iconBtn}>
                <Ionicons name="copy-outline" size={19} color={palette.bg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={share} style={styles.iconBtn}>
                <Ionicons name="share-outline" size={19} color={palette.bg} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* CONTRIBUTORS */}
        {/* <View style={styles.leader}>
          <Text style={styles.sectionTitle}>Top contributors</Text>

          {mockMembers.map((member, index) => (
            <View key={index} style={styles.member}>
              <View style={styles.position}>
                <Text style={styles.positionText}>{index + 1}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.memberName}>{member.name}</Text>
                <RankBadge amount={member.amount} size="sm" />
              </View>

              <Text style={styles.memberAmount}>{formatNaira(member.amount)}</Text>
            </View>
          ))}
        </View> */}

        <Text style={styles.created}>Created {createdAt}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.mist,
  },
  headerTitle: { fontSize: 15, fontWeight: "700", color: palette.ink },

  content: { padding: 24, paddingBottom: 40 },

  // Hero
  hero: { alignItems: "center" },
  dialWrap: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  dialCenter: { position: "absolute", alignItems: "center" },
  dialPercent: {
    fontFamily: FONT_NUMERIC,
    fontSize: 30,
    color: palette.ink,
  },
  dialLabel: {
    fontSize: 11,
    color: palette.muted,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  name: {
    fontFamily: FONT_DISPLAY,
    fontSize: 24,
    color: palette.ink,
    textAlign: "center",
  },
  description: {
    marginTop: 8,
    color: palette.muted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  badgeRow: { flexDirection: "row", gap: 8, marginTop: 14 },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: palette.mist,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: { color: palette.indigo, fontWeight: "700", fontSize: 12 },

  // Money row
  moneyRow: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  moneyDivider: {
    width: 1,
    height: 34,
    backgroundColor: palette.hairline,
    marginHorizontal: 20,
  },
  moneyRight: { flex: 1 },
  label: { color: palette.muted, fontSize: 12 },
  money: {
    fontFamily: FONT_NUMERIC,
    fontSize: 20,
    color: palette.ink,
    marginTop: 4,
  },
  goal: {
    fontFamily: FONT_NUMERIC,
    fontSize: 20,
    color: palette.ink,
    marginTop: 4,
  },

  // Invite
  invite: {
    marginTop: 24,
    backgroundColor: palette.goldLight,
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inviteLabel: { color: palette.goldDeep, fontWeight: "700", fontSize: 12 },
  code: {
    fontFamily: FONT_NUMERIC,
    fontSize: 22,
    color: palette.goldDeep,
    letterSpacing: 3,
    marginTop: 4,
  },
  actions: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.goldDeep,
    justifyContent: "center",
    alignItems: "center",
  },

  // Contributors
  leader: { marginTop: 28 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: palette.ink, marginBottom: 12 },
  member: {
    marginTop: 10,
    backgroundColor: palette.mist,
    padding: 14,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  position: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: { fontWeight: "700", color: palette.indigo, fontSize: 12 },
  memberName: { fontWeight: "700", color: palette.ink, fontSize: 14 },
  memberAmount: {
    fontFamily: FONT_NUMERIC,
    fontSize: 14,
    color: palette.ink,
  },

  created: {
    textAlign: "center",
    color: palette.muted,
    fontSize: 12,
    marginTop: 24,
  },
});