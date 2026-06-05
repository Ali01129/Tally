import { Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

import { CheckIndicator } from "./check-indicator";
import { MEMBER_AVATAR_COLORS } from "./constants";
import { ExactAmountInput } from "./exact-amount-input";
import { PercentAmountInput } from "./percent-amount-input";
import type { SplitMember } from "./types";

type MemberRowProps = {
  member: SplitMember;
  index: number;
  splitMethod: SplitMethod;
  shareLabel: string;
  exactValue: string;
  percentValue: string;
  maxAmount: number;
  isIncluded: boolean;
  onToggleIncluded: () => void;
  onExactChange: (value: string) => void;
  onPercentChange: (value: string) => void;
  isLast: boolean;
};

export function MemberRow({
  member,
  index,
  splitMethod,
  shareLabel,
  exactValue,
  percentValue,
  maxAmount,
  isIncluded,
  onToggleIncluded,
  onExactChange,
  onPercentChange,
  isLast,
}: MemberRowProps) {
  const showSubtitle =
    splitMethod === "equal" ||
    splitMethod === "exact" ||
    splitMethod === "percent";

  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      } ${!isIncluded ? "opacity-50" : ""}`}
    >
      <Avatar
        initial={member.initial}
        backgroundColor={
          member.avatarColor ??
          MEMBER_AVATAR_COLORS[index % MEMBER_AVATAR_COLORS.length]
        }
        size={40}
      />

      <View className="min-w-0 flex-1">
        <Text
          className={`text-base font-bold ${
            isIncluded ? "text-tally-text" : "text-tally-textSecondary"
          }`}
        >
          {member.name}
        </Text>
        {showSubtitle ? (
          <Text className="text-sm text-tally-textSecondary">{shareLabel}</Text>
        ) : null}
      </View>

      {splitMethod === "equal" ? (
        <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
      ) : null}
      {splitMethod === "exact" ? (
        <>
          <ExactAmountInput
            value={exactValue}
            maxAmount={maxAmount}
            onChange={onExactChange}
            disabled={!isIncluded}
          />
          <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
        </>
      ) : null}
      {splitMethod === "percent" ? (
        <>
          <PercentAmountInput
            value={percentValue}
            onChange={onPercentChange}
            disabled={!isIncluded}
          />
          <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
        </>
      ) : null}
    </View>
  );
}
