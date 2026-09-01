import "@/global.css";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Platform, StatusBar as RNStatusBar, View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { Colors } from "@/constants/theme";

export const unstable_settings = {
  initialRouteName: "login",
};

const tallyBackground = Colors.tally.background;

const tallyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tally.primary,
    background: tallyBackground,
    card: tallyBackground,
    text: Colors.tally.text,
    border: Colors.tally.groupCircles,
  },
};

function useTallyStatusBar() {
  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(tallyBackground);

    // Dark icons on the light status bar background.
    RNStatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      RNStatusBar.setBackgroundColor(tallyBackground, true);
      RNStatusBar.setTranslucent(true);
    }
  }, []);
}

export default function RootLayout() {
  useTallyStatusBar();

  return (
    <ThemeProvider value={tallyTheme}>
      <View style={{ flex: 1, backgroundColor: tallyBackground }}>
        <StatusBar style="dark" />
        <AnimatedSplashOverlay />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: tallyBackground },
            // Android screens default to "light" (white icons) — force dark for light UI.
            statusBarStyle: "dark",
            statusBarBackgroundColor: tallyBackground,
            statusBarTranslucent: true,
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="create-group" />
          <Stack.Screen name="add-expense" />
          <Stack.Screen name="group-details/[id]" />
          <Stack.Screen name="group-settings/[id]" />
          <Stack.Screen name="settle-up/[id]" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
