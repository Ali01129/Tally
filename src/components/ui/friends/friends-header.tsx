import { Feather } from "@expo/vector-icons";
import { type Href, router } from "expo-router";
import { Text, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";

export function FriendsHeader() {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-3xl font-bold text-tally-text">Friends</Text>
      <IconButton
        icon={<Feather name="user-plus" size={20} color="#000000" />}
        onPress={() => router.push("/add-friends" as Href)}
      />
    </View>
  );
}
