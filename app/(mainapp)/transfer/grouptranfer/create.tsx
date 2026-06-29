import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const CreateGroup = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [groupNote, setGroupNote] = useState("");

  const handleCreate = () => {
    if (!groupName.trim()) {
      Alert.alert(
        "Enter a group name",
        "Please provide a title for the group.",
      );
      return;
    }

    router.replace({
      pathname: "/transfer/grouptranfer",
      params: {
        newGroupTitle: groupName,
        newGroupSubtitle: groupNote || "Crowd transfer group",
        newGroupMembers: "0",
        newGroupCreatedAt: new Date().toISOString().split("T")[0],
      },
    });
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
          Create group
        </CustomText>
        <View style={styles.spacer} />
      </View>

      <View style={styles.card}>
        <CustomText variant="h6" medium color={Colors.light.text2}>
          Title
        </CustomText>
        <TextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Enter group name"
          placeholderTextColor={Colors.light.text2}
          style={styles.input}
        />

        <CustomText
          variant="h6"
          medium
          color={Colors.light.text2}
          style={styles.label}
        >
          Description
        </CustomText>
        <TextInput
          value={groupNote}
          onChangeText={setGroupNote}
          placeholder="Optional note"
          placeholderTextColor={Colors.light.text2}
          style={[styles.input, styles.multiline]}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleCreate}
        activeOpacity={0.85}
      >
        <CustomText variant="h6" bold color={Colors.light.white}>
          Create group
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
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  label: {
    marginTop: 20,
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
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default CreateGroup;
