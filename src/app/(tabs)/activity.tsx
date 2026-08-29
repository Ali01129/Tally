import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityHeader } from "@/components/ui/activity/activity-header";
import { ActivityList } from "@/components/ui/activity/activity-list";
import { ALL_ACTIVITY } from "@/data/app-data";

export default function ActivityScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivity = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return ALL_ACTIVITY;
    }

    return ALL_ACTIVITY.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery),
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
          <ActivityHeader
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <ActivityList items={filteredActivity} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
