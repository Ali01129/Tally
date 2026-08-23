import { DefaultTheme, ThemeProvider } from "expo-router";

import AppTabs from "@/components/app-tabs";
import { Colors } from "@/constants/theme";

const tallyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tally.primary,
    background: Colors.tally.background,
    card: Colors.tally.background,
    text: Colors.tally.text,
    border: Colors.tally.groupCircles,
  },
};

export default function TabLayout() {
  return (
    <ThemeProvider value={tallyTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
