import { Text, View } from "react-native";

import { AddFriendsUserCard } from "@/components/ui/friends/add-friends-user-card";
import type { FriendData } from "@/components/ui/friends/friend-item";

type AddFriendsUserGridProps = {
  users: FriendData[];
  emptyMessage?: string;
  onAddFriend?: (user: FriendData) => void;
};

export function AddFriendsUserGrid({
  users,
  emptyMessage = "No people match your search.",
  onAddFriend,
}: AddFriendsUserGridProps) {
  if (users.length === 0) {
    return (
      <View className="rounded-3xl bg-white px-4 py-8">
        <Text className="text-center text-sm text-tally-textSecondary">
          {emptyMessage}
        </Text>
      </View>
    );
  }

  const rows: FriendData[][] = [];
  for (let i = 0; i < users.length; i += 2) {
    rows.push(users.slice(i, i + 2));
  }

  return (
    <View className="gap-3">
      {rows.map((row) => (
        <View key={row[0].id} className="flex-row gap-3">
          {row.map((user) => (
            <AddFriendsUserCard
              key={user.id}
              user={user}
              onAddFriend={onAddFriend}
            />
          ))}
          {row.length === 1 ? <View className="flex-1" /> : null}
        </View>
      ))}
    </View>
  );
}
