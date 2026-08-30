import { Text, View } from "react-native";

import { splitAmount } from "./utils";

type SettleAmountProps = {
  amount: number;
};

export function SettleAmount({ amount }: SettleAmountProps) {
  const { dollars, cents } = splitAmount(amount);

  return (
    <View className="items-center py-1">
      <View className="flex-row items-baseline justify-center">
        <Text
          className="text-4xl font-semibold text-tally-textSecondary"
          style={{ includeFontPadding: false }}
        >
          $
        </Text>
        <Text
          className="text-6xl font-bold text-tally-text"
          style={{ includeFontPadding: false }}
        >
          {dollars}
        </Text>
        <Text
          className="text-4xl font-semibold text-tally-textSecondary"
          style={{ includeFontPadding: false }}
        >
          .{cents}
        </Text>
      </View>
    </View>
  );
}
