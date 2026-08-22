import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";

export function ActivityHeader() {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-3xl font-bold text-tally-text">Activity</Text>
      <IconButton
        icon={<Feather name="search" size={20} color="#000000" />}
      />
    </View>
  );
}
