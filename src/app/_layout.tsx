import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="create-group" />
        <Stack.Screen name="add-expense" />
        <Stack.Screen name="group-details/[id]" />
        <Stack.Screen name="settle-up/[id]" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
