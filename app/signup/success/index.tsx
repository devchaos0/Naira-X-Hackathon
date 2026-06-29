import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import Button from "@/app/shared/button";
import { router } from "expo-router";
import CustomText from "@/app/shared/text/CustomText";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const SignupSuccess = () => {
  const handleSetPasswordPin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", gap: 12 }}>
        <AnimatedLottieView
          source={require("@/assets/Success2.json")}
          style={{
            width: "100%",
            height: hp("33%"),
            backgroundColor: "transparent",
          }}
          resizeMode="cover"
          autoPlay
          loop
        />
        <CustomText bold={true} style={{ fontSize: 22 }}>
          Hurray!
        </CustomText>
        <View>
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 16,
              color: Colors.light.gray200,
            }}
          >
            Your account has been successfully created.
          </CustomText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSetPasswordPin}>Continue</Button>
      </View>
    </View>
  );
};

export default SignupSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: hp("28%"),
  },
});
