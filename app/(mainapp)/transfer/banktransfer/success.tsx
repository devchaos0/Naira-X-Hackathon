import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const TransferSuccess = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const recipientName = String(params.recipientName || "Recipient");
  const amount = String(params.amount || "0");
  const transferType = String(params.transferType || "Transfer");

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons
          name="checkmark-circle"
          size={64}
          color={Colors.light.success}
        />
      </View>
      <CustomText
        variant="h2"
        bold
        color={Colors.light.baseblack}
        style={styles.title}
      >
        Transfer completed
      </CustomText>
      <CustomText
        variant="body"
        color={Colors.light.text2}
        style={styles.subtitle}
      >
        {transferType} to {recipientName} for ₦{amount} was successful.
      </CustomText>

      <View style={styles.summaryCard}>
        <CustomText variant="caption" color={Colors.light.text2}>
          Recipient
        </CustomText>
        <CustomText
          variant="h6"
          bold
          color={Colors.light.baseblack}
          style={styles.summaryText}
        >
          {recipientName}
        </CustomText>
        <CustomText variant="caption" color={Colors.light.text2}>
          Amount
        </CustomText>
        <CustomText variant="h6" bold color={Colors.light.baseblack}>
          ₦{amount}
        </CustomText>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.replace("/(tabs)")}
      >
        <CustomText variant="h6" bold color={Colors.light.white}>
          Back to dashboard
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  badge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.light.lightgold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 28,
    maxWidth: 280,
  },
  summaryCard: {
    width: "100%",
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  summaryText: {
    marginBottom: 18,
  },
  actionButton: {
    width: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default TransferSuccess;
