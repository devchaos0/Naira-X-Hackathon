import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.light.baseblack }}
      edges={["bottom", "left", "right"]}
    >
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <View
        style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#F8F9FC" }}
      >
        <StatusBar style="dark" backgroundColor="#fff" />
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </View>
    </SafeAreaView>
  );
}
