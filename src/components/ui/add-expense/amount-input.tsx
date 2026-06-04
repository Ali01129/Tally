import { Text, TextInput, View } from "react-native";

type AmountInputProps = {
  amount: string;
  onChangeAmount: (value: string) => void;
};

export function AmountInput({ amount, onChangeAmount }: AmountInputProps) {
  return (
    <View className="items-center gap-1 py-6">
      <Text className="text-xs font-semibold tracking-widest text-tally-textSecondary">
        AMOUNT
      </Text>

      <View className="flex-row items-center justify-center">
        <Text className="text-6xl font-bold leading-[60px] text-tally-textSecondary">
          $
        </Text>

        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#808080"
          className="min-w-[42vw] p-0 text-center text-6xl font-bold leading-[60px] text-tally-text placeholder:text-tally-textSecondary"
          style={{ includeFontPadding: false, textAlignVertical: "center" }}
        />
      </View>
    </View>
  );
}
