import { type ReactNode } from "react";
import { Text, View } from "react-native";

import { CheckIndicator } from "./check-indicator";

type ItemSelectionRowProps = {
  label: string;
  leading: ReactNode;
  included: boolean;
  onToggle: () => void;
  isLast?: boolean;
};

export function ItemSelectionRow({
  label,
  leading,
  included,
  onToggle,
  isLast,
}: ItemSelectionRowProps) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      {leading}
      <Text className="min-w-0 flex-1 text-base font-bold text-tally-text">
        {label}
      </Text>
      <CheckIndicator included={included} onPress={onToggle} />
    </View>
  );
}
