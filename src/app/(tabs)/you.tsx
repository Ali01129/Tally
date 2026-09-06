import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { YouFooter } from "@/components/ui/you/you-footer";
import { YouHeader } from "@/components/ui/you/you-header";
import { YouMenuSection } from "@/components/ui/you/you-menu-section";
import { YouProCard } from "@/components/ui/you/you-pro-card";
import { YouProfileCard } from "@/components/ui/you/you-profile-card";
import { APP_USER, YOU_PROFILE } from "@/data/app-data";

const SUPPORT_ITEMS = [
  { id: "help", label: "Help center", icon: "help-circle" as const },
  { id: "feedback", label: "Send feedback", icon: "message-circle" as const },
  { id: "terms", label: "Terms & privacy", icon: "file-text" as const },
];

const SIGN_OUT_ITEMS = [
  {
    id: "sign-out",
    label: "Sign out",
    icon: "log-out" as const,
    destructive: true,
  },
];

export default function YouScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const notificationsItems = [
    {
      id: "notifications",
      label: "Notifications",
      icon: "bell" as const,
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2 pb-6">
          <YouHeader />
          <YouProfileCard
            name={APP_USER.name}
            email={APP_USER.email}
            initial={APP_USER.initial}
            avatarColor={APP_USER.avatarColor}
            verified={APP_USER.verified}
            groupsCount={YOU_PROFILE.groupsCount}
            friendsCount={YOU_PROFILE.friendsCount}
            netBalance={YOU_PROFILE.netBalance}
          />
          <YouProCard />
          <YouMenuSection title="Notifications" items={notificationsItems} />
          <YouMenuSection title="SUPPORT" items={SUPPORT_ITEMS} />
          <YouMenuSection
            items={SIGN_OUT_ITEMS}
            onItemPress={(itemId) => {
              if (itemId === "sign-out") {
                router.replace("/login");
              }
            }}
          />
          <YouFooter version={YOU_PROFILE.appVersion} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
