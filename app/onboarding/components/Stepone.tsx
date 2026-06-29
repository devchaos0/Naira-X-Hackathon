import CustomText from "@/app/shared/text/CustomText";
import React, { FC, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface SteponeProps {
  isVisible: boolean;
}

const Stepone: FC<SteponeProps> = ({ isVisible }) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      animationProgress.current.setValue(0);
      Animated.sequence([
        Animated.timing(animationProgress.current, {
          toValue: 0.7,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/onboarding1.jpg")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <CustomText centered={true} bold={true} style={styles.title}>
          Send Money Across Borders, Fast.
        </CustomText>
        <CustomText centered={true} medium={true} style={styles.info}>
          Experience seamless international transactions, safe, secure, and
          instant. Say goodbye to delays
        </CustomText>
      </View>
    </View>
  );
};

export default Stepone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    paddingHorizontal: 16,
    position: "absolute",
    bottom: hp("25%"),
  },
  title: {
    fontSize: 19,
    color: "#fff",
    marginBottom: 16,
  },
  info: {
    fontSize: 15,
    color: "#fff",
  },
});
