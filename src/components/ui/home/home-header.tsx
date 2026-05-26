import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";

type HomeHeaderProps = {
  userInitial?: string;
};

export function HomeHeader({ userInitial = "M" }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Avatar initial={userInitial} />
      <View className="flex-row gap-3">
        <IconButton
          icon={<Feather name="search" size={20} color="#000000" />}
        />
        <IconButton
          icon={<Feather name="bell" size={20} color="#000000" />}
          showBadge
        />
      </View>
    </View>
  );
}
