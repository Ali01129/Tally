import { View } from "react-native";

import { TypeChip } from "@/components/ui/create-group/type-chip";
import { MaterialIcons } from "@expo/vector-icons";

type TypeSelectorProps = {
  values: {
    label: string;
    icon?: React.ComponentProps<typeof MaterialIcons>["name"];
  }[];
  selected: string;
  onChange: (next: string) => void;
};

export function TypeSelector({
  values,
  selected,
  onChange,
}: TypeSelectorProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {values.map((value) => (
        <TypeChip
          key={value.label}
          label={value.label}
          icon={value.icon!}
          selected={value.label === selected}
          onPress={() => onChange(value.label)}
        />
      ))}
    </View>
  );
}
