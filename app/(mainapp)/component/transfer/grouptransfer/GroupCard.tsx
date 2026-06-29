import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface GroupCardProps {
  title: string;
  subtitle: string;
  members: number;
  createdAt: string;
  onPress: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  title,
  subtitle,
  members,
  createdAt,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View>
          <CustomText variant="h5" bold color={Colors.light.baseblack}>
            {title}
          </CustomText>
          <CustomText variant="caption" color={Colors.light.text2}>
            {subtitle}
          </CustomText>
        </View>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.light.primary}
        />
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.statBox}>
          <CustomText variant="caption" color={Colors.light.text2}>
            Members
          </CustomText>
          <CustomText variant="h6" bold color={Colors.light.baseblack}>
            {members}
          </CustomText>
        </View>
        <View style={styles.statBox}>
          <CustomText variant="caption" color={Colors.light.text2}>
            Created
          </CustomText>
          <CustomText variant="h6" bold color={Colors.light.baseblack}>
            {createdAt}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
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
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    minWidth: 100,
  },
});

export default GroupCard;
