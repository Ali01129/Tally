import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type SplitMethod = "equal" | "exact" | "percent" | "by-items";

const SPLIT_OPTIONS: { value: SplitMethod; label: string }[] = [
  { value: "equal", label: "Equal" },
  { value: "exact", label: "Exact" },
  { value: "percent", label: "%" },
  { value: "by-items", label: "By items" },
];

export function SplitSelector() {
  const [selected, setSelected] = useState<SplitMethod>("equal");

  return (
    <View className="mt-2 gap-2">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        SPLIT
      </Text>

      <View className="flex-row rounded-xl bg-[#ffffff] p-1">
        {SPLIT_OPTIONS.map((option) => {
          const isSelected = selected === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => setSelected(option.value)}
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
