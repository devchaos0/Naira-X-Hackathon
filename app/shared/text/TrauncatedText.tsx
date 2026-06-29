import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import CustomText, { CustomTextProps } from "./CustomText";

interface TruncatedTextProps extends CustomTextProps {
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  maxWidth?: number | string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  numberOfLines = 1,
  ellipsizeMode = "tail",
  maxWidth = Dimensions.get("window").width, // Default to screen width
  style,
  children,
  ...props
}) => {
  return (
    <View style={[styles.container, { maxWidth }]}>
      <CustomText
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={[style, styles.text]}
        {...props}
      >
        {children}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  text: {
    flexShrink: 1
  },
});

export default TruncatedText;
