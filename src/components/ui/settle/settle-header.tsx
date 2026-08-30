import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type SettleHeaderProps = {
  onCancel?: () => void;
};

export function SettleHeader({ onCancel }: SettleHeaderProps) {
  return (
    <View className="flex-row items-center">
      <Pressable onPress={onCancel ?? (() => router.back())} className="w-20">
        <Text className="text-sm font-semibold text-tally-textSecondary">
          Cancel
        </Text>
      </Pressable>

      <View className="flex-1 items-center">
        <Text className="text-base font-bold text-tally-text">Settle up</Text>
      </View>

      <View className="w-20" />
    </View>
  );
}
