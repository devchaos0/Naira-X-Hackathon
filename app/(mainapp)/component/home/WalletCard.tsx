import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";

const WalletCard = () => {
  return (
    <View style={styles.card}>
      <BlurView intensity={80} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <CustomText variant="caption" medium color={Colors.light.text2}>
              Wallet balance
            </CustomText>
            <CustomText variant="h1" bold color={Colors.light.baseblack}>
              ₦24,560.00
            </CustomText>
          </View>

          <View style={styles.walletIconWrap}>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet" size={20} color={Colors.light.primary} />
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white, // or a gradient
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerText: {
    maxWidth: "70%",
  },
  walletIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  walletIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metaPill: {
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  metaPillMuted: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    zIndex: 1,
  },
});

export default WalletCard;
