import { Text, View } from "react-native";

import { TransactionRow } from "./transaction-row";

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
