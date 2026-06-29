import BankPicker from "@/app/(mainapp)/component/transfer/grouptransfer/BankPicker";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BANKS = [
  "Access Bank",
  "GTBank",
  "Zenith Bank",
  "First Bank",
  "Union Bank",
  "FCMB",
  "Zenith Bank",
];

const AddMember = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const groupTitle = String(params.groupTitle || "Group");
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !accountNumber.trim() || !bank.trim()) {
      Alert.alert("Missing fields", "Fill name, account number, and bank.");
      return;
    }

    Alert.alert("Added", `${name} added to ${groupTitle}`);
    setName("");
    setAccountNumber("");
    setBank("");
    setPickerOpen(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.light.baseblack}
          />
        </TouchableOpacity>
        <CustomText variant="h4" bold>
          Add member
        </CustomText>
        <View style={styles.spacer} />
      </View>

      <View style={styles.card}>
        <CustomText variant="h6" medium color={Colors.light.text2}>
          Group
        </CustomText>
        <CustomText
          variant="h5"
          bold
          color={Colors.light.baseblack}
          style={styles.groupName}
        >
          {groupTitle}
        </CustomText>

        <CustomText
          variant="h6"
          medium
          color={Colors.light.text2}
          style={styles.label}
        >
          Name
        </CustomText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor={Colors.light.text2}
          style={styles.input}
        />

        <CustomText
          variant="h6"
          medium
          color={Colors.light.text2}
          style={styles.label}
        >
          Account number
        </CustomText>
        <TextInput
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="0123456789"
          placeholderTextColor={Colors.light.text2}
          keyboardType="number-pad"
          style={styles.input}
        />

        <CustomText
          variant="h6"
          medium
          color={Colors.light.text2}
          style={styles.label}
        >
          Bank
        </CustomText>
        <BankPicker
          selectedBank={bank}
          banks={BANKS}
          open={pickerOpen}
          onToggle={() => setPickerOpen((prev) => !prev)}
          onSelect={(value) => {
            setBank(value);
            setPickerOpen(false);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.85}
        onPress={handleSave}
      >
        <CustomText variant="h6" bold color={Colors.light.white}>
          Add member
        </CustomText>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  spacer: {
    width: 44,
  },
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  groupName: {
    marginBottom: 20,
  },
  label: {
    marginTop: 18,
  },
  input: {
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: Colors.light.grey100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.light.baseblack,
    fontFamily: "OpenSans-Regular",
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default AddMember;
