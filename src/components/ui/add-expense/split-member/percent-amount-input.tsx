import { Text, TextInput, View } from "react-native";

import { clampPercentInput, sanitizePercentInput } from "./utils";

type PercentAmountInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function PercentAmountInput({
  value,
  onChange,
  disabled,
}: PercentAmountInputProps) {
  return (
    <View
      className={`flex-row items-center rounded-xl bg-tally-background px-3 py-2 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <Text className="text-sm font-semibold text-tally-textSecondary">%</Text>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={(text) => {
          onChange(clampPercentInput(sanitizePercentInput(text)));
        }}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor="#808080"
        className="min-w-[56px] p-0 text-right text-sm font-semibold text-tally-text"
      />
    </View>
  );
}
