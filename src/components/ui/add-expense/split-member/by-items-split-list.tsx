import { View } from "react-native";

import { AddItemButton } from "./add-item-button";
import { AddItemForm } from "./add-item-form";
import { ItemRow } from "./item-row";
import type { ExpenseItem, SplitMember } from "./types";

type ByItemsSplitListProps = {
  maxAmount: number;
  members: SplitMember[];
  items: ExpenseItem[];
  isAddingItem: boolean;
  onStartAddingItem: () => void;
  onCancelAddingItem: () => void;
  onAddItem: (name: string, amount: string) => void;
  onUpdateItemIncludedMemberIds: (
    itemId: string,
    includedMemberIds: string[],
  ) => void;
  onRemoveItem: (itemId: string) => void;
};

export function ByItemsSplitList({
  maxAmount,
  members,
  items,
  isAddingItem,
  onStartAddingItem,
  onCancelAddingItem,
  onAddItem,
  onUpdateItemIncludedMemberIds,
  onRemoveItem,
}: ByItemsSplitListProps) {
  return (
    <View className="mt-2 overflow-hidden rounded-2xl bg-white">
      {items.map((item) => (
        <View key={item.id}>
          <ItemRow
            item={item}
            members={members}
            onUpdateIncludedMemberIds={(includedMemberIds) =>
              onUpdateItemIncludedMemberIds(item.id, includedMemberIds)
            }
            onRemove={() => onRemoveItem(item.id)}
          />
          <View className="border-b border-black/5" />
        </View>
      ))}

      {isAddingItem ? (
        <>
          <AddItemForm
            maxAmount={maxAmount}
            onCancel={onCancelAddingItem}
            onAdd={onAddItem}
          />
          <View className="border-b border-black/5" />
        </>
      ) : null}

      <AddItemButton onPress={onStartAddingItem} />
    </View>
  );
}
