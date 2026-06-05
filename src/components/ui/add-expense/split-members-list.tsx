import { ByItemsSplitList } from "@/components/ui/add-expense/split-member/by-items-split-list";
import { MembersSplitList } from "@/components/ui/add-expense/split-member/members-split-list";
import type { SplitMembersListProps } from "@/components/ui/add-expense/split-member/types";
import { useSplitMembersState } from "@/components/ui/add-expense/split-member/use-split-members-state";

export type { SplitMember } from "@/components/ui/add-expense/split-member/types";

export function SplitMembersList({
  splitMethod,
  totalAmount,
  members,
}: SplitMembersListProps) {
  const {
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
  } = useSplitMembersState({ splitMethod, totalAmount, members });

  if (splitMethod === "by-items") {
    return (
      <ByItemsSplitList
        maxAmount={maxAmount}
        members={members}
        items={items}
        isAddingItem={isAddingItem}
        onStartAddingItem={() => {
          if (!isAddingItem) {
            setIsAddingItem(true);
          }
        }}
        onCancelAddingItem={() => setIsAddingItem(false)}
        onAddItem={addItem}
        onUpdateItemIncludedMemberIds={updateItemIncludedMemberIds}
        onRemoveItem={removeItem}
      />
    );
  }

  return (
    <MembersSplitList
      splitMethod={splitMethod}
      members={members}
      maxAmount={maxAmount}
      includedCount={includedCount}
      includedMemberIds={includedMemberIds}
      exactAmounts={exactAmounts}
      percentAmounts={percentAmounts}
      onToggleMemberIncluded={toggleMemberIncluded}
      onExactChange={updateExactAmount}
      onPercentChange={updatePercentAmount}
    />
  );
}
