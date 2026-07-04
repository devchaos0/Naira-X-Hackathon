import { registerUser } from "@/api/mainapi/mainapi";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../shared/button";
import { Inputfield } from "../shared/inputfield";
import CustomText from "../shared/text/CustomText";
import { RegisterPayload } from "@/api/type";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const isFormValid = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length >= 6
    );
  }, [firstName, lastName, email, password]);

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data, variables) => {
      if (data?.success) {
        setFormError("");
        router.push({
          pathname: "/signup/mail",
          params: { email: variables.email },
        });
      } else {
        setFormError(data?.message || "Registration failed. Please try again.");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Unable to register right now. Please try again.";
      setFormError(message);
    },
  });

  const handleSubmit = () => {
    setFormError("");

    if (!isFormValid) {
      setFormError("Please complete all fields with a valid password.");
      return;
    }

    registerMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 42, gap: 6 }}>
        <CustomText bold={true} variant="h2">
          Sign up
        </CustomText>
      </View>
      <View style={{ marginTop: 12, gap: 16 }}>
        <Inputfield
          placeholder="Enter your first name"
          label="First name"
          value={firstName}
          onChangeText={setFirstName}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="default"
        />
        <Inputfield
          placeholder="Enter your last name"
          label="Last name"
          value={lastName}
          onChangeText={setLastName}
          leftIcon={true}
          leftIconSource={require("@/assets/icon/envilope.png")}
          keyboardType="default"
        />
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
        {formError ? (
          <CustomText style={styles.errorText}>{formError}</CustomText>
        ) : null}
        <View style={{ marginTop: 12 }}>
          <Button
            onPress={handleSubmit}
            loading={registerMutation.isPending}
            disabled={registerMutation.isPending}
          >
            Signup
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    color: Colors.light.error300,
    textAlign: "center",
  },
});
