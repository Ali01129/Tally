import { Text, View } from "react-native";

import { ActivityTransactionRow } from "./activity-transaction-row";
import type { ActivityItem } from "./types";
import { groupActivityByDate } from "./utils";

type ActivityListProps = {
  items: ActivityItem[];
};

export function ActivityList({ items }: ActivityListProps) {
  const sections = groupActivityByDate(items);

  if (sections.length === 0) {
    return (
      <View className="rounded-2xl bg-white px-4 py-8">
        <Text className="text-center text-sm text-tally-textSecondary">
          No activity yet
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-4">
      {sections.map((section) => (
        <View key={section.dateKey} className="gap-2">
          <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
            {section.label}
          </Text>

          <View className="overflow-hidden rounded-2xl bg-white">
            {section.items.map((item, index) => {
              const isLast = index === section.items.length - 1;

              return (
                <ActivityTransactionRow
                  key={item.id}
                  item={item}
                  isLast={isLast}
                />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
