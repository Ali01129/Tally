import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type EditProfileHeaderProps = {
  onSave?: () => void;
  saveDisabled?: boolean;
};

export function EditProfileHeader({
  onSave,
  saveDisabled = false,
}: EditProfileHeaderProps) {
  return (
    <View className="flex-row items-center">
      <Pressable onPress={() => router.back()} className="w-20">
        <Text className="text-sm font-semibold text-tally-textSecondary">
          Cancel
        </Text>
      </Pressable>

      <View className="flex-1 items-center">
        <Text className="text-base font-bold text-tally-text">Edit profile</Text>
      </View>

      <Pressable
        onPress={onSave}
        disabled={saveDisabled}
        className={`w-20 items-end ${saveDisabled ? "opacity-40" : ""}`}
      >
        <View className="rounded-full bg-tally-primary px-3 py-1.5">
          <Text className="text-sm font-semibold text-white">Save</Text>
        </View>
      </Pressable>
    </View>
  );
}
