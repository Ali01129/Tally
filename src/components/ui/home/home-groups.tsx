import { Text, View } from "react-native";

import {
  HomeGroupItem,
  type HomeGroupItemData,
} from "@/components/ui/home/home-group-item";
import { ActivityEmptyState } from "../group-details/activity-empty-state";

type HomeGroupsProps = {
  groups: HomeGroupItemData[];
};

export function HomeGroups({ groups }: HomeGroupsProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-tally-text">Your groups</Text>
      </View>

      <View className="overflow-hidden rounded-3xl bg-white">
        {groups.length === 0 ? (
          <ActivityEmptyState
            title="No groups found"
            description="Create a group to get started."
          />
        ) : (
          groups.map((group, index) => (
            <HomeGroupItem
              key={group.id}
              group={group}
              isLast={index === groups.length - 1}
            />
          ))
        )}
      </View>
    </View>
  );
}

export type { HomeGroupItemData };
