import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Inputfield } from "../shared/inputfield";
import CustomText from "../shared/text/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Button from "../shared/button";
import { router } from "expo-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderEyeIcon = () => (
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={24}
      color={Colors.light.baseblack}
    />
  );

  return (
    <View style={styles.container}>

      <View style={{ marginTop: 42, gap: 6 }}>
        <CustomText bold={true} variant="h2">
          Sign up
        </CustomText>
      </View>
      <View style={{ marginTop: 12, gap: 16 }}>
        <Inputfield
          placeholder="Enter your email"
          label="Email"
          value={email}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="email-address"
        />
        <Inputfield
          placeholder="Enter your full name"
          label="Full name"
          value={email}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="default"
        />
        <Inputfield
          placeholder="Enter your phone number"
          label="Phone Number"
          value={email}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="number-pad"
        />
        <Inputfield
          placeholder="*******"
          label="Password"
          value={password}
          onChangeText={setPassword}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/padlock.png")}
          rightIcon={true}
          rightIconSource={renderEyeIcon()}
          onRightIconPress={togglePasswordVisibility}
          secureTextEntry={!showPassword}
        />
        <View style={{ marginTop: 12 }}>
          <Button onPress={ () => router.navigate("/signup/mail") }>Signup</Button>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  image: {
    height: 87,
    width: 87,
    resizeMode: "contain",
  },
});
