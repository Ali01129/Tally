import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { FriendsSearchBar } from "@/components/ui/friends/friends-search-bar";
import type { FriendData } from "@/components/ui/friends/friend-item";

type AddMembersModalProps = {
  isPresented: boolean;
  onDismiss: () => void;
  friends: FriendData[];
  onAddMembers: (friends: FriendData[]) => void;
};

export function AddMembersModal({
  isPresented,
  onDismiss,
  friends,
  onAddMembers,
}: AddMembersModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredFriends = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return friends;

    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(query),
    );
  }, [friends, searchQuery]);

  const handleDismiss = () => {
    setSearchQuery("");
    setSelectedIds(new Set());
    onDismiss();
  };

  const toggleFriend = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAdd = () => {
    const selected = friends.filter((friend) => selectedIds.has(friend.id));
    if (selected.length === 0) return;

    onAddMembers(selected);
    handleDismiss();
  };

  const selectedCount = selectedIds.size;

  return (
    <Modal
      visible={isPresented}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <Pressable
          onPress={handleDismiss}
          className="absolute inset-0 bg-tally-text/35"
        />

        <View className="max-h-[85%] overflow-hidden rounded-t-[28px] bg-tally-background px-5 pb-8 pt-4">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-12 rounded-full bg-tally-groupCircles" />
          </View>

          <Text className="mb-4 text-xl font-semibold text-tally-text">
            Add members
          </Text>

          <FriendsSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search friends"
            showScanner={false}
          />

          <View className="mt-4 overflow-hidden rounded-2xl bg-white">
            {filteredFriends.length === 0 ? (
              <View className="px-4 py-8">
                <Text className="text-center text-sm text-tally-textSecondary">
                  {friends.length === 0
                    ? "All your friends are already in this group."
                    : "No friends match your search."}
                </Text>
              </View>
            ) : (
              filteredFriends.map((friend, index) => {
                const isSelected = selectedIds.has(friend.id);
                const isLast = index === filteredFriends.length - 1;

                return (
                  <Pressable
                    key={friend.id}
                    onPress={() => toggleFriend(friend.id)}
                    className={`flex-row items-center gap-3 px-4 py-3.5 active:opacity-90 ${
                      !isLast ? "border-b border-black/5" : ""
                    }`}
                  >
                    <Avatar
                      initial={friend.initial}
                      backgroundColor={friend.avatarColor}
                      size={40}
                    />

                    <View className="min-w-0 flex-1">
                      <Text className="text-base font-semibold text-tally-text">
                        {friend.name}
                      </Text>
                      <Text
                        className="text-sm text-tally-textSecondary"
                        numberOfLines={1}
                      >
                        {friend.context}
                      </Text>
                    </View>

                    <View
                      className={`h-7 w-7 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? "border-tally-primary bg-tally-primary"
                          : "border-tally-textSecondary bg-transparent"
                      }`}
                    >
                      {isSelected ? (
                        <Feather name="check" size={14} color="#FFFFFF" />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>

          <Pressable
            onPress={handleAdd}
            disabled={selectedCount === 0}
            className={`mt-4 items-center rounded-2xl bg-tally-primary py-4 active:opacity-90 ${
              selectedCount === 0 ? "opacity-40" : ""
            }`}
          >
            <Text className="text-base font-semibold text-white">
              {selectedCount === 0
                ? "Add members"
                : `Add ${selectedCount} member${selectedCount === 1 ? "" : "s"}`}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
