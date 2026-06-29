import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Modal, Pressable, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface CustomModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  halfscreen?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  children,
  onClose,
  halfscreen,
}) => {
  const [closing, setClosing] = useState(false);
  const translateYAnim = useRef(new Animated.Value(hp(100))).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkHalfScreen = halfscreen ? hp(20) : hp(10); 

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: checkHalfScreen,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: hp(100),
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setClosing(false);
        onClose();
      });
    }
  }, [visible]);

  const handleOverlayPress = () => {
    if (!closing) {
      setClosing(true);
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: hp(100),
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setClosing(false);
        onClose();
      });
    }
  };

  const animatedStyle = {
    opacity: opacityAnim,
    transform: [{ translateY: translateYAnim }],
  };

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible || closing}
      onRequestClose={handleOverlayPress}
    >
      <Pressable style={styles.modalOverlay} onPress={handleOverlayPress}>
        <Animated.View
          style={[
            styles.modalContainer,
            halfscreen && styles.half,
            animatedStyle,
          ]}
        >
          <Pressable
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Pressable onPress={handleOverlayPress} style={styles.closeButton}>
              <MaterialIcons name="cancel" size={24} color="#8C1823" />
            </Pressable>
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    padding:12
  },
  modalContent: {
    paddingTop: hp(1.5),
    width: "100%",
    height: hp(60),
    backgroundColor: "white",

    overflow: "hidden",
  },
  closeButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: wp(4),
  },
  half: {
    height: hp(60),
  },
});
