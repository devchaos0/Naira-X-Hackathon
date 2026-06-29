// components/crowdfund/CrowdFundTabs.tsx
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CrowdFundTabsProps {
  activeTab: "my" | "all";
  onTabChange: (tab: "my" | "all") => void;
  myCount: number;
  allCount: number;
}

const CrowdFundTabs: React.FC<CrowdFundTabsProps> = ({
  activeTab,
  onTabChange,
  myCount,
  allCount,
}) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "my" && styles.activeTab]}
        onPress={() => onTabChange("my")}
      >
        <CustomText
          variant="h5"
          bold={activeTab === "my"}
          style={[styles.tabText, activeTab === "my" && styles.activeTabText]}
        >
          My Crowd Funds ({myCount})
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "all" && styles.activeTab]}
        onPress={() => onTabChange("all")}
      >
        <CustomText
          variant="h5"
          bold={activeTab === "all"}
          style={[styles.tabText, activeTab === "all" && styles.activeTabText]}
        >
          All Crowd Funds ({allCount})
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

export default CrowdFundTabs;
