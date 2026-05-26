import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BalanceCard } from "@/components/ui/home/balance-card";
import { HomeActionButtons } from "@/components/ui/home/home-action-buttons";
import { HomeGreeting } from "@/components/ui/home/home-greeting";
import {
  HomeGroups,
  type HomeGroupItemData,
} from "@/components/ui/home/home-groups";
import { HomeHeader } from "@/components/ui/home/home-header";

const GROUPS: HomeGroupItemData[] = [
  {
    id: "1",
    name: "Italy trip",
    initials: "It",
    participants: ["N", "J", "P", "+1"],
    totalParticipants: 4,
    status: "owed",
    amount: 248.5,
  },
  {
    id: "2",
    name: "Roommates",
    initials: "Ro",
    participants: ["A", "S", "M"],
    totalParticipants: 3,
    status: "owe",
    amount: 32.4,
  },
  {
    id: "3",
    name: "Weekend crew",
    initials: "We",
    participants: ["K", "L", "R", "T"],
    totalParticipants: 4,
    status: "settled",
  },
  {
    id: "4",
    name: "Office lunch",
    initials: "Of",
    participants: ["D", "E", "F", "+3"],
    totalParticipants: 6,
    status: "owe",
    amount: 18.75,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2">
          <HomeHeader userInitial="M" />
          <HomeGreeting userName="Maya" />
          <BalanceCard
            netBalance="$284.50"
            owedAmount="$316.90"
            oweAmount="$32.40"
          />
          <HomeActionButtons />
          <HomeGroups groups={GROUPS} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
