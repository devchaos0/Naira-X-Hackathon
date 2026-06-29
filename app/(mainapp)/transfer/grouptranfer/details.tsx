import MemberCard from "@/app/(mainapp)/component/transfer/grouptransfer/MemberCard";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const GroupDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = String(params.title || "Unnamed group");
  const subtitle = String(params.subtitle || "Crowd transfer group");
  const members = Number(params.members || 0);
  const createdAt = String(params.createdAt || "-");

  return (
    <View style={styles.container}>
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
          Group details
        </CustomText>
        <View style={styles.spacer} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <CustomText variant="h5" bold color={Colors.light.baseblack}>
            {title}
          </CustomText>
          <View style={styles.badge}>
            <CustomText variant="caption" bold color={Colors.light.primary}>
              {members} members
            </CustomText>
          </View>
        </View>
        <CustomText
          variant="body"
          color={Colors.light.text2}
          style={styles.subtitle}
        >
          {subtitle}
        </CustomText>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <CustomText variant="caption" color={Colors.light.text2}>
              Created
            </CustomText>
            <CustomText variant="h6" bold color={Colors.light.baseblack}>
              {createdAt}
            </CustomText>
          </View>
          <View style={styles.statBox}>
            <CustomText variant="caption" color={Colors.light.text2}>
              Pending
            </CustomText>
            <CustomText variant="h6" bold color={Colors.light.baseblack}>
              0
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.membersHeader}>
        <CustomText variant="h5" bold color={Colors.light.baseblack}>
          People in group
        </CustomText>
        <CustomText variant="caption" color={Colors.light.text2}>
          {members || 3} added
        </CustomText>
      </View>

      <ScrollView contentContainerStyle={styles.membersList}>
        {[
          {
            id: "1",
            name: "Aisha Johnson",
            accountNumber: "0123456789",
            bank: "GTBank",
          },
          {
            id: "2",
            name: "Oluwaseun Ade",
            accountNumber: "0201122334",
            bank: "Access Bank",
          },
          {
            id: "3",
            name: "Tobi Agboola",
            accountNumber: "0145879632",
            bank: "Zenith Bank",
          },
        ].map((person) => (
          <MemberCard
            key={person.id}
            name={person.name}
            accountNumber={person.accountNumber}
            bank={person.bank}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: "/transfer/grouptranfer/add-member",
            params: { groupTitle: title },
          })
        }
      >
        <CustomText variant="h6" bold color={Colors.light.white}>
          Add people
        </CustomText>
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
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: Colors.light.lightgold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  subtitle: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    minWidth: 100,
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  membersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  membersList: {
    paddingBottom: 24,
  },
});

export default GroupDetails;
