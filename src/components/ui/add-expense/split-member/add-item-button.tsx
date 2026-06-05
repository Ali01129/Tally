import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import { ADD_ITEM_COLOR } from "./constants";

type AddItemButtonProps = {
  onPress?: () => void;
};

export function AddItemButton({ onPress }: AddItemButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 px-4 py-3.5 active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel="Add item"
    >
      <Feather name="plus" size={20} color={ADD_ITEM_COLOR} />
      <Text
        className="text-base font-semibold"
        style={{ color: ADD_ITEM_COLOR }}
      >
        Add item
      </Text>
    </Pressable>
  );
}
