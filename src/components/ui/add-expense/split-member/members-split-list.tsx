import { View } from "react-native";

import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

import { MemberRow } from "./member-row";
import type { SplitMember } from "./types";
import {
  getDefaultExactShare,
  getDefaultPercentShare,
  getMemberShareLabel,
} from "./utils";

type MembersSplitListProps = {
  splitMethod: SplitMethod;
  members: SplitMember[];
  maxAmount: number;
  includedCount: number;
  includedMemberIds: Set<string>;
  exactAmounts: Record<string, string>;
  percentAmounts: Record<string, string>;
  onToggleMemberIncluded: (memberId: string) => void;
  onExactChange: (memberId: string, value: string) => void;
  onPercentChange: (memberId: string, value: string) => void;
};

export function MembersSplitList({
  splitMethod,
  members,
  maxAmount,
  includedCount,
  includedMemberIds,
  exactAmounts,
  percentAmounts,
  onToggleMemberIncluded,
  onExactChange,
  onPercentChange,
}: MembersSplitListProps) {
  return (
    <View className="mt-2 overflow-hidden rounded-2xl bg-white">
      {members.map((member, index) => {
        const isIncluded = includedMemberIds.has(member.id);
        const exactValue = exactAmounts[member.id] ?? "";
        const percentValue = percentAmounts[member.id] ?? "";
        const shareLabel = getMemberShareLabel(
          splitMethod,
          isIncluded,
          maxAmount,
          includedCount,
          exactValue,
          percentValue,
        );
        const exactPlaceholder = isIncluded
          ? getDefaultExactShare(includedCount, maxAmount)
          : "0.00";
        const percentPlaceholder = isIncluded
          ? getDefaultPercentShare(includedCount)
          : "0";

        return (
          <MemberRow
            key={member.id}
            member={member}
            index={index}
            splitMethod={splitMethod}
            shareLabel={shareLabel}
            exactValue={exactValue}
            percentValue={percentValue}
            exactPlaceholder={exactPlaceholder}
            percentPlaceholder={percentPlaceholder}
            maxAmount={maxAmount}
            isIncluded={isIncluded}
            onToggleIncluded={() => onToggleMemberIncluded(member.id)}
            onExactChange={(value) => onExactChange(member.id, value)}
            onPercentChange={(value) => onPercentChange(member.id, value)}
            isLast={index === members.length - 1}
          />
        );
      })}
    </View>
  );
}
