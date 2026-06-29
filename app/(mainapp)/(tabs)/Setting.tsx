import SettingItem from "@/app/(mainapp)/component/settings/SettingItem";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <CustomText variant="h2" bold color={Colors.light.baseblack}>
          Settings
        </CustomText>

      </View>

      <View style={styles.section}>
        <CustomText
          variant="h5"
          bold
          color={Colors.light.baseblack}
          style={styles.sectionTitle}
        >
          Account
        </CustomText>
        <SettingItem
          icon="person"
          title="Profile"
          subtitle="Update your personal information"
        />
        <SettingItem
          icon="wallet"
          title="Payment methods"
          subtitle="View saved cards and banks"
        />
        <SettingItem
          icon="receipt"
          title="Statement"
          subtitle="Download transaction history"
        />
      </View>

      <View style={styles.section}>
        <CustomText
          variant="h5"
          bold
          color={Colors.light.baseblack}
          style={styles.sectionTitle}
        >
          Security
        </CustomText>
        <SettingItem
          icon="finger-print"
          title="Biometric login"
          subtitle="Use fingerprint or face ID"
          switchValue={biometricsEnabled}
          onToggle={setBiometricsEnabled}
        />
        <SettingItem
          icon="notifications"
          title="Notifications"
          subtitle="Transaction alerts and updates"
          switchValue={notificationsEnabled}
          onToggle={setNotificationsEnabled}
        />
        <SettingItem
          icon="lock-closed"
          title="Change PIN"
          subtitle="Secure your wallet access"
        />
      </View>

      <View style={styles.section}>
        <CustomText
          variant="h5"
          bold
          color={Colors.light.baseblack}
          style={styles.sectionTitle}
        >
          Support
        </CustomText>
        <SettingItem
          icon="chatbubble-ellipses"
          title="Help center"
          subtitle="FAQs and customer support"
        />
        <SettingItem
          icon="information-circle"
          title="About"
          subtitle="App version and company info"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  subtitle: {
    marginTop: 8,
    maxWidth: "90%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 14,
  },
});

export default Setting;
