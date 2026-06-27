import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { GroupBalanceSummary } from "@/components/ui/group-details/group-balance-summary";
import { GroupDetailsHeader } from "@/components/ui/group-details/group-details-header";
import type { GroupDetailsData } from "@/components/ui/group-details/types";
import { TypeSelector } from "@/components/ui/type-selector";
import { useState } from "react";

const GROUP_DETAILS: Record<string, GroupDetailsData> = {
  "1": {
    id: "1",
    name: "Italy trip",
    type: "trip",
    timeline: "MAY 22 — 28",
    members: [
      { id: "maya", name: "Maya", initial: "M", avatarColor: "#D4C5F0" },
      { id: "jordan", name: "Jordan", initial: "J", avatarColor: "#C5D8F0" },
      { id: "priya", name: "Priya", initial: "P", avatarColor: "#F0C5D8" },
      { id: "theo", name: "Theo", initial: "T", avatarColor: "#F0E8C5" },
    ],
    balanceStatus: "owed",
    totalAmount: 248.5,
    memberBalances: [
      { memberId: "jordan", amount: 112.2, direction: "owes_you" },
      { memberId: "priya", amount: 86.3, direction: "owes_you" },
      { memberId: "theo", amount: 50.0, direction: "owes_you" },
    ],
  },
  "2": {
    id: "2",
    name: "Roommates",
    type: "home",
    members: [
      { id: "ava", name: "Ava", initial: "A", avatarColor: "#E8D4F0" },
      { id: "sam", name: "Sam", initial: "S", avatarColor: "#D4E8F0" },
      { id: "maya", name: "Maya", initial: "M", avatarColor: "#D4C5F0" },
    ],
    balanceStatus: "owe",
    totalAmount: 32.4,
    memberBalances: [
      { memberId: "ava", amount: 18.2, direction: "you_owe" },
      { memberId: "sam", amount: 14.2, direction: "you_owe" },
    ],
  },
  "3": {
    id: "3",
    name: "Weekend crew",
    type: "other",
    members: [
      { id: "kate", name: "Kate", initial: "K", avatarColor: "#F0E8D4" },
      { id: "leo", name: "Leo", initial: "L", avatarColor: "#E8F0D4" },
      { id: "riley", name: "Riley", initial: "R", avatarColor: "#F0D4E8" },
      { id: "tess", name: "Tess", initial: "T", avatarColor: "#D4F0E8" },
    ],
    balanceStatus: "owed",
    totalAmount: 0,
    memberBalances: [],
  },
  "4": {
    id: "4",
    name: "Office lunch",
    type: "other",
    members: [
      { id: "dan", name: "Dan", initial: "D", avatarColor: "#E8D4F0" },
      { id: "emma", name: "Emma", initial: "E", avatarColor: "#D4E8F0" },
      { id: "finn", name: "Finn", initial: "F", avatarColor: "#F0E8D4" },
      { id: "maya", name: "Maya", initial: "M", avatarColor: "#D4C5F0" },
    ],
    balanceStatus: "owe",
    totalAmount: 18.75,
    memberBalances: [
      { memberId: "dan", amount: 6.25, direction: "you_owe" },
      { memberId: "emma", amount: 6.25, direction: "you_owe" },
      { memberId: "finn", amount: 6.25, direction: "you_owe" },
    ],
  },
};

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
      </View>
    </ScrollView>
  );
}
