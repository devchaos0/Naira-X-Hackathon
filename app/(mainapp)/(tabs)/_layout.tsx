import { ChatIcon } from "@/assets/svg/ChatIcon";
import { CrowdFundIcon } from "@/assets/svg/CrowdFundIcon";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { SFColors } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICON_SIZE = 20;
const ACTIVE_COLOR = SFColors.purple600;

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (color) => <ChatIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />,
  CrowdFund: (color) => (
    <CrowdFundIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
  ),
  Setting: (color) => (
    <SettingsIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
  ),
  leaderboard: (color) => (
    <Feather name="award" size={ICON_SIZE} color={"black"} />
  ),
};

const LABELS: Record<string, string> = {
  index: "Chat",
  CrowdFund: "Squad",
  Setting: "Settings",
  leaderboard: "Rank",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="CrowdFund" />
      <Tabs.Screen name="Setting" />
      <Tabs.Screen name="leaderboard" />
    </Tabs>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { bottom: insets.bottom - 5}]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const iconRenderer = ICONS[route.name];
        const label = LABELS[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={route.key} style={styles.cell}>
            <Pressable onPress={onPress} hitSlop={10}>
              <AnimatedPill focused={focused} label={label}>
                {iconRenderer?.(focused ? SFColors.white : SFColors.textMuted)}
              </AnimatedPill>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

function AnimatedPill({
  focused,
  label,
  children,
}: {
  focused: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const widthAnim = useRef(new Animated.Value(focused ? 78 : 44)).current;
  const labelOpacity = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: focused ? 78 : 44,
        useNativeDriver: false,
        friction: 8,
      }),
      Animated.timing(labelOpacity, {
        toValue: focused ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.pill,
        { width: widthAnim, backgroundColor: focused ? ACTIVE_COLOR : "transparent" },
      ]}
    >
      <View style={styles.iconBox}>{children}</View>
      {focused && (
        <Animated.Text
          numberOfLines={1}
          style={[styles.label, { opacity: labelOpacity }]}
        >
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 18,
    right: 18,
    height: 68,
    borderRadius: 32,
    backgroundColor: SFColors.white,
    borderRightColor: SFColors.purple200,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: SFColors.purple900,
    shadowOpacity: 0.18,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 12 },
    elevation: 20,
    paddingHorizontal: 8,
   
  },
  cell: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    maxWidth: 90,
  },
  iconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: SFColors.white,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
});