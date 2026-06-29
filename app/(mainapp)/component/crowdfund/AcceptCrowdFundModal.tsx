// components/crowdfund/AcceptCrowdFundModal.tsx
import { Inputfield } from "@/app/shared/inputfield";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface AcceptCrowdFundModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  code: string;
  setCode: (code: string) => void;
}

const AcceptCrowdFundModal: React.FC<AcceptCrowdFundModalProps> = ({
  visible,
  onClose,
  onSubmit,
  code,
  setCode,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <CustomText variant="h3" bold>
              Accept Crowd Fund
            </CustomText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={Colors.light.baseblack} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <CustomText variant="h6" style={styles.description}>
              Enter the crowd fund code to accept and join this crowd fund
            </CustomText>

            <View style={styles.formGroup}>
              <Inputfield
                label="Crowd Fund Code"
                placeholder="Enter 6-digit code"
                value={code}
                onChangeText={setCode}
                maxLength={10}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <CustomText style={styles.submitButtonText}>
                Accept Crowd Fund
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  modalContent: {
    padding: 20,
  },
  description: {
    color: Colors.light.text2,
    marginBottom: 20,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: Colors.light.success,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  submitButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontFamily: "RedHatDisplay-Bold",
  },
});

export default AcceptCrowdFundModal;
