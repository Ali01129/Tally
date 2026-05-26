import "@/global.css";
import { Stack } from "expo-router";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="create-group" />
        <Stack.Screen name="add-expense" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
