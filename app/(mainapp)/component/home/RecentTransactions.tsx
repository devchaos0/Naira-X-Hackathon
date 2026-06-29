import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const RECENT_TRANSACTIONS = [
  {
    id: "1",
    title: "Transfer to Temi",
    amount: "-₦4,500",
    subtitle: "Sent to wallet",
    status: "Completed",
  },
  {
    id: "2",
    title: "Salary credited",
    amount: "+₦78,000",
    subtitle: "Payroll deposit",
    status: "Received",
  },
  {
    id: "3",
    title: "Group payment",
    amount: "-₦13,200",
    subtitle: "Shared bill",
    status: "Pending",
  },
];

const RecentTransactions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <CustomText variant="h5" bold color={Colors.light.baseblack}>
          Recent transactions
        </CustomText>
        <CustomText variant="caption" color={Colors.light.text2}>
          View all
        </CustomText>
      </View>
      <FlatList
        data={RECENT_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View>
              <CustomText variant="h6" bold>
                {item.title}
              </CustomText>
              <CustomText variant="caption" color={Colors.light.text2}>
                {item.subtitle}
              </CustomText>
            </View>
            <View style={styles.amountColumn}>
              <CustomText variant="h6" bold>
                {item.amount}
              </CustomText>
              <CustomText variant="caption" color={Colors.light.primary}>
                {item.status}
              </CustomText>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  amountColumn: {
    alignItems: "flex-end",
  },
});

export default RecentTransactions;
