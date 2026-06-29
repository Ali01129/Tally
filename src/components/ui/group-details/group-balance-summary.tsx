import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";

import type { GroupMember, MemberBalance } from "./types";

type GroupBalanceSummaryProps = {
  balanceStatus: "owed" | "owe";
  totalAmount: number;
  members: GroupMember[];
  memberBalances: MemberBalance[];
  onSettleUp?: () => void;
};

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function getStatusLabel(status: "owed" | "owe"): string {
  return status === "owed" ? "YOU'RE OWED" : "YOU OWE";
}

function getBalanceDirectionLabel(direction: "owes_you" | "you_owe"): string {
  return direction === "owes_you" ? "owes you" : "you owe";
}

export function GroupBalanceSummary({
  balanceStatus,
  totalAmount,
  members,
  memberBalances,
  onSettleUp,
}: GroupBalanceSummaryProps) {
  const memberMap = new Map(members.map((member) => [member.id, member]));
  const amountColor =
    balanceStatus === "owed" ? "text-tally-green" : "text-tally-red";

  return (
    <View className="rounded-3xl bg-white p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
            {getStatusLabel(balanceStatus)}
          </Text>
          <Text className={`mt-1 text-4xl font-bold ${amountColor}`}>
            {formatAmount(totalAmount)}
          </Text>
        </View>

        <Pressable
          onPress={onSettleUp}
          className="flex-row items-center gap-2 rounded-full bg-tally-primary px-4 py-2.5 active:opacity-90"
        >
          <FontAwesome5 name="handshake" size={14} color="#FFFFFF" />
          <Text className="text-sm font-semibold text-white">Settle up</Text>
        </Pressable>
      </View>

      <View className="mt-5 gap-4">
        {memberBalances.map((balance) => {
          const member = memberMap.get(balance.memberId);
          if (!member) return null;

          const rowAmountColor =
            balance.direction === "owes_you"
              ? "text-tally-green"
              : "text-tally-red";

          return (
            <View key={balance.memberId} className="flex-row items-center">
              <Avatar
                initial={member.initial}
                backgroundColor={member.avatarColor}
                size={40}
              />

              <View className="ml-3 flex-1">
                <Text className="text-base text-tally-text">
                  <Text className="font-bold">{member.name}</Text>
                  <Text className="text-tally-textSecondary">
                    {" "}
                    {getBalanceDirectionLabel(balance.direction)}
                  </Text>
                </Text>
              </View>

              <Text className={`text-lg font-bold ${rowAmountColor}`}>
                {formatAmount(balance.amount)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
