import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Clipboard =
  require("react-native/Libraries/Components/Clipboard/Clipboard").default;

const colors = {
  purple900: "#26215C",
  purple700: "#3C3489",
  purple600: "#534AB7",
  purple400: "#7F77DD",
  purple200: "#AFA9EC",
  purple100: "#CECBF6",
  purple50: "#EEEDFE",
  gold300: "#F3C969",
  bg: "#FFFFFF",
  surface: "#F7F7F9",
  border: "#E7E6E9",
  textPrimary: "#1A1A1A",
  textMuted: "#6B6B70",
} as const;

const ACCOUNT = {
  initials: "OO",
  greeting: "Good afternoon",
  name: "Olamide Oladele",
  balance: 482150,
  accountNumber: "0123456789",
  bankName: "Nomba",
  tier: "Hustler",
  points: 1240,
};

const formatMoney = (value: number): string =>
  "₦" + Number(value).toLocaleString("en-NG", { maximumFractionDigits: 0 });

const copyToClipboard = (text: string, label: string) => {
  Clipboard.setString(text);
  Alert.alert("Copied", `${label} copied to clipboard.`);
};

const shareDetails = async () => {
  const details = `Account name: ${ACCOUNT.name}\nAccount number: ${ACCOUNT.accountNumber}\nBank: ${ACCOUNT.bankName}\nTier: ${ACCOUNT.tier}`;
  await Share.share({ message: `Fund me details:\n${details}` });
};

export default function Fundme() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.purple900} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Fund me</Text>
          <Text style={styles.headerSubtitle}>
            Share your account details
          </Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={shareDetails}>
          <Feather name="share-2" size={20} color={colors.purple900} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{ACCOUNT.initials}</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroLabel}>{ACCOUNT.greeting}</Text>
              <Text style={styles.heroName}>{ACCOUNT.name}</Text>
            </View>
          </View>

          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceValue}>
            {formatMoney(ACCOUNT.balance)}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Feather name="award" size={12} />
              <Text style={styles.metaText}>{ACCOUNT.tier}</Text>
            </View>
            <View style={styles.metaBadgeSecondary}>
              <Feather name="zap" size={12} color={colors.purple700} />
              <Text style={styles.metaText}>{ACCOUNT.points} XP</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Account details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank name</Text>
            <Text style={styles.detailValue}>{ACCOUNT.bankName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account number</Text>
            <Text style={styles.detailValue}>{ACCOUNT.accountNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account name</Text>
            <Text style={styles.detailValue}>{ACCOUNT.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tier</Text>
            <Text style={styles.detailValue}>{ACCOUNT.tier}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.noteText}>
            Use these details when asking for contributions or sharing your fund
            raising details with friends.
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() =>
              copyToClipboard(ACCOUNT.accountNumber, "Account number")
            }
          >
            <Text style={styles.actionButtonText}>Copy account number</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() =>
              copyToClipboard(
                `Account name: ${ACCOUNT.name}\nAccount number: ${ACCOUNT.accountNumber}\nBank: ${ACCOUNT.bankName}\nTier: ${ACCOUNT.tier}`,
                "Full details",
              )
            }
          >
            <Text style={styles.actionButtonTextSecondary}>
              Copy full details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Need a quick link?</Text>
          <Text style={styles.helpText}>
            Tap “Copy full details” to paste account information into chat,
            email or social apps.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  headerButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  heroCard: {
    backgroundColor: colors.purple50,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.purple100,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.purple700,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.bg,
    fontWeight: "700",
    fontSize: 18,
  },
  heroInfo: {
    marginLeft: 14,
    flex: 1,
  },
  heroLabel: {
    color: colors.purple700,
    fontSize: 12,
  },
  heroName: {
    color: colors.purple900,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  balanceLabel: {
    color: colors.purple700,
    fontSize: 12,
    marginBottom: 6,
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.purple900,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.gold300,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaBadgeSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.purple100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaText: {
    color: colors.purple900,
    fontSize: 12,
    fontWeight: "600",
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.purple900,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
    borderRadius: 2,
  },
  noteText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  actionsRow: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: colors.purple900,
  },
  secondaryButton: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.purple700,
  },
  actionButtonText: {
    color: colors.bg,
    fontSize: 14,
    fontWeight: "700",
  },
  actionButtonTextSecondary: {
    color: colors.purple900,
    fontSize: 14,
    fontWeight: "700",
  },
  helpCard: {
    backgroundColor: colors.purple50,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.purple100,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.purple900,
    marginBottom: 8,
  },
  helpText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
