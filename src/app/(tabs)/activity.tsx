import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityHeader } from "@/components/ui/activity/activity-header";
import { ActivityList } from "@/components/ui/activity/activity-list";
import { ALL_ACTIVITY } from "@/data/app-data";

export default function ActivityScreen() {
  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2 pb-6">
          <ActivityHeader />
          <ActivityList items={ALL_ACTIVITY} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
