import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";

export type FriendBalanceStatus = "owes_you" | "you_owe" | "settled";

export type FriendData = {
  id: string;
  name: string;
  email?: string;
  initial: string;
  avatarColor: string;
  context: string;
  status: FriendBalanceStatus;
  amount?: number;
};

type FriendItemProps = {
  friend: FriendData;
  isLast?: boolean;
  nameOnly?: boolean;
};

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function getStatusLabel(status: FriendBalanceStatus): string {
  switch (status) {
    case "owes_you":
      return "owes you";
    case "you_owe":
      return "you owe";
    case "settled":
      return "settled";
  }
}

export function FriendItem({
  friend,
  isLast = false,
  nameOnly = false,
}: FriendItemProps) {
  const { name, initial, avatarColor, context, status, amount } = friend;

  return (
    <Pressable
      className={`flex-row items-center gap-3 px-4 py-4 active:opacity-80 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      <Avatar initial={initial} backgroundColor={avatarColor} />

      <View className="min-w-0 flex-1 gap-1">
        <Text className="text-base font-bold text-tally-text" numberOfLines={1}>
          {name}
        </Text>
        {!nameOnly ? (
          <Text className="text-xs text-tally-textSecondary" numberOfLines={1}>
            {context}
          </Text>
        ) : null}
      </View>

      {!nameOnly ? (
        <View className="items-end">
          <Text className="text-xs text-tally-textSecondary">
            {getStatusLabel(status)}
          </Text>
          {status === "settled" ? (
            <Text className="mt-0.5 text-lg font-bold text-tally-textSecondary">
              —
            </Text>
          ) : (
            <Text
              className={`mt-0.5 text-lg font-bold ${
                status === "owes_you" ? "text-tally-green" : "text-tally-red"
              }`}
            >
              {amount != null ? formatAmount(amount) : "—"}
            </Text>
          )}
        </View>
      ) : null}
    </Pressable>
  );
}
