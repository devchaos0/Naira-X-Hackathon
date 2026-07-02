import CustomText from "@/app/shared/text/CustomText";
import { SFColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface FloatingActionButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onCreatePress: () => void;
  onAcceptPress: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  isOpen,
  onToggle,
  onCreatePress,
  onAcceptPress,
}) => {
  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.menu}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onCreatePress}
            style={styles.actionCard}
          >
            <View style={styles.iconPurple}>
              <Ionicons
                name="sparkles-outline"
                size={22}
                color={SFColors.white}
              />
            </View>

            <View>
              <CustomText style={styles.actionTitle}>Create Squad</CustomText>

              <CustomText style={styles.actionSub}>
                Start a new mission
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onAcceptPress}
            style={styles.actionCard}
          >
            <View style={styles.iconGold}>
              <Ionicons
                name="ticket-outline"
                size={22}
                color={SFColors.white}
              />
            </View>

            <View>
              <CustomText style={styles.actionTitle}>Join Squad</CustomText>

              <CustomText style={styles.actionSub}>
                Enter invite code
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onToggle}
        style={[styles.mainButton, isOpen && styles.openButton]}
      >
        <Ionicons
          name={isOpen ? "close" : "add"}
          size={34}
          color={SFColors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 100,
    alignItems: "flex-end",
  },

  menu: {
    marginBottom: 26,
    gap: 12,
  },

  actionCard: {
    width: 220,

    backgroundColor: SFColors.white,

    padding: 12,

    borderRadius: 22,

    flexDirection: "row",
    alignItems: "center",

    gap: 12,

    borderWidth: 1,
    borderColor: SFColors.border,

    shadowColor: SFColors.purple600,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },

  iconPurple: {
    width: 44,
    height: 44,
    borderRadius: 16,

    backgroundColor: SFColors.purple600,

    alignItems: "center",
    justifyContent: "center",
  },

  iconGold: {
    width: 44,
    height: 44,
    borderRadius: 16,

    backgroundColor: SFColors.goldDeep,

    alignItems: "center",
    justifyContent: "center",
  },

  actionTitle: {
    fontWeight: "900",
    color: SFColors.textPrimary,
    fontSize: 14,
  },

  actionSub: {
    marginTop: 3,
    color: SFColors.textSecondary,
    fontSize: 11,
  },

  mainButton: {
    width: 66,
    height: 66,

    borderRadius: 33,

    backgroundColor: SFColors.purple600,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: SFColors.purple600,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  openButton: {
    backgroundColor: SFColors.purple900,
  },
});

export default FloatingActionButton;
