import { setupWallet } from "@/api/mainapi/mainapi";
import { StorageService } from "@/api/storageService";
import { getApiErrorMessage } from "@/utils/apiError";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  bg: "#FFFFFF",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
  success: "#1F9254",
};

export default function KycSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    accountName: "",
    bvn: "",
    gender: "male",
    age: "",
    pin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.accountName || !form.bvn || !form.age || !form.pin) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await setupWallet({
        accountName: form.accountName,
        bvn: form.bvn,
        gender: form.gender,
        age: form.age,
        pin: form.pin,
      });

      if (response?.success) {
        await StorageService.setItem("walletSetupCompleted", true);
        Alert.alert(
          "Success",
          response.message || "Wallet created successfully.",
        );
        router.replace("/(mainapp)/(tabs)" as any);
      } else {
        Alert.alert("Error", response?.message || "Unable to complete KYC.");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        getApiErrorMessage(error, "Unable to complete KYC."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            {/* <Text style={styles.backText}>←</Text> */}
            <Ionicons name="arrow-back" size={24} color={palette.ink} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Complete your KYC</Text>
            <Text style={styles.subtitle}>
              Set up your wallet details securely to unlock transfers.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            value={form.accountName}
            onChangeText={(value) => handleChange("accountName", value)}
            placeholder="Account name"
          />

          <Text style={styles.label}>BVN</Text>
          <TextInput
            style={styles.input}
            value={form.bvn}
            onChangeText={(value) => handleChange("bvn", value)}
            placeholder="11-digit BVN"
            keyboardType="number-pad"
            maxLength={11}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.row}>
            {["male", "female"].map((option) => {
              const selected = form.gender === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => handleChange("gender", option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={form.age}
            onChangeText={(value) => handleChange("age", value)}
            placeholder="Enter age"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>PIN</Text>
          <TextInput
            style={styles.input}
            value={form.pin}
            onChangeText={(value) => handleChange("pin", value)}
            placeholder="4-digit PIN"
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "Submitting..." : "Complete KYC"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg },
  content: { padding: 20, paddingTop: 12 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.mist,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backText: { fontSize: 22, color: palette.ink },
  title: { fontSize: 24, fontWeight: "700", color: palette.ink },
  subtitle: { fontSize: 14, color: palette.muted, marginTop: 4 },
  card: {
    backgroundColor: palette.bg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.hairline,
    padding: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.ink,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.hairline,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.ink,
    backgroundColor: palette.bg,
  },
  row: { flexDirection: "row", gap: 10 },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.hairline,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: palette.indigo,
    borderColor: palette.indigo,
  },
  optionText: { color: palette.ink, fontWeight: "600" },
  optionTextSelected: { color: palette.bg },
  submitButton: {
    marginTop: 20,
    backgroundColor: palette.indigo,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitText: { color: palette.bg, fontWeight: "700" },
});
