import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UpgradeProFooter } from "@/components/ui/upgrade-pro/upgrade-pro-footer";
import { UpgradeProHeader } from "@/components/ui/upgrade-pro/upgrade-pro-header";
import { UpgradeProHero } from "@/components/ui/upgrade-pro/upgrade-pro-hero";
import {
  type ProPackageId,
  UpgradeProPackages,
} from "@/components/ui/upgrade-pro/upgrade-pro-packages";

export default function UpgradeProScreen() {
  const [selectedPackage, setSelectedPackage] =
    useState<ProPackageId>("annual");

  const handleContinue = () => {
    // Hook up to billing / purchase flow later.
    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="flex-grow"
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 gap-5 pt-2 pb-8">
          <UpgradeProHeader />
          <UpgradeProHero />
          <UpgradeProPackages
            selectedId={selectedPackage}
            onSelect={setSelectedPackage}
          />
          <View className="mt-auto pt-2">
            <UpgradeProFooter onContinue={handleContinue} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
