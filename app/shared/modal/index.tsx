import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface HalfScreenModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  halfscreen?: boolean;
}

const HalfScreenModal: React.FC<HalfScreenModalProps> = ({
  visible,
  children,
  onClose,
  halfscreen,
}) => {
  const [closing, setClosing] = useState(false);
  const translateYAnim = useRef(new Animated.Value(hp("100%"))).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkHalfScreen = halfscreen ? hp("40%") : hp("30%");

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
          toValue: hp("100%"),
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
          toValue: hp("100%"),
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

export default HalfScreenModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
  },
  modalContent: {
    paddingTop: 13,
    width: "100%",
    height: hp("80%"),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  closeButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 16,
  },
  half: {
    height: hp("60%"),
  },
});
