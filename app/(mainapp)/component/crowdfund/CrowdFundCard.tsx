// components/crowdfund/CrowdFundCard.tsx
import { CrowdFundItem } from "@/api/type";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";


interface CrowdFundCardProps {
  item: CrowdFundItem;
  onPress: (item: CrowdFundItem) => void;
}

const CrowdFundCard: React.FC<CrowdFundCardProps> = ({ item, onPress }) => {
  const calculateProgress = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const progress = calculateProgress(item.raisedAmount, item.targetAmount);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <CustomText variant="h4" bold style={styles.cardTitle}>
          {item.name}
        </CustomText>
        <View style={styles.codeBadge}>
          <CustomText style={styles.codeText}>{item.code}</CustomText>
        </View>
      </View>

      <CustomText variant="h6" style={styles.cardDetails}>
        {item.details}
      </CustomText>

      <View style={styles.cardFooter}>
        <View style={styles.cardStats}>
          <View>
            <CustomText variant="caption" style={styles.statLabel}>
              Duration
            </CustomText>
            <CustomText variant="h6" bold>
              {item.duration}
            </CustomText>
          </View>
          <View>
            <CustomText variant="caption" style={styles.statLabel}>
              Target
            </CustomText>
            <CustomText variant="h6" bold>
              ₦{item.targetAmount.toLocaleString()}
            </CustomText>
          </View>
          <View>
            <CustomText variant="caption" style={styles.statLabel}>
              Raised
            </CustomText>
            <CustomText variant="h6" bold style={styles.raisedText}>
              ₦{item.raisedAmount.toLocaleString()}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: slideAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <CustomText variant="caption" style={styles.progressText}>
          {Math.round(progress)}%
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    marginRight: 8,
  },
  codeBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  codeText: {
    color: Colors.light.white,
    fontSize: 10,
    fontFamily: "RedHatDisplay-Bold",
  },
  cardDetails: {
    color: Colors.light.text2,
    marginBottom: 12,
  },
  cardFooter: {
    marginBottom: 12,
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    color: Colors.light.text2,
    marginBottom: 2,
  },
  raisedText: {
    color: Colors.light.success,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.light.grey100,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: 3,
  },
  progressText: {
    color: Colors.light.text2,
    minWidth: 32,
    textAlign: "right",
  },
});

export default CrowdFundCard;
