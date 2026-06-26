import { Feather } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type ExpenseAttachmentButtonsProps = {
  onAddReceipt?: () => void;
  onAddNote?: () => void;
};

function AttachmentButton({
  icon,
  label,
  onPress,
}: {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-dotted border-black/15 bg-white py-3.5 active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon}
      <Text className="text-sm font-medium text-tally-text">{label}</Text>
    </Pressable>
  );
}

export function ExpenseAttachmentButtons({
  onAddReceipt,
  onAddNote,
}: ExpenseAttachmentButtonsProps) {
  return (
    <View className="mt-2 flex-row gap-3">
      <AttachmentButton
        icon={<Feather name="camera" size={18} color="#808080" />}
        label="Add receipt"
        onPress={onAddReceipt}
      />
      <AttachmentButton
        icon={<Feather name="file-text" size={18} color="#808080" />}
        label="Add note"
        onPress={onAddNote}
      />
    </View>
  );
}
