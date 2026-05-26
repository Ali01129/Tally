import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type CreateGroupHeaderProps = {
  title?: string;
  onCancel?: () => void;
  onCreate?: () => void;
  createDisabled?: boolean;
  actionLabel?: string;
};

export function CreateGroupHeader({
  title = "New group",
  onCancel,
  onCreate,
  createDisabled = false,
  actionLabel = "Create",
}: CreateGroupHeaderProps) {
  return (
    <View className="flex-row items-center">
      <Pressable onPress={onCancel ?? (() => router.back())} className="w-20">
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
        <View className={"rounded-full bg-tally-primary px-3 py-1.5"}>
          <Text className="text-sm font-semibold text-white">
            {actionLabel}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
