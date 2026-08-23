import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

export type YouMenuItemData = {
  id: string;
  label: string;
  icon: ComponentProps<typeof Feather>["name"];
  destructive?: boolean;
  showChevron?: boolean;
};

type YouMenuItemProps = {
  item: YouMenuItemData;
  isLast?: boolean;
  onPress?: () => void;
};

export function YouMenuItem({
  item,
  isLast = false,
  onPress,
}: YouMenuItemProps) {
  const color = item.destructive ? "#E5484D" : "#808080";
  const showChevron = item.showChevron ?? !item.destructive;

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-4 py-4 active:opacity-80 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      <Feather name={item.icon} size={20} color={color} />
      <Text
        className={`flex-1 text-base ${
          item.destructive
            ? "font-medium text-[#E5484D]"
            : "font-medium text-tally-text"
        }`}
      >
        {item.label}
      </Text>
      {showChevron ? (
        <Feather name="chevron-right" size={18} color="#C0C0C0" />
      ) : null}
    </Pressable>
  );
}
