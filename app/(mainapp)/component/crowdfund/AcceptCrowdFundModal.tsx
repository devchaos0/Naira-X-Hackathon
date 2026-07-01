import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const palette = {
  ink: "#171233",
  indigo: "#2E2470",
  bg: "#FFFFFF",
  mist: "#F1EEFB",
  hairline: "#E9E6F2",
  muted: "#8C87A3",
} as const;

const FONT_DISPLAY = "Fraunces_600SemiBold";
const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";

interface AcceptCrowdFundModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  code: string;
  setCode: (code: string) => void;
}

const AcceptCrowdFundModal: React.FC<AcceptCrowdFundModalProps> = ({
  visible,
  onClose,
  onSubmit,
  code,
  setCode,
}) => {
  const insets = useSafeAreaInsets();
  const canSubmit = code.trim().length > 0;

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.avoider}
        >
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
            <View style={styles.topBar}>
              <View style={styles.drag} />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={18} color={palette.ink} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.headline}>Join a squad</Text>
              <Text style={styles.subhead}>
                Enter the invite code someone shared with you.
              </Text>

              <View style={styles.codeField}>
                <Ionicons name="key-outline" size={18} color={palette.muted} />
                <TextInput
                  style={styles.codeInput}
                  placeholder="ENTER CODE"
                  placeholderTextColor={palette.muted}
                  value={code}
                  onChangeText={(text) => setCode(text.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={10}
                />
              </View>

              <TouchableOpacity
                style={[styles.cta, !canSubmit && styles.ctaDisabled]}
                onPress={onSubmit}
                disabled={!canSubmit}
                activeOpacity={0.9}
              >
                <Text style={styles.ctaText}>Join squad</Text>
                <Ionicons name="arrow-forward" size={18} color={palette.bg} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(23, 18, 51, 0.55)",
  },
  avoider: { justifyContent: "flex-end" },

  sheet: {
    backgroundColor: palette.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 12,
    marginBottom: 8,
  },
  drag: {
    position: "absolute",
    left: "50%",
    marginLeft: -22,
    top: 10,
    width: 44,
    height: 5,
    borderRadius: 10,
    backgroundColor: palette.hairline,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.mist,
  },

  content: { marginTop: 12, paddingBottom: 4 },

  headline: {
    fontFamily: FONT_DISPLAY,
    fontSize: 24,
    color: palette.ink,
    marginBottom: 6,
  },
  subhead: {
    fontSize: 14,
    color: palette.muted,
    lineHeight: 20,
    marginBottom: 24,
  },

  codeField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: palette.mist,
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 60,
  },
  codeInput: {
    flex: 1,
    fontFamily: FONT_NUMERIC,
    fontSize: 20,
    letterSpacing: 4,
    color: palette.ink,
  },

  cta: {
    marginTop: 22,
    height: 56,
    borderRadius: 16,
    backgroundColor: palette.indigo,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: palette.bg, fontSize: 16, fontWeight: "700" },
});

export default AcceptCrowdFundModal;