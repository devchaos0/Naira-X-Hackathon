import TransferHeaderCard from "@/app/(mainapp)/component/transfer/moneytransfer/TransferHeaderCard";
import Loader from "@/app/shared/loading";
import CustomModal from "@/app/shared/modal";
import OtpInput from "@/app/shared/otpinput/OtpInput";
import CustomText from "@/app/shared/text/CustomText";
import Topbar from "@/app/shared/Topbar/topbar";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BankTransfer = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const recipientName = String(params.recipientName || "Recipient");
  const accountNumber = String(params.accountNumber || "0000000000");
  const bankName = String(params.bankName || "Bank name");

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canProceed = amount.trim().length > 0 && description.trim().length > 0;

  const handleConfirm = () => {
    setPreviewOpen(true);
  };

  const handleOtpSubmit = (pin: string) => {
    setOtpOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: "/transfer/banktransfer/success",
        params: {
          transferType: "Bank transfer",
          recipientName,
          amount: amount.trim(),
          detail: `${bankName} • ${accountNumber}`,
        },
      });
    }, 1400);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Topbar title="Bank transfer" />
      <View style={styles.pageHeader}>
        <CustomText
          variant="body"
          color={Colors.light.text2}
          style={styles.bodyText}
        >
          Review bank details and complete the transfer securely.
        </CustomText>
      </View>

      <TransferHeaderCard
        title={recipientName}
        subtitle={bankName}
        detail={accountNumber}
        meta="Bank beneficiary"
      />

      <View style={styles.form}>
        <CustomText
          variant="caption"
          color={Colors.light.text2}
          style={styles.fieldLabel}
        >
          Amount
        </CustomText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={Colors.light.gray100}
          value={amount}
          onChangeText={setAmount}
        />

        <CustomText
          variant="caption"
          color={Colors.light.text2}
          style={styles.fieldLabel}
        >
          Description
        </CustomText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Why are you sending money?"
          placeholderTextColor={Colors.light.gray100}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.actionButton, !canProceed && styles.disabledButton]}
        disabled={!canProceed}
        onPress={handleConfirm}
      >
        <CustomText variant="h6" bold color={Colors.light.white}>
          Send
        </CustomText>
      </TouchableOpacity>

      <CustomModal visible={previewOpen} onClose={() => setPreviewOpen(false)}>
        <View style={styles.modalContent}>
          <CustomText variant="h4" bold color={Colors.light.baseblack}>
            Confirm details
          </CustomText>
          <CustomText
            variant="body"
            color={Colors.light.text2}
            style={styles.modalSubtitle}
          >
            Check the transfer information and continue with your PIN.
          </CustomText>

          <View style={styles.modalGrid}>
            <View style={styles.gridItem}>
              <CustomText variant="caption" color={Colors.light.text2}>
                Recipient
              </CustomText>
              <CustomText variant="h6" bold color={Colors.light.baseblack}>
                {recipientName}
              </CustomText>
            </View>
            <View style={styles.gridItem}>
              <CustomText variant="caption" color={Colors.light.text2}>
                Bank
              </CustomText>
              <CustomText variant="h6" bold color={Colors.light.baseblack}>
                {bankName}
              </CustomText>
            </View>
            <View style={styles.gridItem}>
              <CustomText variant="caption" color={Colors.light.text2}>
                Account
              </CustomText>
              <CustomText variant="h6" bold color={Colors.light.baseblack}>
                {accountNumber}
              </CustomText>
            </View>
            <View style={styles.gridItem}>
              <CustomText variant="caption" color={Colors.light.text2}>
                Amount
              </CustomText>
              <CustomText variant="h6" bold color={Colors.light.baseblack}>
                ₦{amount}
              </CustomText>
            </View>
            <View style={styles.gridItemFull}>
              <CustomText variant="caption" color={Colors.light.text2}>
                Note
              </CustomText>
              <CustomText variant="h6" color={Colors.light.baseblack}>
                {description}
              </CustomText>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.modalButton]}
            onPress={() => {
              setPreviewOpen(false);
              setTimeout(() => setOtpOpen(true), 250);
            }}
          >
            <CustomText variant="h6" bold color={Colors.light.white}>
              Confirm & continue
            </CustomText>
          </TouchableOpacity>
        </View>
      </CustomModal>

      <OtpInput
        open={otpOpen}
        handleClose={() => setOtpOpen(false)}
        submitHandler={handleOtpSubmit}
      />

      {isLoading ? (
        <View style={styles.loadingLayer}>
          <Loader />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  pageHeader: {
    marginBottom: 22,
  },
  bodyText: {
    marginTop: 8,
    maxWidth: "90%",
  },
  form: {
    marginBottom: 32,
  },
  fieldLabel: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.light.white,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.light.baseblack,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.light.gray100,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.light.gray100,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSubtitle: {
    marginTop: 10,
    marginBottom: 20,
  },
  modalDetails: {
    flex: 1,
  },
  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  gridItem: {
    width: "48%",
    backgroundColor: Colors.light.gray300,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  gridItemFull: {
    width: "100%",
    backgroundColor: Colors.light.gray300,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  detailRow: {
    marginTop: 16,
  },
  modalButton: {
    marginTop: 24,
  },
  loadingLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BankTransfer;
