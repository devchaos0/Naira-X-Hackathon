import { loginUser } from "@/api/mainapi/mainapi";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Button from "../shared/button";
import { Inputfield } from "../shared/inputfield";
import CustomText from "../shared/text/CustomText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

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

  const loginMutation = useMutation({
    mutationFn: async () => loginUser({ email, password }),
    onSuccess: (data) => {
      if (data?.success) {
        setFormError("");
        router.replace("/(mainapp)/(tabs)");
      } else {
        setFormError(data?.message || "Login failed.");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Unable to log you in right now.";
      setFormError(message);
    },
  });

  const handleLogin = () => {
    setFormError("");

    if (!email.trim() || !password.trim()) {
      setFormError("Please enter your email and password.");
      return;
    }

    loginMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />
      <View style={{ marginTop: 12, gap: 6 }}>
        <CustomText bold={true} variant="h1">
          Login !
        </CustomText>
        <CustomText bold={true} variant="h5">
          Please Enter Your Details.
        </CustomText>
      </View>
      <View style={{ marginTop: 12, gap: 6 }}>
        <Inputfield
          placeholder="Enter your email"
          label="Email"
          value={email}
          onChangeText={setEmail}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="email-address"
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

        <Pressable
          style={{ alignSelf: "flex-end" }}
          // onPress={() => router.push("/forgetpassword")}
        >
          <CustomText bold={true} color={Colors.light.primary}>
            Forgot Password ?
          </CustomText>
        </Pressable>

        {formError ? (
          <CustomText style={styles.errorText}>{formError}</CustomText>
        ) : null}

        <View style={{ marginTop: 12 }}>
          <Button
            onPress={handleLogin}
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Log In
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
  errorText: {
    marginTop: 8,
    color: Colors.light.error300,
    textAlign: "center",
  },
});
