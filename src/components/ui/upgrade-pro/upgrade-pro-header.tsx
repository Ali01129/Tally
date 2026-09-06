import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";

export function UpgradeProHeader() {
  return (
    <View className="flex-row items-center">
      <IconButton
        icon={<Feather name="arrow-left" size={20} color="#000000" />}
        onPress={() => router.back()}
      />
      <View className="flex-1 items-center pr-11">
        <Text className="text-base font-bold text-tally-text">Tally Pro</Text>
      </View>
    </View>
  );
}
