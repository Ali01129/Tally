import type { SplitMethod } from "@/components/ui/add-expense/split-selector";
import {
  resolveExactShare,
  resolvePercentShare,
} from "@/components/ui/add-expense/split-member/utils";

type ComputeAssignedAmountParams = {
  splitMethod: SplitMethod;
  totalAmount: number;
  includedMemberIds: Set<string>;
  memberIds: string[];
  exactAmounts: Record<string, string>;
  percentAmounts: Record<string, string>;
  itemAmounts: number[];
};

export function computeAssignedAmount({
  splitMethod,
  totalAmount,
  includedMemberIds,
  memberIds,
  exactAmounts,
  percentAmounts,
  itemAmounts,
}: ComputeAssignedAmountParams): number {
  if (splitMethod === "equal") {
    return includedMemberIds.size > 0 ? totalAmount : 0;
  }

  const includedCount = memberIds.filter((id) =>
    includedMemberIds.has(id),
  ).length;

  if (splitMethod === "exact") {
    return memberIds
      .filter((id) => includedMemberIds.has(id))
      .reduce(
        (sum, id) =>
          sum +
          resolveExactShare(exactAmounts[id] ?? "", includedCount, totalAmount),
        0,
      );
  }

  if (splitMethod === "percent") {
    return memberIds
      .filter((id) => includedMemberIds.has(id))
      .reduce(
        (sum, id) =>
          sum +
          (resolvePercentShare(percentAmounts[id] ?? "", includedCount) / 100) *
            totalAmount,
        0,
      );
  }

  return itemAmounts.reduce((sum, amount) => sum + amount, 0);
}
