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

      <View className="flex-row items-baseline justify-center">
        <Text className="text-4xl font-semibold text-tally-textSecondary">
          $
        </Text>

        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#808080"
          className="min-w-[42vw] text-center text-6xl font-bold text-tally-text"
        />
      </View>
    </View>
  );
}
