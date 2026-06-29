import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface TransferTabSwitchProps {
  active: "wallet" | "bank";
  onChange: (value: "wallet" | "bank") => void;
}

const TransferTabSwitch: React.FC<TransferTabSwitchProps> = ({
  active,
  onChange,
}) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, active === "wallet" && styles.activeTab]}
        onPress={() => onChange("wallet")}
      >
        <CustomText
          variant="h5"
          bold={active === "wallet"}
          style={[styles.tabText, active === "wallet" && styles.activeTabText]}
        >
          Wallet
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === "bank" && styles.activeTab]}
        onPress={() => onChange("bank")}
      >
        <CustomText
          variant="h5"
          bold={active === "bank"}
          style={[styles.tabText, active === "bank" && styles.activeTabText]}
        >
          Bank
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    color: Colors.light.text2,
  },
  activeTabText: {
    color: Colors.light.baseblack,
  },
});

export default TransferTabSwitch;
