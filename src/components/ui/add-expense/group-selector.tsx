import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type GroupSelectorProps = {
  groupName: string;
  initials: string;
  onPress?: () => void;
};

export function GroupSelector({
  groupName,
  initials,
  onPress,
}: GroupSelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-1 flex-row items-center gap-3 self-start rounded-3xl bg-white px-2 py-1"
    >
      <View className="relative h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-tally-groupBg">
        <View className="absolute right-2 top-2 h-8 w-8 translate-x-1/2 -translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <View className="absolute bottom-1.5 left-1.5 h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <Text className="text-sm font-bold text-tally-text">{initials}</Text>
      </View>

      <Text className="text-base font-semibold text-tally-text">
        {groupName}
      </Text>
      <MaterialIcons name="keyboard-arrow-down" size={18} color="#808080" />
    </Pressable>
  );
}
