import { Text, View } from "react-native";

import { useAddExpenseStore } from "@/stores/add-expense-store";

const BALANCED_GREEN = "#2E7D32";
const OVER_RED = "#DC2626";

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function roundCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function SplitAssignmentStatus() {
  const totalAmount = useAddExpenseStore((state) => state.totalAmount);
  const assignedAmount = useAddExpenseStore((state) => state.assignedAmount);

  const total = roundCents(totalAmount);
  const assigned = roundCents(assignedAmount);
  const difference = roundCents(Math.abs(assigned - total));

  let statusLabel: string;
  let statusColor: string;

  if (difference === 0) {
    statusLabel = "Balanced";
    statusColor = BALANCED_GREEN;
  } else if (assigned > total) {
    statusLabel = `${formatCurrency(difference)} over`;
    statusColor = OVER_RED;
  } else if (assigned < total) {
    statusLabel = `${formatCurrency(difference)} left`;
    statusColor = OVER_RED;
  } else {
    statusLabel = `${formatCurrency(difference)} left`;
    statusColor = "#808080";
  }

  return (
    <View className="mt-2 flex-row items-center justify-between rounded-2xl bg-white p-4">
      <Text className="text-sm text-tally-textSecondary">
        {formatCurrency(assigned)} of {formatCurrency(total)} assigned
      </Text>
      <Text className="text-sm font-semibold" style={{ color: statusColor }}>
        {statusLabel}
      </Text>
    </View>
  );
}
