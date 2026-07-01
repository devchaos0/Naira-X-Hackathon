import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IoniconName = ComponentProps<typeof Ionicons>["name"];

export const SFColors = {
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

  gold: "#E3B341",
  goldDeep: "#9C6B0B",
  goldLight: "#FCF1D6",

  silver: "#AEB2C4",
  bronze: "#C08552",

  bg: "#FFFFFF",
  surface: "#F7F7F9",
  border: "#E7E6E9",

  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B70",
  textMuted: "#9B9AA0",

  white: "#FFFFFF",
  danger: "#C0392B",
};

export const formatNaira = (value: number) =>
  "₦" +
  Number(value || 0).toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  });

export interface RankTier {
  key:
    | "starter"
    | "hustler"
    | "bigboss"
    | "donrichie"
    | "odogwu";
  label: string;
  min: number;
  icon: IoniconName;
  color: string;
  bg: string;
}

export const RANK_TIERS: RankTier[] = [
  {
    key: "starter",
    label: "Starter",
    min: 0,
    icon: "leaf-outline",
    color: SFColors.purple400,
    bg: SFColors.purple50,
  },
  {
    key: "hustler",
    label: "Hustler",
    min: 5_000,
    icon: "flash-outline",
    color: SFColors.purple600,
    bg: SFColors.purple100,
  },
  {
    key: "bigboss",
    label: "Big Boss",
    min: 20_000,
    icon: "shield-checkmark-outline",
    color: SFColors.purple900,
    bg: SFColors.purple200,
  },
  {
    key: "donrichie",
    label: "Don Richie",
    min: 100_000,
    icon: "diamond-outline",
    color: SFColors.teal800,
    bg: SFColors.teal100,
  },
  {
    key: "odogwu",
    label: "Odogwu",
    min: 500_000,
    icon: "trophy",
    color: SFColors.goldDeep,
    bg: SFColors.goldLight,
  },
];

export function getRankTier(amount: number): RankTier {
  let tier = RANK_TIERS[0];

  for (const item of RANK_TIERS) {
    if (amount >= item.min) {
      tier = item;
    }
  }

  return tier;
}

export function getNextTier(amount: number): RankTier | null {
  const index = RANK_TIERS.findIndex(
    (item) => item.min > amount
  );

  return index === -1 ? null : RANK_TIERS[index];
}

export function getTierProgress(amount: number): number {
  const current = getRankTier(amount);
  const next = getNextTier(amount);

  if (!next) {
    return 1;
  }

  return (amount - current.min) / (next.min - current.min);
}

export function computePercent(
  raised: number,
  target: number
): number {
  if (!target) {
    return 0;
  }

  return Math.min((raised / target) * 100, 100);
}