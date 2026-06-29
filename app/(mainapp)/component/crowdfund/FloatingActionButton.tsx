import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
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
    <View style={styles.floatingContainer}>
      {isOpen && (
        <View style={styles.floatingOptions}>
          <TouchableOpacity
            style={[styles.floatingOption, styles.createOption]}
            onPress={onCreatePress}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={Colors.light.white}
            />
            <CustomText style={styles.floatingOptionText}>Create</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingOption, styles.acceptOption]}
            onPress={onAcceptPress}
          >
            <Ionicons
              name="enter-outline"
              size={24}
              color={Colors.light.white}
            />
            <CustomText style={styles.floatingOptionText}>Accept</CustomText>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={onToggle}>
        <Ionicons
          name={isOpen ? "close" : "add"}
          size={32}
          color={Colors.light.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: 10,
    right: 20,
    alignItems: "center",
  },
  floatingOptions: {
    marginBottom: 16,
    alignItems: "center",
  },
  floatingOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  createOption: {
    backgroundColor: Colors.light.primary,
  },
  acceptOption: {
    backgroundColor: Colors.light.success,
  },
  floatingOptionText: {
    color: Colors.light.white,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "RedHatDisplay-Bold",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default FloatingActionButton;
