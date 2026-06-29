import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";

interface TopbarProps {
  title?: string;
  children?: React.ReactNode;
  showBackText?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Topbar = ({
  title,
  children,
  showBackText = false,
  rightIcon,
  onRightIconPress,
}: TopbarProps) => {
  const router = useRouter();

  const handleGoback = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleGoback} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="black" />
          {showBackText && (
            <CustomText style={styles.backText}>back</CustomText>
          )}
        </TouchableOpacity>
      </View>

      <CustomText medium={true} style={styles.headingText}>
        {title ?? children}
      </CustomText>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 4,
    fontSize: 15,
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    flexShrink: 1, // Prevents text from overflowing
  },
  placeholder: {
    width: 17, // Same width as the back icon for balance
  },
});

{
  /* <Topbar
  showBackText={true}
  rightIcon={<Entypo name="heart" size={20} color="red" />}
  onRightIconPress={() => console.log("Icon pressed")}
>
  My Title
</Topbar>; */
}

{
  /* <Topbar
  rightIcon={
    <View style={{ flexDirection: "row" }}>
      <Entypo name="bell" size={20} color="black" style={{ marginRight: 15 }} />
      <Entypo name="user" size={20} color="black" />
    </View>
  }
>
  My Title
</Topbar>; */
}
