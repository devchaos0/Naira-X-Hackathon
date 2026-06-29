import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface TransferTabButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const TransferTabButton: React.FC<TransferTabButtonProps> = ({
  label,
  active,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        active ? styles.activeButton : styles.inactiveButton,
        style,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <CustomText
        variant="body"
        bold={active}
        color={active ? Colors.light.white : Colors.light.baseblack}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: Colors.light.primary,
  },
  inactiveButton: {
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.gray100,
  },
});

export default TransferTabButton;
