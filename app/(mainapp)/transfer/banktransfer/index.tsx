import MoneyTransferBankPicker from "@/app/(mainapp)/component/transfer/moneytransfer/MoneyTransferBankPicker";
import TransferTabSwitch from "@/app/(mainapp)/component/transfer/moneytransfer/TransferTabSwitch";
import Topbar from "@/app/shared/Topbar/topbar";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Transfer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"wallet" | "bank">("wallet");
  const [walletLookup, setWalletLookup] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankPickerOpen, setBankPickerOpen] = useState(false);

  const walletReady = walletLookup.trim().length > 0;
  const bankReady = bankName.trim().length > 0 && bankAccount.trim().length > 0;

  const recipientName = useMemo(() => {
    if (activeTab === "wallet" && walletReady) {
      return walletLookup;
    }
    if (activeTab === "bank" && bankReady) {
      return bankName;
    }
    return "Recipient name";
  }, [activeTab, walletReady, walletLookup, bankReady, bankName]);

  const handleNext = () => {
    if (activeTab === "wallet" && walletReady) {
      router.push({
        pathname: "/transfer/banktransfer/wallet",
        params: {
          recipientName,
          walletAddress: walletLookup,
        },
      });
    }
    if (activeTab === "bank" && bankReady) {
      router.push({
        pathname: "/transfer/banktransfer/bank",
        params: {
          recipientName,
          accountNumber: bankAccount,
          bankName,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Topbar title="Transfer" />

      <TransferTabSwitch active={activeTab} onChange={setActiveTab} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === "wallet" ? (
          <>
            <CustomText
              variant="caption"
              color={Colors.light.text2}
              style={styles.fieldLabel}
            >
              Enter a wallet tag, email or account number for the recipient.
            </CustomText>
            <TextInput
              style={styles.input}
              placeholder="Wallet tag, email or account number"
              placeholderTextColor={Colors.light.gray100}
              value={walletLookup}
              onChangeText={setWalletLookup}
              autoCapitalize="none"
            />
          </>
        ) : (
          <>
            <CustomText
              variant="caption"
              color={Colors.light.text2}
              style={styles.fieldLabel}
            >
              Account number
            </CustomText>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor={Colors.light.gray100}
              keyboardType="number-pad"
              value={bankAccount}
              onChangeText={setBankAccount}
            />
            <CustomText
              variant="caption"
              color={Colors.light.text2}
              style={styles.fieldLabel}
            >
              Select bank
            </CustomText>
            <MoneyTransferBankPicker
              selectedBank={bankName}
              banks={[
                "GTBank",
                "Access Bank",
                "Zenith Bank",
                "First Bank",
                "Union Bank",
                "FCMB",
                "UBA",
                "Polaris Bank",
              ]}
              open={bankPickerOpen}
              onToggle={() => setBankPickerOpen((prev) => !prev)}
              onSelect={(bank) => {
                setBankName(bank);
                setBankPickerOpen(false);
              }}
            />
          </>
        )}

        {(activeTab === "wallet" ? walletReady : bankReady) ? (
          <View style={styles.recipientSummary}>
            <CustomText variant="h6" bold color={Colors.light.baseblack}>
              {recipientName}
            </CustomText>
            <CustomText
              variant="body"
              color={Colors.light.text2}
              style={styles.summaryText}
            >
              {activeTab === "wallet"
                ? "Your wallet recipient is ready to verify."
                : "Bank beneficiary details are complete."}
            </CustomText>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            styles.nextButton,
            !(activeTab === "wallet" ? walletReady : bankReady) &&
              styles.disabledButton,
          ]}
          activeOpacity={0.8}
          disabled={!(activeTab === "wallet" ? walletReady : bankReady)}
          onPress={handleNext}
        >
          <CustomText variant="h6" bold color={Colors.light.white}>
            Next
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  fieldLabel: {
    marginBottom: 10,
    marginTop: 14,
  },
  input: {
    backgroundColor: Colors.light.white,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.light.baseblack,
    borderWidth: 1,
    borderColor: Colors.light.gray100,
  },
  recipientSummary: {
    marginTop: 24,
    padding: 18,
    borderRadius: 20,
    backgroundColor: Colors.light.white,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  summaryText: {
    marginTop: 8,
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.light.gray100,
  },
});

export default Transfer;
