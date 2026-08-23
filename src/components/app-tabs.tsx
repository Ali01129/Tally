import { Colors } from "@/constants/theme";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function AppTabs() {
  const { primary, primaryLight, background, textSecondary } = Colors.tally;

  return (
    <NativeTabs
      backgroundColor={background}
      indicatorColor={primaryLight}
      rippleColor={primaryLight}
      tintColor={primary}
      iconColor={{ default: textSecondary, selected: primary }}
      labelStyle={{
        default: { color: textSecondary },
        selected: { color: primary },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md={{ default: "home_filled", selected: "home" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Label>Activity</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "clock.arrow.circlepath",
            selected: "clock.arrow.circlepath",
          }}
          md={{ default: "history", selected: "history" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="friends">
        <NativeTabs.Trigger.Label>Friends</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "person.2", selected: "person.2.fill" }}
          md={{ default: "group", selected: "group" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="you">
        <NativeTabs.Trigger.Label>You</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "person", selected: "person.fill" }}
          md={{ default: "person", selected: "person" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
