import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getRankTier } from "@/constants/theme";

interface RankBadgeProps {
  amount: number;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: {
    icon: 11,
    font: 10,
    padV: 3,
    padH: 7,
    gap: 3,
  },
  md: {
    icon: 13,
    font: 11,
    padV: 4,
    padH: 9,
    gap: 4,
  },
  lg: {
    icon: 16,
    font: 13,
    padV: 6,
    padH: 12,
    gap: 5,
  },
};

export default function RankBadge({
  amount,
  size = "md",
}: RankBadgeProps) {
  const tier = getRankTier(amount);
  const d = SIZES[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: tier.bg,
          paddingVertical: d.padV,
          paddingHorizontal: d.padH,
          gap: d.gap,
        },
      ]}
    >
    

      <Text
        style={[
          styles.label,
          {
            color: tier.color,
            fontSize: d.font,
          },
        ]}
      >
        {tier.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  label: {
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});