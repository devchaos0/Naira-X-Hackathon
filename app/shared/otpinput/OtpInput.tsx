import HalfScreenModal from "@/app/shared/modal";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface OtpInputProps {
  handleClose: () => void;
  open: boolean;
  submitHandler: (digit: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  handleClose,
  open,
  submitHandler,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // 4 digits
  const inputRefs = useRef<TextInput[]>([]);

  const submit = (digit: string) => {
    submitHandler(digit);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleDigitPress = (digit: string) => {
    const emptyIndex = otp.findIndex((d) => d === "");
    if (emptyIndex !== -1) {
      const newOtp = [...otp];
      newOtp[emptyIndex] = digit;
      setOtp(newOtp);
      const otpString = newOtp.join("");

      if (emptyIndex < otp.length - 1) {
        inputRefs.current[emptyIndex + 1]?.focus();
      } else {
        inputRefs.current[emptyIndex]?.blur();
      }

      // ✅ submit when last digit (4th) is entered
      if (emptyIndex === otp.length - 1) {
        submit(otpString);
      }
    }
  };

  const handleBackspace = () => {
    const filledIndex = otp.findLastIndex((d) => d !== "");
    if (filledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[filledIndex] = "";
      setOtp(newOtp);
      inputRefs.current[filledIndex]?.focus();
    }
  };

  const renderOtpBoxes = () => {
    return otp.map((value, index) => (
      <TextInput
        key={`otp-${index}`}
        style={styles.otpBox}
        editable={false}
        keyboardType="numeric"
        maxLength={1}
        secureTextEntry={true}
        value={value ? "•" : ""}
        ref={(ref) => (inputRefs.current[index] = ref!)}
      />
    ));
  };

  const renderNumPadButton = (digit: string) => {
    return (
      <TouchableOpacity
        key={`numPad-${digit}`}
        style={styles.numPadButton}
        onPress={() => handleDigitPress(digit)}
      >
        <CustomText style={styles.numPadText}>{digit}</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <HalfScreenModal halfscreen visible={open} onClose={handleClose}>
      <View style={styles.container}>
        <CustomText style={styles.title}>Enter Transaction PIN</CustomText>

        <View style={styles.otpContainer}>{renderOtpBoxes()}</View>

        <View style={styles.numPadContainer}>
          <View style={styles.numPadRow}>
            {["1", "2", "3"].map(renderNumPadButton)}
          </View>
          <View style={styles.numPadRow}>
            {["4", "5", "6"].map(renderNumPadButton)}
          </View>
          <View style={styles.numPadRow}>
            {["7", "8", "9"].map(renderNumPadButton)}
          </View>
          <View style={styles.numPadRow}>
            <View style={styles.backSpace}></View>
            {renderNumPadButton("0")}
            <TouchableOpacity
              style={styles.backSpace}
              onPress={handleBackspace}
            >
              <Ionicons name="backspace-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </HalfScreenModal>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 34,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpBox: {
    width: 40,
    height: 52,
    borderWidth: 1,
    borderColor: "#FAFAFA",
    textAlign: "center",
    fontSize: 24,
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: "#CCCBCB",
    color: Colors.light.baseblack,
  },
  numPadContainer: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    width: "100%",
    alignItems: "center",
    paddingTop: 6.33,
  },
  numPadRow: {
    flexDirection: "row",
    gap: 6.33,
    marginBottom: 6.33,
  },
  numPadButton: {
    width: 116,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4.6,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  numPadText: {
    fontSize: 24,
    color: "#000",
  },
  backSpace: {
    width: 116,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
