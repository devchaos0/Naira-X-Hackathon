import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

export type Tier =
  | "Starter"
  | "Hustler"
  | "Grinder"
  | "Big Player"
  | "Big Boss"
  | "Don"
  | "Legend"
  | "Odogwu";

export const colors = {
  surfaceElevatedAlt: "#1B2A4A",
  textMuted: "#5B6B85",
  sky: "#38BDF8",
  violet: "#818CF8",
};

export const font = {
  display: "SpaceGrotesk-SemiBold",
  bodyMedium: "Inter-Medium",
};

export interface User {
  id: number;
  name: string;
  xPoints: number;
  tier: Tier;
}

type TierConfig = {
  color: string;
  icon: React.ReactNode;
  gradient?: readonly [string, string];
};

export const TIERS: Record<Tier, TierConfig> = {
  Starter: {
    color: colors.textMuted,
    icon: <Feather name="user" size={12} color={colors.textMuted} />,
  },

  Hustler: {
    color: colors.sky,
    icon: <Feather name="zap" size={12} color={colors.sky} />,
  },

  Grinder: {
    color: "#22D3EE",
    icon: <Feather name="settings" size={12} color="#22D3EE" />,
  },

  "Big Player": {
    color: colors.violet,
    icon: <Feather name="target" size={12} color={colors.violet} />,
  },

  "Big Boss": {
    color: "#C084FC",
    icon: <Feather name="briefcase" size={12} color="#C084FC" />,
  },

  Don: {
    color: "#F472B6",
    icon: <Feather name="shield" size={12} color="#F472B6" />,
  },

  Legend: {
    color: "#FBBF24",
    icon: <Feather name="star" size={12} color="#FBBF24" />,
  },

  Odogwu: {
    color: "#FBBF24",
    icon: <MaterialCommunityIcons name="crown" size={12} color="#0A0F1D" />,
    gradient: ["#FBBF24", "#F472B6"],
  },
};

export function InitialsAvatar({
  name,
  size,
  tier,
}: {
  name: string;
  size: number;
  tier: Tier;
}) {
  const initials = name.slice(0, 2).toUpperCase();

  const tierColor = TIERS[tier].color;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.surfaceElevatedAlt,
        borderWidth: 1.5,
        borderColor: tierColor + "55",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: font.bodyMedium,
          fontSize: size * 0.34,
          color: tierColor,
        }}
      >
        {initials}
      </Text>
    </View>
  );
}

export function TierBadge({
  tier,
  compact,
  centered,
}: {
  tier: Tier;
  compact?: boolean;
  centered?: boolean;
}) {
  const cfg = TIERS[tier];

  const badgeStyle = [
    {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: compact ? 6 : 8,
      paddingVertical: compact ? 3 : 4,
      borderRadius: 8,

      alignSelf: centered ? "center" : "flex-start",
    },
  ] as any;

  if (cfg.gradient) {
    return (
      <LinearGradient colors={cfg.gradient} style={badgeStyle}>
        {cfg.icon}

        <Text
          style={{
            fontFamily: font.bodyMedium,
            fontSize: 10,
            color: "#0A0F1D",
          }}
        >
          {tier}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        badgeStyle,
        {
          backgroundColor: cfg.color + "1A",
        },
      ]}
    >
      {cfg.icon}

      <Text
        style={{
          fontFamily: font.bodyMedium,
          fontSize: 10,
          color: cfg.color,
        }}
      >
        {tier}
      </Text>
    </View>
  );
}
