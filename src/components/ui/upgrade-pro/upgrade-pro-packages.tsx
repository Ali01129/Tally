import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";

export type ProPackageId = "annual" | "monthly" | "weekly";

export type ProPackage = {
  id: ProPackageId;
  title: string;
  price: string;
  period: string;
  detail: string;
  badge?: string;
};

export const PRO_PACKAGES: ProPackage[] = [
  {
    id: "annual",
    title: "Annual",
    price: "$49.99",
    period: "year",
    detail: "Best value · $4.17/mo",
    badge: "SAVE 48%",
  },
  {
    id: "monthly",
    title: "Monthly",
    price: "$7.99",
    period: "month",
    detail: "Billed monthly",
  },
  {
    id: "weekly",
    title: "Weekly",
    price: "$2.99",
    period: "week",
    detail: "Flexible short-term",
  },
];

type UpgradeProPackagesProps = {
  selectedId: ProPackageId;
  onSelect: (id: ProPackageId) => void;
};

export function UpgradeProPackages({
  selectedId,
  onSelect,
}: UpgradeProPackagesProps) {
  return (
    <View className="gap-3">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        SELECT A PLAN
      </Text>

      {PRO_PACKAGES.map((pkg) => {
        const selected = pkg.id === selectedId;

        return (
          <Pressable
            key={pkg.id}
            onPress={() => onSelect(pkg.id)}
            className={`overflow-hidden rounded-3xl border-2 p-4 active:opacity-90 ${
              selected
                ? "border-tally-primary bg-tally-primaryLight"
                : "border-transparent bg-white"
            }`}
          >
            <View className="flex-row items-center gap-3.5">
              <View
                className={`h-11 w-11 items-center justify-center rounded-full ${
                  selected ? "bg-tally-primary" : "bg-tally-groupBg"
                }`}
              >
                <MaterialIcons
                  name={
                    pkg.id === "annual"
                      ? "workspace-premium"
                      : pkg.id === "monthly"
                        ? "calendar-month"
                        : "date-range"
                  }
                  size={22}
                  color={selected ? "#FFFFFF" : Colors.tally.primary}
                />
              </View>

              <View className="min-w-0 flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-bold text-tally-text">
                    {pkg.title}
                  </Text>
                  {pkg.badge ? (
                    <View className="rounded-full bg-tally-primary px-2 py-0.5">
                      <Text className="text-[10px] font-bold tracking-wide text-white">
                        {pkg.badge}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text className="mt-0.5 text-sm text-tally-textSecondary">
                  {pkg.detail}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-base font-bold text-tally-text">
                  {pkg.price}
                </Text>
                <Text className="text-xs text-tally-textSecondary">
                  /{pkg.period}
                </Text>
              </View>

              <View
                className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selected
                    ? "border-tally-primary bg-tally-primary"
                    : "border-tally-groupCircles bg-white"
                }`}
              >
                {selected ? (
                  <Feather name="check" size={14} color="#FFFFFF" />
                ) : null}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
