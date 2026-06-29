import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <CustomText variant="h5" medium color={Colors.light.text2}>
          Good morning,
        </CustomText>
        <CustomText variant="h2" bold color={Colors.light.baseblack}>
          Ayomide
        </CustomText>
      </View>

      <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
        <Ionicons name="person-circle" size={40} color={Colors.light.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  profileButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.light.grey100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeHeader;
