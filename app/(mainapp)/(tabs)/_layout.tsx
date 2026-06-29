import { ChatIcon } from "@/assets/svg/ChatIcon";
import { CrowdFundIcon } from "@/assets/svg/CrowdFundIcon";
import { HomeIcon } from "@/assets/svg/HomeIcon";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "#8E8E8E",
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 12,
          paddingBottom: 6,
          justifyContent: "center",
        },
        tabBarStyle: {
   
          height: Platform.OS === "ios" ? 84 : 76,
          borderRadius: 28,
          backgroundColor: Colors.light.white,
          borderTopWidth: 0,
          shadowColor: Colors.light.baseblack,
          shadowOpacity: 0.08,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 15,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "OpenSans-Bold",
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <HomeIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="CrowdFund"
        options={{
          title: "Crowd Fund",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <CrowdFundIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <ChatIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <SettingsIcon fill={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  tabIconActive: {
    backgroundColor: "rgba(30, 120, 255, 0.12)",
  },
});
