import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  bg: "#FFFFFF",
  mist: "#F1EEFB",
  muted: "#8C87A3",
} as const;

interface CrowdFundTabsProps {
  activeTab: "my" | "all";
  onTabChange: (tab: "my" | "all") => void;
  myCount: number;
  allCount: number;
}

const CrowdFundTabs: React.FC<CrowdFundTabsProps> = ({
  activeTab,
  onTabChange,
  myCount,
  allCount,
}) => {
  const slide = useRef(new Animated.Value(activeTab === "my" ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(slide, {
      toValue: activeTab === "my" ? 0 : 1,
      useNativeDriver: false, 
      damping: 18,
      stiffness: 180,
    }).start();
  }, [activeTab, slide]);

  const indicatorLeft = slide.interpolate({
    inputRange: [0, 1],
    outputRange: ["2%", "50%"],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.View style={[styles.indicator, { left: indicatorLeft }]} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onTabChange("my")}
          style={styles.tab}
        >
          <Ionicons
            name="rocket-outline"
            size={16}
            color={activeTab === "my" ? palette.bg : palette.muted}
          />
          <Text style={[styles.label, activeTab === "my" && styles.labelActive]}>
            My Squads
          </Text>
          <View style={[styles.countChip, activeTab === "my" && styles.countChipActive]}>
            <Text style={[styles.countText, activeTab === "my" && styles.countTextActive]}>
              {myCount}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onTabChange("all")}
          style={styles.tab}
        >
          <Ionicons
            name="globe-outline"
            size={16}
            color={activeTab === "all" ? palette.bg : palette.muted}
          />
          <Text style={[styles.label, activeTab === "all" && styles.labelActive]}>
            Explore
          </Text>
          <View style={[styles.countChip, activeTab === "all" && styles.countChipActive]}>
            <Text style={[styles.countText, activeTab === "all" && styles.countTextActive]}>
              {allCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: palette.bg,
  },

  container: {
    flexDirection: "row",
    backgroundColor: palette.mist,
    borderRadius: 16,
    padding: 4,
    position: "relative",
    height: 48,
  },

  indicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    width: "48%",
    borderRadius: 12,
    backgroundColor: palette.indigo,
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    zIndex: 1,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.muted,
  },
  labelActive: { color: palette.bg },

  countChip: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.bg,
  },
  countChipActive: {
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.muted,
  },
  countTextActive: { color: palette.bg },
});

export default CrowdFundTabs;