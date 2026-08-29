import { Text, View } from "react-native";

type BalanceCardProps = {
  netBalance: string;
  balanceLabel?: string;
  owedAmount: string;
  oweAmount: string;
};

export function BalanceCard({
  netBalance,
  balanceLabel = "in your favor",
  owedAmount,
  oweAmount,
}: BalanceCardProps) {
  return (
    <View className="relative overflow-hidden rounded-3xl bg-tally-primary p-8">
      <View className="absolute -right-8 -top-12 h-48 w-48 rounded-full bg-white/10" />
      <View className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/20 bg-transparent" />

      <Text className="text-xs font-medium tracking-wider text-tally-textOnPrimary">
        NET BALANCE
      </Text>

      <View className="mt-5 flex-row flex-wrap items-baseline gap-2">
        <Text className="text-5xl font-bold text-white">{netBalance}</Text>
        <Text className="text-sm text-tally-textOnPrimary">{balanceLabel}</Text>
      </View>

      <View className="my-5 h-px bg-tally-textOnPrimary/40" />

      <View className="flex-row">
        <View className="flex-1 pr-4">
          <Text className="text-sm text-tally-textOnPrimary">
            You&apos;re owed
          </Text>
          <Text className="mt-1 text-2xl font-bold text-tally-green">
            {owedAmount}
          </Text>
        </View>

        <View className="w-px bg-tally-textOnPrimary/40" />

        <View className="flex-1 pl-4">
          <Text className="text-sm text-tally-textOnPrimary">You owe</Text>
          <Text className="mt-1 text-2xl font-bold text-tally-red">
            {oweAmount}
          </Text>
        </View>
      </View>
    </View>
  );
}
