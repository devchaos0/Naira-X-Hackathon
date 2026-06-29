import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Clipboard =
  require("react-native/Libraries/Components/Clipboard/Clipboard").default as {
    setString(content: string): void;
  };

export default function CrowdFundDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    name,
    details,
    duration,
    targetAmount,
    raisedAmount,
    code,
    createdAt,
  } = params as Record<string, string>;

  const progress = Math.min(
    (Number(raisedAmount) / Number(targetAmount)) * 100,
    100,
  );

  const handleCopyCode = async () => {
    try {
      Clipboard.setString(code ?? "");
      Alert.alert("Copied", "Crowd fund code copied to clipboard.");
    } catch (error) {
      Alert.alert("Error", "Unable to copy code.");
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my crowd fund \"${name}\"!\nCode: ${code}`,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share this code.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.light.baseblack}
          />
        </TouchableOpacity>
        <CustomText variant="h4" bold style={styles.headerTitle}>
          Crowd Fund Details
        </CustomText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailSection}>
          <CustomText variant="h3" bold style={styles.detailName}>
            {name}
          </CustomText>
          <CustomText variant="h6" style={styles.detailDetails}>
            {details}
          </CustomText>
        </View>

        <View style={styles.codeSection}>
          <CustomText variant="h5" bold style={styles.codeLabel}>
            Crowd Fund Code
          </CustomText>
          <View style={styles.codeRow}>
            <View style={styles.codeBox}>
              <CustomText variant="h2" bold style={styles.codeValue}>
                {code}
              </CustomText>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyCode}
            >
              <Ionicons
                name="copy-outline"
                size={24}
                color={Colors.light.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons
                name="share-outline"
                size={24}
                color={Colors.light.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <CustomText variant="caption" style={styles.statLabel}>
              Duration
            </CustomText>
            <CustomText variant="h4" bold>
              {duration}
            </CustomText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <CustomText variant="caption" style={styles.statLabel}>
              Target Amount
            </CustomText>
            <CustomText variant="h4" bold>
              ₦{Number(targetAmount).toLocaleString()}
            </CustomText>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <CustomText variant="h6" bold>
              Progress
            </CustomText>
            <CustomText variant="h6" bold style={styles.raisedText}>
              ₦{Number(raisedAmount).toLocaleString()} raised
            </CustomText>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <CustomText variant="caption" style={styles.progressPercentage}>
            {Math.round(progress)}% Complete
          </CustomText>
        </View>

        <View style={styles.createdSection}>
          <CustomText variant="caption" style={styles.createdText}>
            Created on {createdAt}
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailName: {
    marginBottom: 8,
  },
  detailDetails: {
    color: Colors.light.text2,
    lineHeight: 20,
  },
  codeSection: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  codeLabel: {
    color: Colors.light.text2,
    marginBottom: 12,
  },
  codeBox: {
    backgroundColor: Colors.light.grey100,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  copyButton: {
    backgroundColor: Colors.light.primary,
    padding: 12,
    borderRadius: 8,
  },
  shareButton: {
    backgroundColor: Colors.light.success,
    padding: 12,
    borderRadius: 8,
  },
  codeValue: {
    textAlign: "center",
    letterSpacing: 2,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 24,
    backgroundColor: Colors.light.white,
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: 8,
  },
  statLabel: {
    color: Colors.light.text2,
    marginBottom: 4,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  raisedText: {
    color: Colors.light.success,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.light.grey100,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
  },
  progressPercentage: {
    color: Colors.light.text2,
    textAlign: "right",
  },
  createdSection: {
    alignItems: "center",
    paddingTop: 8,
  },
  createdText: {
    color: Colors.light.text2,
  },
});
