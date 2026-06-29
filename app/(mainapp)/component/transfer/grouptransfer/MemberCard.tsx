import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface MemberCardProps {
  name: string;
  accountNumber: string;
  bank: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  accountNumber,
  bank,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <CustomText variant="h6" bold color={Colors.light.baseblack}>
          {name}
        </CustomText>
        <CustomText variant="caption" color={Colors.light.primary}>
          {bank}
        </CustomText>
      </View>
      <CustomText variant="caption" color={Colors.light.text2}>
        {accountNumber}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default MemberCard;
