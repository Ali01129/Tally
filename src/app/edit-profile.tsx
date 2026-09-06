import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EditProfileAccount } from "@/components/ui/edit-profile/edit-profile-account";
import { EditProfileAvatar } from "@/components/ui/edit-profile/edit-profile-avatar";
import { EditProfileForm } from "@/components/ui/edit-profile/edit-profile-form";
import { EditProfileHeader } from "@/components/ui/edit-profile/edit-profile-header";
import { APP_USER } from "@/data/app-data";

const ACCOUNT_ROWS = [
  {
    id: "currency",
    label: "Default currency",
    value: "USD",
    icon: "dollar-sign" as const,
  },
  {
    id: "password",
    label: "Change password",
    icon: "lock" as const,
  },
  {
    id: "delete",
    label: "Request to delete account",
    icon: "trash-2" as const,
    destructive: true,
  },
];

function getInitial(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

export default function EditProfileScreen() {
  const [name, setName] = useState(APP_USER.name);
  const [displayName, setDisplayName] = useState(APP_USER.displayName);
  const [avatarColor, setAvatarColor] = useState(APP_USER.avatarColor);

  const initial = useMemo(() => getInitial(name), [name]);
  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    // Hook up to real save logic later.
    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-5 pt-2 pb-8">
          <EditProfileHeader onSave={handleSave} saveDisabled={!canSave} />

          <EditProfileAvatar
            name={name}
            displayName={displayName}
            initial={initial}
            avatarColor={avatarColor}
            verified={APP_USER.verified}
            onChangeColor={setAvatarColor}
          />

          <EditProfileForm
            name={name}
            displayName={displayName}
            email={APP_USER.email}
            onChangeName={setName}
            onChangeDisplayName={setDisplayName}
          />

          <EditProfileAccount rows={ACCOUNT_ROWS} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
