import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "./shared/text/CustomText";

const SplashScreen = () => {
  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirect) {
      router.navigate("/onboarding");
    }
  }, [redirect]);

  return (
    <View style={styles.container}>
     <CustomText>Naira - x</CustomText>
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
