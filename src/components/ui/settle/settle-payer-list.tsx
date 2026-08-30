import { Pressable, Text, View } from "react-native";

import { CheckIndicator } from "@/components/ui/add-expense/split-member/check-indicator";
import { Avatar } from "@/components/ui/avatar";

import type { SettlePayer } from "./types";
import { formatAmount } from "./utils";

type SettlePayerListProps = {
  heading: string;
  payers: SettlePayer[];
  selectedPayerId: string;
  onSelect: (id: string) => void;
};

export function SettlePayerList({
  heading,
  payers,
  selectedPayerId,
  onSelect,
}: SettlePayerListProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        {heading}
      </Text>

      <View className="overflow-hidden rounded-3xl bg-white">
        {payers.map((payer, index) => {
          const isSelected = payer.id === selectedPayerId;
          const isLast = index === payers.length - 1;
          const directionLabel =
            payer.direction === "owes_you" ? "owes you" : "you owe";
          const amountColor =
            payer.direction === "owes_you"
              ? "text-tally-green"
              : "text-tally-red";

          return (
            <Pressable
              key={payer.id}
              onPress={() => onSelect(payer.id)}
              className={`flex-row items-center gap-3 px-4 py-3.5 active:opacity-90 ${
                isSelected ? "bg-tally-primaryLight" : ""
              } ${!isLast ? "border-b border-black/5" : ""}`}
            >
              <Avatar
                initial={payer.initial}
                backgroundColor={payer.avatarColor}
                size={40}
              />

              <View className="min-w-0 flex-1">
                <Text className="text-base font-bold text-tally-text">
                  {payer.name}
                </Text>
                <Text className="text-sm text-tally-textSecondary">
                  {directionLabel}
                </Text>
              </View>

              <Text className={`text-lg font-bold ${amountColor}`}>
                {formatAmount(payer.amount)}
              </Text>

              <CheckIndicator
                included={isSelected}
                onPress={() => onSelect(payer.id)}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
