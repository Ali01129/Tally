import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

import { FriendsSearchBar } from "@/components/ui/friends/friends-search-bar";
import { IconButton } from "@/components/ui/icon-button";

type ActivityHeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (text: string) => void;
};

export function ActivityHeader({
  searchQuery,
  onSearchQueryChange,
}: ActivityHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((open) => {
      if (open) {
        onSearchQueryChange("");
      }
      return !open;
    });
  };

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-tally-text">Activity</Text>
        <IconButton
          icon={
            <Feather
              name={isSearchOpen ? "x" : "search"}
              size={20}
              color="#000000"
            />
          }
          onPress={toggleSearch}
        />
      </View>

      {isSearchOpen ? (
        <Animated.View
          entering={FadeInDown.duration(220)}
          exiting={FadeOutUp.duration(180)}
        >
          <FriendsSearchBar
            value={searchQuery}
            onChangeText={onSearchQueryChange}
            placeholder="Search activities"
            showScanner={false}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}
