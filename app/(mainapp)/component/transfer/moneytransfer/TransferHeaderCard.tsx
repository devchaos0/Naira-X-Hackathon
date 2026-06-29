import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface TransferHeaderCardProps {
  title: string;
  subtitle: string;
  detail: string;
  meta?: string;
}

const TransferHeaderCard: React.FC<TransferHeaderCardProps> = ({
  title,
  subtitle,
  detail,
  meta,
}) => {
  return (
    <View style={styles.card}>
      <CustomText variant="h5" bold color={Colors.light.baseblack}>
        {title}
      </CustomText>
      <CustomText
        variant="body"
        color={Colors.light.text2}
        style={styles.subtitle}
      >
        {subtitle}
      </CustomText>
      <View style={styles.detailRow}>
        <CustomText variant="h6" bold color={Colors.light.baseblack}>
          {detail}
        </CustomText>
        {meta ? (
          <CustomText variant="caption" color={Colors.light.text2}>
            {meta}
          </CustomText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  subtitle: {
    marginTop: 8,
  },
  detailRow: {
    marginTop: 18,
  },
});

export default TransferHeaderCard;
