import { Text, View } from "react-native";

import { formatAmount } from "./utils";

type SettleGroupBadgeProps = {
  name: string;
  initials: string;
  balanceStatus: "owed" | "owe";
  totalAmount: number;
};

export function SettleGroupBadge({
  name,
  initials,
  balanceStatus,
  totalAmount,
}: SettleGroupBadgeProps) {
  const statusLabel =
    balanceStatus === "owed"
      ? `you're owed ${formatAmount(totalAmount)}`
      : `you owe ${formatAmount(totalAmount)}`;

  return (
    <View className="flex-row items-center gap-2 self-center rounded-full bg-white px-2 py-1">
      <View className="relative h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-tally-groupBg">
        <View className="absolute right-1.5 top-1.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <View className="absolute bottom-1 left-1 h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <Text className="text-xs font-bold text-tally-text">{initials}</Text>
      </View>

      <Text className="pr-1 text-sm">
        <Text className="font-semibold text-tally-text">{name}</Text>
        <Text className="text-tally-textSecondary"> · {statusLabel}</Text>
      </Text>
    </View>
  );
}
