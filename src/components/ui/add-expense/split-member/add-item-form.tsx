import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { ExactAmountInput } from "./exact-amount-input";

type AddItemFormProps = {
  maxAmount: number;
  onCancel: () => void;
  onAdd: (name: string, amount: string) => void;
};

function isAddItemFormValid(itemName: string, amount: string): boolean {
  const trimmedName = itemName.trim();
  if (!trimmedName) {
    return false;
  }

  const parsed = Number.parseFloat(amount);
  return !Number.isNaN(parsed) && parsed > 0;
}

export function AddItemForm({ maxAmount, onCancel, onAdd }: AddItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const canAdd = isAddItemFormValid(itemName, amount);

  return (
    <View className="gap-3 p-4">
      <View className="flex-row items-center gap-2">
        <View className="min-w-0 flex-1 rounded-xl bg-tally-background px-3 py-2">
          <TextInput
            value={itemName}
            onChangeText={setItemName}
            placeholder="Item name"
            placeholderTextColor="#808080"
            className="p-0 text-sm font-semibold text-tally-text"
          />
        </View>
        <ExactAmountInput
          value={amount}
          placeholder="0.00"
          maxAmount={maxAmount}
          onChange={setAmount}
        />
      </View>

      <View className="flex-row items-center justify-end gap-2">
        <Pressable
          onPress={onCancel}
          className="rounded-xl border border-black/10 bg-white px-4 py-2.5 active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="Cancel"
        >
          <Text className="text-sm font-semibold text-tally-text">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (!canAdd) {
              return;
            }
            onAdd(itemName.trim(), amount);
          }}
          disabled={!canAdd}
          className={`rounded-xl px-4 py-2.5 ${
            canAdd
              ? "bg-tally-primary active:opacity-80"
              : "bg-tally-textSecondary"
          }`}
          accessibilityRole="button"
          accessibilityLabel="Add item"
          accessibilityState={{ disabled: !canAdd }}
        >
          <Text className="text-sm font-semibold text-white">Add item</Text>
        </Pressable>
      </View>
    </View>
  );
}
