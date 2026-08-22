import { Pressable, ScrollView, Text, View } from "react-native";

export type FriendFilter = "all" | "owes_you" | "you_owe" | "settled";

type FilterOption = {
  id: FriendFilter;
  label: string;
};

type FriendsFilterTabsProps = {
  filters: FilterOption[];
  selected: FriendFilter;
  onChange: (filter: FriendFilter) => void;
};

export function FriendsFilterTabs({
  filters,
  selected,
  onChange,
}: FriendsFilterTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2">
        {filters.map((filter) => {
          const isSelected = filter.id === selected;

          return (
            <Pressable
              key={filter.id}
              onPress={() => onChange(filter.id)}
              className={`rounded-full px-4 py-2 active:opacity-90 ${
                isSelected
                  ? "bg-tally-primary"
                  : "border border-black/10 bg-white"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isSelected ? "text-white" : "text-tally-textSecondary"
                }`}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
