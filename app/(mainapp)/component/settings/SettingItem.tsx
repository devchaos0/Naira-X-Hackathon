import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  switchValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  switchValue,
  onToggle,
  onPress,
  containerStyle,
}) => {
  const isSwitch = switchValue !== undefined && onToggle !== undefined;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color={Colors.light.primary} />
      </View>
      <View style={styles.textBlock}>
        <CustomText variant="h6" bold color={Colors.light.baseblack}>
          {title}
        </CustomText>
        {subtitle ? (
          <CustomText variant="caption" color={Colors.light.text2}>
            {subtitle}
          </CustomText>
        ) : null}
      </View>
      <View style={styles.trailing}>
        {isSwitch ? (
          <Switch
            trackColor={{
              false: Colors.light.gray100,
              true: Colors.light.primary,
            }}
            thumbColor={switchValue ? Colors.light.white : Colors.light.white}
            ios_backgroundColor={Colors.light.gray100}
            value={switchValue}
            onValueChange={onToggle}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.light.gray100}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.grey100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textBlock: {
    flex: 1,
  },
  trailing: {
    marginLeft: 12,
  },
});

export default SettingItem;
