import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { computeAssignedAmount } from "@/lib/compute-assigned-amount";
import { useAddExpenseStore } from "@/stores/add-expense-store";

import type { ExpenseItem, SplitMember, SplitMembersListProps } from "./types";

export function useSplitMembersState({
  splitMethod,
  totalAmount,
  members,
}: SplitMembersListProps) {
  const maxAmount = useMemo(() => {
    const parsed = Number.parseFloat(totalAmount);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [totalAmount]);

  const [exactAmounts, setExactAmounts] = useState<Record<string, string>>({});
  const [percentAmounts, setPercentAmounts] = useState<Record<string, string>>(
    {},
  );
  const [includedMemberIds, setIncludedMemberIds] = useState<Set<string>>(
    () => new Set(members.map((member) => member.id)),
  );

  const includedCount = useMemo(
    () => members.filter((member) => includedMemberIds.has(member.id)).length,
    [members, includedMemberIds],
  );

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const setAssignedAmount = useAddExpenseStore((state) => state.setAssignedAmount);
  const memberIds = useMemo(() => members.map((member) => member.id), [members]);

  useEffect(() => {
    setIncludedMemberIds(new Set(members.map((member) => member.id)));
  }, [members]);

  useEffect(() => {
    if (splitMethod !== "by-items") {
      setItems([]);
      setIsAddingItem(false);
    }
  }, [splitMethod]);

  useEffect(() => {
    const assigned = computeAssignedAmount({
      splitMethod,
      totalAmount: maxAmount,
      includedMemberIds,
      memberIds,
      exactAmounts,
      percentAmounts,
      itemAmounts: items.map((item) => item.amount),
    });
    setAssignedAmount(assigned);
  }, [
    splitMethod,
    maxAmount,
    includedMemberIds,
    memberIds,
    exactAmounts,
    percentAmounts,
    items,
    setAssignedAmount,
  ]);

  const toggleMemberIncluded = (memberId: string) => {
    setIncludedMemberIds((current) => {
      const next = new Set(current);
      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        next.add(memberId);
      }
      return next;
    });
  };

  const updateExactAmount = (memberId: string, value: string) => {
    setExactAmounts((current) => ({ ...current, [memberId]: value }));
  };

  const updatePercentAmount = (memberId: string, value: string) => {
    setPercentAmounts((current) => ({ ...current, [memberId]: value }));
  };

  const updateItemIncludedMemberIds = (
    itemId: string,
    includedMemberIds: string[],
  ) => {
    setItems((current) =>
      current.map((currentItem) =>
        currentItem.id === itemId
          ? { ...currentItem, includedMemberIds }
          : currentItem,
      ),
    );
  };

  const removeItem = (itemId: string) => {
    setItems((current) =>
      current.filter((currentItem) => currentItem.id !== itemId),
    );
  };

  const addItem = (name: string, amountStr: string) => {
    const parsed = Number.parseFloat(amountStr);
    if (Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        name,
        amount: parsed,
        includedMemberIds: members.map((member: SplitMember) => member.id),
      },
    ]);
    setIsAddingItem(false);
  };

  return {
    maxAmount,
    exactAmounts,
    percentAmounts,
    includedMemberIds,
    includedCount,
    isAddingItem,
    setIsAddingItem,
    items,
    toggleMemberIncluded,
    updateExactAmount,
    updatePercentAmount,
    updateItemIncludedMemberIds,
    removeItem,
    addItem,
  };
}
