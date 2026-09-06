import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import type { FriendData } from "@/components/ui/friends/friend-item";

type AddFriendsUserCardProps = {
  user: FriendData;
  onAddFriend?: (user: FriendData) => void;
};

export function AddFriendsUserCard({
  user,
  onAddFriend,
}: AddFriendsUserCardProps) {
  const [requestSent, setRequestSent] = useState(false);

  const handleAddFriend = () => {
    if (requestSent) return;
    setRequestSent(true);
    onAddFriend?.(user);
  };

  return (
    <View className="flex-1 items-center rounded-3xl bg-white px-3 py-4">
      <Avatar
        initial={user.initial}
        backgroundColor={user.avatarColor}
        size={80}
      />

      <Text
        className="mt-3 text-center text-md font-bold text-tally-text"
        numberOfLines={1}
      >
        {user.name}
      </Text>

      <Text
        className="mt-0.5 text-center text-md text-tally-textSecondary"
        numberOfLines={1}
      >
        {user.email ?? ""}
      </Text>

      <Pressable
        onPress={handleAddFriend}
        disabled={requestSent}
        className={`mt-3 rounded-full px-4 py-2 ${
          requestSent
            ? "bg-tally-background"
            : "bg-tally-primary active:opacity-90"
        }`}
      >
        <Text
          className={`text-md font-semibold ${
            requestSent ? "text-tally-textSecondary" : "text-white"
          }`}
        >
          {requestSent ? "Request sent" : "Add friend"}
        </Text>
      </Pressable>
    </View>
  );
}
