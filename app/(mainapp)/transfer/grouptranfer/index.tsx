import GroupCard from "@/app/(mainapp)/component/transfer/grouptransfer/GroupCard";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const GroupTransfer = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newGroupTitle = String(params.newGroupTitle || "");
  const newGroupSubtitle = String(
    params.newGroupSubtitle || "Crowd transfer group",
  );
  const newGroupMembers = Number(params.newGroupMembers || 0);
  const newGroupCreatedAt = String(params.newGroupCreatedAt || "");

  const hasGroup = Boolean(newGroupTitle);

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
        <CustomText variant="h4" bold>
          Group Transfer
        </CustomText>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <CustomText variant="h3" bold color={Colors.light.baseblack}>
          Pay multiple people all at once.
        </CustomText>
        <CustomText
          variant="body"
          color={Colors.light.text2}
          style={styles.helpText}
        >
          Create a group payment, split costs, and send funds in one go.
        </CustomText>
      </View>

      {hasGroup ? (
        <View style={styles.groupsSection}>
          <CustomText
            variant="h5"
            bold
            color={Colors.light.baseblack}
            style={styles.sectionTitle}
          >
            Your groups
          </CustomText>
          <GroupCard
            title={newGroupTitle}
            subtitle={newGroupSubtitle}
            members={newGroupMembers}
            createdAt={newGroupCreatedAt}
            onPress={() =>
              router.push({
                pathname: "/transfer/grouptranfer/details",
                params: {
                  title: newGroupTitle,
                  subtitle: newGroupSubtitle,
                  members: String(newGroupMembers),
                  createdAt: newGroupCreatedAt,
                },
              })
            }
          />
        </View>
      ) : (
        <View style={styles.emptyState}>
          <CustomText variant="h6" color={Colors.light.text2}>
            No groups created yet. Use the button below to create your first
            crowd transfer group.
          </CustomText>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push("/transfer/grouptranfer/create")}
      >
        <Ionicons name="add" size={28} color={Colors.light.white} />
      </TouchableOpacity>
    </View>
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
  content: {
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  helpText: {
    marginTop: 12,
    maxWidth: 320,
  },
  groupsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  emptyState: {
    marginTop: 24,
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
});

export default GroupTransfer;
