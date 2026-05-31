import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

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

  if (splitMethod === "exact") {
    return memberIds
      .filter((id) => includedMemberIds.has(id))
      .reduce((sum, id) => {
        const parsed = Number.parseFloat(exactAmounts[id] ?? "");
        return sum + (Number.isNaN(parsed) ? 0 : parsed);
      }, 0);
  }

  if (splitMethod === "percent") {
    return memberIds
      .filter((id) => includedMemberIds.has(id))
      .reduce((sum, id) => {
        const parsed = Number.parseInt(percentAmounts[id] ?? "", 10);
        const percent = Number.isNaN(parsed) ? 0 : parsed;
        return sum + (percent / 100) * totalAmount;
      }, 0);
  }

  return itemAmounts.reduce((sum, amount) => sum + amount, 0);
}
