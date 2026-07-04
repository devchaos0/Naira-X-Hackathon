import { StorageService } from "@/api/storageService";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./shared/text/CustomText";

const SplashScreen = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await StorageService.getItem("accessToken");

      if (token) {
        router.replace("/(mainapp)/(tabs)");
        return;
      }

      const timer = setTimeout(() => {
        router.replace("/onboarding");
      }, 2000);

      return () => clearTimeout(timer);
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <CustomText color={Colors.light.white}>Naira - x</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default SplashScreen;
