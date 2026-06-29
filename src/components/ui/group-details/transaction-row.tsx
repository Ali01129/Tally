import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import type { GroupTransaction } from "./types";

type TransactionRowProps = {
  transaction: GroupTransaction;
  paidByName: string;
  isLast: boolean;
};

function formatAmount(amount: number): string {
  return `$${Math.abs(amount).toFixed(2)}`;
}

function formatYourShare(amount: number): string {
  const prefix = amount >= 0 ? "+" : "-";
  return `${prefix}${formatAmount(amount)}`;
}

export function TransactionRow({
  transaction,
  paidByName,
  isLast,
}: TransactionRowProps) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-tally-background">
        <MaterialIcons name="payments" size={20} color="#808080" />
      </View>

      <View className="min-w-0 flex-1">
        <Text className="text-base font-bold text-tally-text" numberOfLines={1}>
          {transaction.name}
        </Text>
        <Text className="text-sm text-tally-textSecondary">
          {paidByName} paid · split {transaction.splitCount} ways
        </Text>
      </View>

      <View className="items-end">
        <Text className="text-base font-bold text-tally-text">
          {formatAmount(transaction.totalAmount)}
        </Text>
        <Text className="text-sm font-semibold text-tally-green">
          {formatYourShare(transaction.yourShare)}
        </Text>
      </View>
    </View>
  );
}
