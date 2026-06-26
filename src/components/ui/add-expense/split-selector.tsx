import { Pressable, Text, View } from "react-native";

export type SplitMethod = "equal" | "exact" | "percent" | "by-items";

const SPLIT_OPTIONS: { value: SplitMethod; label: string }[] = [
  { value: "equal", label: "Equal" },
  { value: "exact", label: "Exact" },
  { value: "percent", label: "%" },
  { value: "by-items", label: "By items" },
];

type SplitSelectorProps = {
  value: SplitMethod;
  onChange: (value: SplitMethod) => void;
};

export function SplitSelector({ value, onChange }: SplitSelectorProps) {
  return (
    <View className="mt-2 gap-2">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        SPLIT
      </Text>

      <View className="flex-row rounded-xl bg-[#ffffff] p-1">
        {SPLIT_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`flex-1 items-center justify-center rounded-xl py-2.5 ${
                isSelected ? "bg-tally-primary" : ""
              }`}
            >
              <Text
                className={`text-sm ${
                  isSelected
                    ? "font-semibold text-[#ffffff]"
                    : "font-medium text-tally-text"
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
