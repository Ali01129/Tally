import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  FriendsFilterTabs,
  type FriendFilter,
} from "@/components/ui/friends/friends-filter-tabs";
import { FriendsHeader } from "@/components/ui/friends/friends-header";
import { FriendsInviteCard } from "@/components/ui/friends/friends-invite-card";
import { FriendsList } from "@/components/ui/friends/friends-list";
import { FriendsSearchBar } from "@/components/ui/friends/friends-search-bar";
import { FriendsSummaryCards } from "@/components/ui/friends/friends-summary-cards";
import { FRIENDS_LIST, FRIENDS_SUMMARY } from "@/data/app-data";

const FILTER_OPTIONS = [
  { id: "all" as const, label: `All · ${FRIENDS_LIST.length}` },
  { id: "owes_you" as const, label: "Owes you" },
  { id: "you_owe" as const, label: "You owe" },
  { id: "settled" as const, label: "Settled" },
];

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FriendFilter>("all");

  const filteredFriends = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return FRIENDS_LIST.filter((friend) => {
      const matchesFilter =
        selectedFilter === "all" || friend.status === selectedFilter;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        friend.name.toLowerCase().includes(normalizedQuery) ||
        friend.context.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2 pb-6">
          <FriendsHeader />
          <FriendsSummaryCards
            owedAmount={FRIENDS_SUMMARY.owedAmount}
            owedPeopleCount={FRIENDS_SUMMARY.owedPeopleCount}
            oweAmount={FRIENDS_SUMMARY.oweAmount}
            owePeopleCount={FRIENDS_SUMMARY.owePeopleCount}
          />
          <FriendsSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FriendsFilterTabs
            filters={FILTER_OPTIONS}
            selected={selectedFilter}
            onChange={setSelectedFilter}
          />
          <FriendsList friends={filteredFriends} />
          <FriendsInviteCard />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
