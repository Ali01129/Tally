import { Text, View } from "react-native";

type FriendsSummaryCardsProps = {
  owedAmount: string;
  owedPeopleCount: number;
  oweAmount: string;
  owePeopleCount: number;
};

export function FriendsSummaryCards({
  owedAmount,
  owedPeopleCount,
  oweAmount,
  owePeopleCount,
}: FriendsSummaryCardsProps) {
  return (
    <View className="flex-row gap-3">
      <View className="flex-1 rounded-3xl bg-tally-primaryLight p-4">
        <Text className="text-xs font-semibold tracking-wider text-tally-primary">
          YOU&apos;RE OWED
        </Text>
        <Text className="mt-2 text-3xl font-bold text-tally-text">
          {owedAmount}
        </Text>
        <Text className="mt-1 text-sm text-tally-primary">
          {owedPeopleCount} {owedPeopleCount === 1 ? "person" : "people"}
        </Text>
      </View>

      <View className="flex-1 rounded-3xl bg-[#FFF5E0] p-4">
        <Text className="text-xs font-semibold tracking-wider text-[#8B6914]">
          YOU OWE
        </Text>
        <Text className="mt-2 text-3xl font-bold text-tally-text">
          {oweAmount}
        </Text>
        <Text className="mt-1 text-sm text-[#8B6914]">
          {owePeopleCount} {owePeopleCount === 1 ? "person" : "people"}
        </Text>
      </View>
    </View>
  );
}
