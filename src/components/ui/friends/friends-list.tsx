import { Text, View } from "react-native";

import { FriendItem, type FriendData } from "@/components/ui/friends/friend-item";

type FriendsListProps = {
  friends: FriendData[];
  emptyMessage?: string;
};

export function FriendsList({
  friends,
  emptyMessage = "No friends match your search.",
}: FriendsListProps) {
  if (friends.length === 0) {
    return (
      <View className="rounded-3xl bg-white px-4 py-8">
        <Text className="text-center text-sm text-tally-textSecondary">
          {emptyMessage}
        </Text>
      </View>
    );
  }

  return (
    <View className="overflow-hidden rounded-3xl bg-white">
      {friends.map((friend, index) => (
        <FriendItem
          key={friend.id}
          friend={friend}
          isLast={index === friends.length - 1}
        />
      ))}
    </View>
  );
}
