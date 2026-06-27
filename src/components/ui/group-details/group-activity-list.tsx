import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import type { GroupMember, GroupTransaction } from "./types";

type GroupActivityListProps = {
  transactions: GroupTransaction[];
  members: GroupMember[];
};

type TransactionSection = {
  dateKey: string;
  label: string;
  transactions: GroupTransaction[];
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatDateLabel(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) {
    return "TODAY";
  }

  if (isSameDay(date, yesterday)) {
    return "YESTERDAY";
  }

  const day = date.getDate();
  const month = MONTH_LABELS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

function formatAmount(amount: number): string {
  return `$${Math.abs(amount).toFixed(2)}`;
}

function formatYourShare(amount: number): string {
  const prefix = amount >= 0 ? "+" : "-";
  return `${prefix}${formatAmount(amount)}`;
}

function groupTransactionsByDate(
  transactions: GroupTransaction[],
): TransactionSection[] {
  const sections = new Map<string, GroupTransaction[]>();

  for (const transaction of transactions) {
    const existing = sections.get(transaction.date);

    if (existing) {
      existing.push(transaction);
    } else {
      sections.set(transaction.date, [transaction]);
    }
  }

  return Array.from(sections.entries())
    .sort(([leftDate], [rightDate]) => rightDate.localeCompare(leftDate))
    .map(([dateKey, dayTransactions]) => ({
      dateKey,
      label: formatDateLabel(dateKey),
      transactions: dayTransactions,
    }));
}

function TransactionRow({
  transaction,
  paidByName,
  isLast,
}: {
  transaction: GroupTransaction;
  paidByName: string;
  isLast: boolean;
}) {
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
        <Text className={`text-sm font-semibold text-tally-green`}>
          {formatYourShare(transaction.yourShare)}
        </Text>
      </View>
    </View>
  );
}

export function GroupActivityList({
  transactions,
  members,
}: GroupActivityListProps) {
  const memberMap = new Map(members.map((member) => [member.id, member]));
  const sections = groupTransactionsByDate(transactions);

  if (sections.length === 0) {
    return (
      <View className="rounded-2xl bg-white px-4 py-8">
        <Text className="text-center text-sm text-tally-textSecondary">
          No activity yet
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-4">
      {sections.map((section) => (
        <View key={section.dateKey} className="gap-2">
          <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
            {section.label}
          </Text>

          <View className="overflow-hidden rounded-2xl bg-white">
            {section.transactions.map((transaction, index) => {
              const payer = memberMap.get(transaction.paidByMemberId);
              const paidByName = payer?.name ?? "Someone";
              const isLast = index === section.transactions.length - 1;

              return (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  paidByName={paidByName}
                  isLast={isLast}
                />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
