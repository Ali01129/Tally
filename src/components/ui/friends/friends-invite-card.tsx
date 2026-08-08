import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type FriendsInviteCardProps = {
  onShare?: () => void;
};

export function FriendsInviteCard({ onShare }: FriendsInviteCardProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl bg-[#E8F4FC] p-4">
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-white">
        <Feather name="share" size={20} color="#000000" />
      </View>

      <View className="min-w-0 flex-1">
        <Text className="text-base font-bold text-tally-text">
          Invite friends to Tally
        </Text>
        <Text className="mt-0.5 text-sm text-tally-textSecondary">
          Split faster when everyone&apos;s in the app.
        </Text>
      </View>

      <Pressable
        onPress={onShare}
        className="rounded-full bg-tally-text px-4 py-2 active:opacity-90"
      >
        <Text className="text-sm font-semibold text-white">Share</Text>
      </Pressable>
    </View>
  );
}
