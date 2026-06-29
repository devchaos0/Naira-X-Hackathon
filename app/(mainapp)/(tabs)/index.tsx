import HomeHeader from "@/app/(mainapp)/component/home/HomeHeader";
import QuickActions from "@/app/(mainapp)/component/home/QuickActions";
import RecentTransactions from "@/app/(mainapp)/component/home/RecentTransactions";
import WalletCard from "@/app/(mainapp)/component/home/WalletCard";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <WalletCard />
        <QuickActions
          onTransferPress={() => router.push("/transfer/banktransfer")}
          onGroupTransferPress={() => router.push("/transfer/grouptranfer")}
        />
        <RecentTransactions />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default Home;
