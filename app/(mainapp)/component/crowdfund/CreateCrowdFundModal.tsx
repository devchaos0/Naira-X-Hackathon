

import { CreateCrowdFundForm } from "@/api/type";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const palette = {
  ink: "#171233",       
  indigo: "#2E2470",   
  violet: "#6D5FE0",    
  gold: "#E4A93B",      
  bg: "#FFFFFF",
  mist: "#F1EEFB",      
  hairline: "#E9E6F2",
  muted: "#8C87A3",
} as const;

const FONT_DISPLAY = "Fraunces_600SemiBold";
const FONT_NUMERIC = "SpaceGrotesk_600SemiBold";


interface CreateCrowdFundModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: CreateCrowdFundForm;
  setForm: (form: CreateCrowdFundForm) => void;
}

type Visibility = "public" | "private";


const DURATIONS = ["30 days", "60 days", "90 days", "180 days"];


const GOAL_REFERENCE = 500_000;

const onlyDigits = (text: string): string => text.replace(/[^0-9]/g, "");

const formatNaira = (digits: string): string => {
  if (!digits) return "";
  return "₦" + Number(digits).toLocaleString("en-NG", { maximumFractionDigits: 0 });
};


const DIAL_SIZE = 176;
const DIAL_STROKE = 10;
const DIAL_RADIUS = (DIAL_SIZE - DIAL_STROKE) / 2;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;

function PotDial({ amountDigits }: { amountDigits: string }) {
  const amount = amountDigits ? Number(amountDigits) : 0;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const targetPct = Math.min(amount / GOAL_REFERENCE, 1);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: targetPct,
      duration: 450,
      useNativeDriver: false, 
    }).start();
  }, [targetPct, progressAnim]);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [DIAL_CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.dialWrap}>
      <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
        <Circle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={DIAL_RADIUS}
          stroke={palette.mist}
          strokeWidth={DIAL_STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={DIAL_SIZE / 2}
          cy={DIAL_SIZE / 2}
          r={DIAL_RADIUS}
          stroke={palette.gold}
          strokeWidth={DIAL_STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${DIAL_CIRCUMFERENCE}, ${DIAL_CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          originX={DIAL_SIZE / 2}
          originY={DIAL_SIZE / 2}
        />
      </Svg>
      <View style={styles.dialCenter} pointerEvents="none">
        <Text style={styles.dialEyebrow}>THE GOAL</Text>
        <Text
          style={styles.dialAmount}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {amount > 0 ? formatNaira(amountDigits) : "₦0"}
        </Text>
      </View>
    </View>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

interface TextFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

function TextField({ placeholder, value, onChangeText, multiline }: TextFieldProps) {
  return (
    <TextInput
      style={[styles.field, multiline && styles.fieldMultiline]}
      placeholder={placeholder}
      placeholderTextColor={palette.muted}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
    />
  );
}


const CreateCrowdFundModal: React.FC<CreateCrowdFundModalProps> = ({
  visible,
  onClose,
  onSubmit,
  form,
  setForm,
}) => {
  const insets = useSafeAreaInsets();
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [useCustomDuration, setUseCustomDuration] = useState(false);

  const handleSelectPresetDuration = (d: string) => {
    setUseCustomDuration(false);
    setForm({ ...form, duration: d });
  };

  const handleSelectCustomDuration = () => {
    setUseCustomDuration(true);
    setForm({ ...form, duration: "" });
  };

  const handleAmountChange = (text: string) => {
    setForm({ ...form, amount: onlyDigits(text) });
  };

  const canSubmit = form.name.trim().length > 0 && form.amount.trim().length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.screen}>
        <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={20} color={palette.ink} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
          >
         
            <View style={styles.hero}>
              <PotDial amountDigits={form.amount} />
              <Text style={styles.headline}>Start a squad</Text>
              <Text style={styles.subhead}>Save toward one goal, together.</Text>
            </View>

          
            <View style={styles.section}>
              <FieldLabel>THE POT</FieldLabel>
              <TextField
                placeholder="What are you calling it? e.g. Lagos rent squad"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
              <View style={styles.fieldGap} />
              <TextField
                placeholder="What's the plan? A line or two on what this is for."
                value={form.details}
                onChangeText={(text) => setForm({ ...form, details: text })}
                multiline
              />
            </View>

           
            <View style={styles.section}>
              <FieldLabel>THE CLOCK</FieldLabel>
              <View style={styles.chipRow}>
                {DURATIONS.map((d) => {
                  const active = !useCustomDuration && form.duration === d;
                  return (
                    <TouchableOpacity
                      key={d}
                      onPress={() => handleSelectPresetDuration(d)}
                      style={[styles.chip, active && styles.chipActive]}
                    >
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>
                        {d.replace(" days", "d")}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={handleSelectCustomDuration}
                  style={[styles.chip, useCustomDuration && styles.chipActive]}
                >
                  <Text style={[styles.chipText, useCustomDuration && styles.chipTextActive]}>
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
              {useCustomDuration && (
                <>
                  <View style={styles.fieldGap} />
                  <TextField
                    placeholder="e.g. 45 days"
                    value={form.duration}
                    onChangeText={(text) => setForm({ ...form, duration: text })}
                  />
                </>
              )}
            </View>

           
            <View style={styles.section}>
              <FieldLabel>THE GOAL</FieldLabel>
              <View style={styles.amountField}>
                <Text style={styles.amountPrefix}>₦</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor={palette.muted}
                  keyboardType="numeric"
                  value={form.amount ? Number(form.amount).toLocaleString("en-NG") : ""}
                  onChangeText={handleAmountChange}
                />
              </View>
            </View>

            <View style={styles.section}>
              <FieldLabel>WHO'S IN</FieldLabel>
              <View style={styles.segment}>
                <TouchableOpacity
                  onPress={() => setVisibility("public")}
                  style={[styles.segmentOption, visibility === "public" && styles.segmentActive]}
                >
                  <Ionicons
                    name="globe-outline"
                    size={16}
                    color={visibility === "public" ? palette.bg : palette.indigo}
                  />
                  <View>
                    <Text
                      style={[
                        styles.segmentTitle,
                        visibility === "public" && styles.segmentTitleActive,
                      ]}
                    >
                      Anyone with the link
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setVisibility("private")}
                  style={[styles.segmentOption, visibility === "private" && styles.segmentActive]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={16}
                    color={visibility === "private" ? palette.bg : palette.indigo}
                  />
                  <Text
                    style={[
                      styles.segmentTitle,
                      visibility === "private" && styles.segmentTitleActive,
                    ]}
                  >
                    Invite only
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Sticky CTA */}
          <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={!canSubmit}
              style={[styles.cta, !canSubmit && styles.ctaDisabled]}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaText}>Start squad</Text>
              <Ionicons name="arrow-forward" size={18} color={palette.bg} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.bg },
  flex: { flex: 1 },

  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.mist,
  },

  body: { paddingHorizontal: 24, paddingBottom: 32 },

  // Hero
  hero: { alignItems: "center", marginBottom: 28 },
  dialWrap: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dialCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  dialEyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: palette.muted,
    marginBottom: 4,
  },
  dialAmount: {
    fontFamily: FONT_NUMERIC,
    fontSize: 24,
    color: palette.ink,
    maxWidth: DIAL_SIZE - 40,
  },
  headline: {
    fontFamily: FONT_DISPLAY,
    fontSize: 28,
    color: palette.ink,
    marginBottom: 6,
  },
  subhead: {
    fontSize: 14,
    color: palette.muted,
  },

  // Sections
  section: {
    marginBottom: 26,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: palette.violet,
    marginBottom: 10,
  },
  fieldGap: { height: 10 },

  field: {
    backgroundColor: palette.mist,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: palette.ink,
  },
  fieldMultiline: {
    height: 84,
  },

  // Duration chips
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: palette.mist,
  },
  chipActive: { backgroundColor: palette.indigo },
  chipText: { fontSize: 13, fontWeight: "600", color: palette.indigo },
  chipTextActive: { color: palette.bg },

  // Amount field
  amountField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.mist,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  amountPrefix: {
    fontFamily: FONT_NUMERIC,
    fontSize: 18,
    color: palette.gold,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontFamily: FONT_NUMERIC,
    fontSize: 18,
    color: palette.ink,
    paddingVertical: 14,
  },

  // Visibility segment
  segment: { gap: 10 },
  segmentOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: palette.mist,
    borderWidth: 1,
    borderColor: "transparent",
  },
  segmentActive: {
    backgroundColor: palette.indigo,
    borderColor: palette.indigo,
  },
  segmentTitle: { fontSize: 14, fontWeight: "600", color: palette.ink },
  segmentTitleActive: { color: palette.bg },

  // Footer CTA
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: palette.hairline,
    backgroundColor: palette.bg,
  },
  cta: {
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

export default CreateCrowdFundModal;