import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type CreateGroupHeaderProps = {
  title?: string;
  onCancel?: () => void;
  onCreate?: () => void;
  createDisabled?: boolean;
};

export function CreateGroupHeader({
  title = "New group",
  onCancel,
  onCreate,
  createDisabled = false,
}: CreateGroupHeaderProps) {
  return (
    <View className="flex-row items-center">
      <Pressable
        onPress={onCancel ?? (() => router.back())}
        className="w-20"
      >
        <Text className="text-sm font-semibold text-tally-textSecondary">
          Cancel
        </Text>
      </Pressable>

      <View className="flex-1 items-center">
        <Text className="text-base font-bold text-tally-text">{title}</Text>
      </View>

      <Pressable
        onPress={onCreate}
        disabled={createDisabled}
        className={`w-20 items-end ${createDisabled ? "opacity-40" : ""}`}
      >
        <Text className="text-sm font-semibold text-[#3273AE]">Create</Text>
      </Pressable>
    </View>
  );
}

