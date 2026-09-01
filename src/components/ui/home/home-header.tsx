import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";

type HomeHeaderProps = {
  userInitial?: string;
};

export function HomeHeader({ userInitial = "M" }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Pressable onPress={() => router.navigate("/you")} accessibilityRole="button">
        <Avatar initial={userInitial} />
      </Pressable>
      <View className="flex-row gap-3">
        <IconButton
          icon={<Feather name="bell" size={20} color="#000000" />}
          showBadge
          onPress={() => router.navigate("/activity")}
        />
      </View>
    </View>
  );
}
