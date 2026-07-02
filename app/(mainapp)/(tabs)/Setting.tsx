import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  gold: "#E4A93B",
  goldLight: "#FBEED2",
  bg: "#FFFFFF",
  surface: "#F8F7FC",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
  success: "#1F9254",
  successBg: "#E4F5EA",
  danger: "#D8384B",
  dangerBg: "#FBE7EA",
} as const;

const FONT_DISPLAY = "Fraunces_600SemiBold";
const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";

const RING_SIZE = 62;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function XPRing({ progress }: { progress: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress, anim]);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [RING_CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.ringWrap}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke={palette.gold}
          strokeWidth={RING_STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${RING_CIRCUMFERENCE}, ${RING_CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          originX={RING_SIZE / 2}
          originY={RING_SIZE / 2}
        />
      </Svg>
      <View style={styles.ringCenter} pointerEvents="none">
        <MaterialCommunityIcons name="crown" size={18} color={palette.gold} />
      </View>
    </View>
  );
}

const Setting = () => {
  const [profileImage] = useState("https://i.pravatar.cc/300");
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const xp = 12450;
  const xpToNext = 37550;
  const xpProgress = xp / (xp + xpToNext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* PROFILE HERO */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <Pressable style={styles.editAvatar} onPress={() => {}}>
              <Ionicons name="camera" size={13} color={palette.bg} />
            </Pressable>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.heroName}>Oladele</Text>
            <Text style={styles.heroEmail}>oladele@email.com</Text>
          </View>
        </View>

        <View style={styles.xpRow}>
          <XPRing progress={xpProgress} />

          <View style={styles.xpInfo}>
            <View style={styles.xpTopLine}>
              <Text style={styles.xpValue}>
                {xp.toLocaleString("en-NG")} XP
              </Text>
              <View style={styles.levelChip}>
                <Text style={styles.levelChipText}>Odogwu</Text>
              </View>
            </View>
            <Text style={styles.xpNext}>
              {xpToNext.toLocaleString("en-NG")} XP to Legend
            </Text>
          </View>
        </View>
      </View>


      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <View>
            <Text style={styles.settingsRowText}>Manage profile</Text>
            <Text style={styles.settingsRowSubtitle}>
              Update name, email, and photo
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
        <Pressable
          style={styles.settingsRow}
          onPress={() => setNotificationsEnabled((value) => !value)}
        >
          <View>
            <Text style={styles.settingsRowText}>Notifications</Text>
            <Text style={styles.settingsRowSubtitle}>
              {notificationsEnabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
          <View
            style={[
              styles.toggle,
              notificationsEnabled ? styles.toggleOn : styles.toggleOff,
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                notificationsEnabled
                  ? styles.toggleThumbOn
                  : styles.toggleThumbOff,
              ]}
            />
          </View>
        </Pressable>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <View>
            <Text style={styles.settingsRowText}>Help & support</Text>
            <Text style={styles.settingsRowSubtitle}>
              Contact support or report an issue
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Pressable
          style={styles.settingsRow}
          onPress={() => setBiometricEnabled((value) => !value)}
        >
          <View>
            <Text style={styles.settingsRowText}>Biometric login</Text>
            <Text style={styles.settingsRowSubtitle}>
              Touch ID / Face ID for quick access
            </Text>
          </View>
          <View
            style={[
              styles.toggle,
              biometricEnabled ? styles.toggleOn : styles.toggleOff,
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                biometricEnabled ? styles.toggleThumbOn : styles.toggleThumbOff,
              ]}
            />
          </View>
        </Pressable>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <View>
            <Text style={styles.settingsRowText}>App lock</Text>
            <Text style={styles.settingsRowSubtitle}>
              Secure app access on open
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>About</Text>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <Text style={styles.settingsRowText}>Privacy policy</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <Text style={styles.settingsRowText}>Rate us</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
        <Pressable style={styles.settingsRow} onPress={() => {}}>
          <Text style={styles.settingsRowText}>About</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.ink} />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={() => {}}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.surface },
  content: { padding: 20, paddingBottom: 60 },

  // Hero
  hero: {
    backgroundColor: palette.ink,
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,
  },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarWrap: { position: "relative" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  editAvatar: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.gold,
    justifyContent: "center",
    alignItems: "center",
  },
  heroName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 19,
    color: palette.bg,
  },
  heroEmail: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 2 },

  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ringCenter: { position: "absolute" },
  xpInfo: { flex: 1 },
  xpTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  xpValue: { fontFamily: FONT_NUMERIC, fontSize: 16, color: palette.bg },
  levelChip: {
    backgroundColor: "rgba(228,169,59,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelChipText: { color: palette.gold, fontSize: 11, fontWeight: "700" },
  xpNext: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 6 },

  profileCard: {
    backgroundColor: palette.bg,
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.hairline,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: palette.ink,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  infoLabel: {
    color: palette.muted,
    fontSize: 13,
    flex: 1,
  },
  infoValue: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    flex: 1,
  },
  settingsCard: {
    backgroundColor: palette.bg,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.hairline,
    marginBottom: 20,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.hairline,
  },
  settingsRowText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "600",
  },
  settingsRowSubtitle: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 2,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    padding: 2,
  },
  toggleOn: {
    backgroundColor: palette.successBg,
    borderColor: palette.success,
    alignItems: "flex-end",
  },
  toggleOff: {
    backgroundColor: palette.surface,
    borderColor: palette.hairline,
    alignItems: "flex-start",
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: palette.bg,
  },
  toggleThumbOn: {
    backgroundColor: palette.success,
  },
  toggleThumbOff: {
    backgroundColor: palette.muted,
  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: palette.danger,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    color: palette.bg,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default Setting;
