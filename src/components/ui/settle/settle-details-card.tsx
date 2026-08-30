import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";

type SettleDetailsCardProps = {
  note: string;
  onChangeNote: (value: string) => void;
  dateLabel: string;
  onPressDate: () => void;
};

export function SettleDetailsCard({
  note,
  onChangeNote,
  dateLabel,
  onPressDate,
}: SettleDetailsCardProps) {
  return (
    <View className="overflow-hidden rounded-2xl border border-tally-groupCircles bg-white">
      <View className="flex-row items-center gap-3 px-4 py-3.5">
        <MaterialIcons
          name="description"
          size={20}
          color={Colors.tally.textSecondary}
        />
        <TextInput
          value={note}
          onChangeText={onChangeNote}
          placeholder="Add a note (optional)"
          placeholderTextColor={Colors.tally.textSecondary}
          className="flex-1 p-0 text-base text-tally-text"
        />
      </View>

      <View className="mx-4 border-t border-black/5" />

      <Pressable
        onPress={onPressDate}
        className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-70"
      >
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={Colors.tally.textSecondary}
        />
        <Text className="flex-1 text-base text-tally-text">Date</Text>
        <Text className="text-base font-semibold text-tally-text">
          {dateLabel}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={20}
          color={Colors.tally.textSecondary}
        />
      </Pressable>
    </View>
  );
}
