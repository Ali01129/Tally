import { type Href, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { GroupActivityList } from "@/components/ui/group-details/group-activity-list";
import { GroupBalanceSummary } from "@/components/ui/group-details/group-balance-summary";
import { GroupDetailsHeader } from "@/components/ui/group-details/group-details-header";
import { TypeSelector } from "@/components/ui/type-selector";
import { GROUP_DETAILS } from "@/data/app-data";

export default function GroupDetailsScreen() {
  const [type, setType] = useState<string>("Activity");
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = GROUP_DETAILS[id ?? ""];

  if (!group) {
    return (
      <View className="flex-1 items-center justify-center bg-tally-background">
        <Text className="text-base text-tally-textSecondary">
          Group not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <GroupDetailsHeader
        groupId={group.id}
        name={group.name}
        type={group.type}
        timeline={group.timeline}
        members={group.members}
      />

      <View className="px-6 pb-8 pt-4 gap-4">
        {group.memberBalances.length > 0 ? (
          <GroupBalanceSummary
            balanceStatus={group.balanceStatus}
            totalAmount={group.totalAmount}
            members={group.members}
            memberBalances={group.memberBalances}
            onSettleUp={() =>
              router.push(`/settle-up/${group.id}` as Href)
            }
          />
        ) : null}

        <TypeSelector
          values={[
            { label: "Activity", icon: "timeline" },
            { label: "Balance", icon: "account-balance-wallet" },
            { label: "Totals", icon: "calculate" },
            { label: "Photos", icon: "photo-library" },
          ]}
          selected={type}
          onChange={setType}
        />

        {type === "Activity" ? (
          <View className="mb-10">
            <GroupActivityList
              transactions={group.transactions}
              members={group.members}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
