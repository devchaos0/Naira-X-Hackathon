// components/crowdfund/CreateCrowdFundModal.tsx
import { CreateCrowdFundForm } from "@/api/type";
import { Inputfield } from "@/app/shared/inputfield";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";


interface CreateCrowdFundModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: CreateCrowdFundForm;
  setForm: (form: CreateCrowdFundForm) => void;
}

const CreateCrowdFundModal: React.FC<CreateCrowdFundModalProps> = ({
  visible,
  onClose,
  onSubmit,
  form,
  setForm,
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
              Create Crowd Fund
            </CustomText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={Colors.light.baseblack} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Inputfield
                label="Name"
                placeholder="Enter crowd fund name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Inputfield
                label="Details"
                placeholder="Enter crowd fund details"
                value={form.details}
                onChangeText={(text) => setForm({ ...form, details: text })}
                multiline
                style={styles.textArea}
              />
            </View>

            <View style={styles.formGroup}>
              <Inputfield
                label="Duration"
                placeholder="e.g., 30 days"
                value={form.duration}
                onChangeText={(text) => setForm({ ...form, duration: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Inputfield
                label="Target Amount (₦)"
                placeholder="Enter target amount"
                value={form.amount}
                onChangeText={(text) => setForm({ ...form, amount: text })}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <CustomText style={styles.submitButtonText}>
                Create Crowd Fund
              </CustomText>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: "90%",
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
  formGroup: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  submitButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontFamily: "RedHatDisplay-Bold",
  },
});

export default CreateCrowdFundModal;
