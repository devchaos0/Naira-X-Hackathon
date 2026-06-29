import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import HalfScreenModal from "../modal";
import CustomText from "../text/CustomText";
import { Inputfield } from "../inputfield";

interface SelectionOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectionOptionProps {
  options: SelectionOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  halfscreen?: boolean;
  optionStyle?: object;
  loading?: boolean;
  searchable?: boolean; // 👈 new prop for search functionality
  searchPlaceholder?: string; // 👈 custom search placeholder
}

const SelectionOption: React.FC<SelectionOptionProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  label,
  disabled = false,
  halfscreen = false,
  optionStyle,
  loading = false,
  searchable = false, // 👈 default false
  searchPlaceholder = "Search options...", // 👈 default search placeholder
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (value: string) => {
    onSelect(value);
    setModalVisible(false);
    setSearchQuery(""); // Reset search when an option is selected
  };

  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : placeholder;
  };

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleModalClose = () => {
    setModalVisible(false);
    setSearchQuery(""); // Reset search when modal closes
  };

  const renderOption = ({ item }: { item: SelectionOption }) => (
    <Pressable
      style={[
        styles.optionItem,
        selectedValue === item.value && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item.value)}
    >
      {item.icon && <View style={styles.optionIcon}>{item.icon}</View>}
      <CustomText
        style={[
          styles.optionText,
          selectedValue === item.value && styles.selectedOptionText,
        ]}
      >
        {item.label}
      </CustomText>
      {selectedValue === item.value && (
        <MaterialIcons
          name="check"
          size={24}
          color="#007AFF"
          style={styles.checkIcon}
        />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {label && (
        <CustomText bold={true} style={styles.label}>
          {label}
        </CustomText>
      )}

      <Pressable
        style={[styles.selector, disabled && styles.disabled, optionStyle]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <CustomText
          variant="h4"
          style={[
            styles.selectorText,
            !selectedValue && styles.placeholderText,
          ]}
        >
          {getSelectedLabel()}
        </CustomText>
        <MaterialIcons
          name={modalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#666"
        />
      </Pressable>

      <HalfScreenModal
        visible={modalVisible}
        onClose={handleModalClose}
        halfscreen={halfscreen}
      >
        <View style={styles.modalHeader}>
          <CustomText bold style={styles.modalTitle}>
            {label || "Select an option"}
          </CustomText>
        </View>

        {/* Search Input */}
        {searchable && (
          <View style={styles.searchContainer}>
            <Inputfield
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              icon={true}
              iconSource={<MaterialIcons name="search" size={20} color="#666" />}
              iconPosition="left"
            />
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <CustomText style={styles.loadingText}>Loading...</CustomText>
          </View>
        ) : (
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={renderOption}
            contentContainerStyle={styles.optionsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <CustomText style={styles.emptyText}>
                  {searchQuery ? "No options found" : "No options available"}
                </CustomText>
              </View>
            }
          />
        )}
      </HalfScreenModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  selector: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 52,
  },
  disabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.6,
  },
  selectorText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  placeholderText: {
    color: "#999",
    fontSize: 13,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalTitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionsList: {
    padding: 16,
    flexGrow: 1,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedOptionText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  checkIcon: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default SelectionOption;