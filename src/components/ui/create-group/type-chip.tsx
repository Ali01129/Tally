import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, type PressableProps } from "react-native";

export type TypeChipProps = {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  selected?: boolean;
} & Omit<PressableProps, "children">;

export function TypeChip({
  label,
  icon,
  selected = false,
  className = "",
  ...props
}: TypeChipProps) {
  return (
    <Pressable
      {...props}
      className={`flex-row items-center gap-2 rounded-full px-4 py-2 active:opacity-90 ${
        selected ? "bg-tally-primary" : "border border-black/5 bg-white"
      } ${className}`}
    >
      <MaterialIcons
        name={icon}
        size={18}
        color={selected ? "#FFFFFF" : "#000000"}
      />
      <Text
        className={`text-sm font-semibold ${
          selected ? "text-white" : "text-tally-textSecondary"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

