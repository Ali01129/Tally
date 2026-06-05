import { Text, TextInput, View } from "react-native";

import { clampDecimalInput, sanitizeDecimalInput } from "./utils";

type ExactAmountInputProps = {
  value: string;
  maxAmount: number;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ExactAmountInput({
  value,
  maxAmount,
  onChange,
  disabled,
}: ExactAmountInputProps) {
  return (
    <View
      className={`flex-row items-center rounded-xl bg-tally-background px-3 py-2 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <Text className="text-sm font-semibold text-tally-textSecondary">$</Text>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={(text) => {
          onChange(clampDecimalInput(sanitizeDecimalInput(text), maxAmount));
        }}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#808080"
        className="min-w-[56px] p-0 text-right text-sm font-semibold text-tally-text"
      />
    </View>
  );
}
