import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BalanceCard } from "@/components/ui/home/balance-card";
import { HomeActionButtons } from "@/components/ui/home/home-action-buttons";
import { HomeGreeting } from "@/components/ui/home/home-greeting";
import { HomeGroups } from "@/components/ui/home/home-groups";
import { HomeHeader } from "@/components/ui/home/home-header";
import { APP_USER, HOME_BALANCE_CARD, HOME_GROUPS } from "@/data/app-data";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="gap-4 pt-2">
          <HomeHeader userInitial={APP_USER.initial} />
          <HomeGreeting userName={APP_USER.displayName} />
          <BalanceCard
            netBalance={HOME_BALANCE_CARD.netBalance}
            owedAmount={HOME_BALANCE_CARD.owedAmount}
            oweAmount={HOME_BALANCE_CARD.oweAmount}
          />
          <HomeActionButtons
            onAddExpense={() => router.push("/add-expense")}
            onNewGroup={() => router.push("/create-group")}
          />
          <HomeGroups groups={HOME_GROUPS} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
