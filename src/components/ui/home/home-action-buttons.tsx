import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type HomeActionButtonsProps = {
  onAddExpense?: () => void;
  onNewGroup?: () => void;
};

export function HomeActionButtons({
  onAddExpense,
  onNewGroup,
}: HomeActionButtonsProps) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onAddExpense}
        className="flex-1 items-center justify-center gap-2 rounded-2xl bg-tally-primary py-4 active:opacity-90"
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
        <Text className="text-sm font-semibold text-white">Add expense</Text>
      </Pressable>

      <Pressable
        onPress={onNewGroup}
        className="flex-1 items-center justify-center gap-2 rounded-2xl bg-white py-4 active:opacity-90"
      >
        <MaterialIcons name="group-add" size={24} color="#000000" />
        <Text className="text-sm font-semibold text-tally-text">New group</Text>
      </Pressable>
    </View>
  );
}
