import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface QuickActionsProps {
  onTransferPress: () => void;
  onGroupTransferPress: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onTransferPress,
  onGroupTransferPress,
}) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h5" bold color={Colors.light.baseblack}>
        Quick actions
      </CustomText>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.8}
          onPress={onTransferPress}
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="arrow-up-circle"
              size={24}
              color={Colors.light.primary}
            />
          </View>
          <CustomText variant="h6" bold>
            Transfer
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.8}
          onPress={onGroupTransferPress}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="people" size={24} color={Colors.light.primary} />
          </View>
          <CustomText variant="h6" bold>
            Group transfer
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.light.grey100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
});

export default QuickActions;
