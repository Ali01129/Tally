import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddFriendsHeader } from "@/components/ui/friends/add-friends-header";
import { AddFriendsUserGrid } from "@/components/ui/friends/add-friends-user-grid";
import { FriendsSearchBar } from "@/components/ui/friends/friends-search-bar";
import { FRIENDS_LIST } from "@/data/app-data";

export default function AddFriendsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return FRIENDS_LIST;
    }

    return FRIENDS_LIST.filter(
      (friend) =>
        friend.name.toLowerCase().includes(normalizedQuery) ||
        friend.email?.toLowerCase().includes(normalizedQuery) ||
        friend.context.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2 pb-6">
          <AddFriendsHeader />

          <FriendsSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search people or @handles"
          />

          <AddFriendsUserGrid
            users={filteredUsers}
            emptyMessage="No people match your search."
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
