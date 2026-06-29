import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MoneyTransferBankPickerProps {
  selectedBank: string;
  banks: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (bank: string) => void;
}

const MoneyTransferBankPicker: React.FC<MoneyTransferBankPickerProps> = ({
  selectedBank,
  banks,
  open,
  onToggle,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={onToggle}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.label}>{selectedBank || "Select bank"}</Text>
        </View>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.light.baseblack}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.options}>
          <FlatList
            data={banks}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  label: {
    color: Colors.light.baseblack,
    fontFamily: "OpenSans-Regular",
  },
  options: {
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.border,
    maxHeight: 200,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  optionText: {
    color: Colors.light.baseblack,
    fontFamily: "OpenSans-Regular",
  },
});

export default MoneyTransferBankPicker;
