import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type UpgradeProFooterProps = {
  onContinue: () => void;
};

export function UpgradeProFooter({ onContinue }: UpgradeProFooterProps) {
  return (
    <View className="gap-3">
      <Pressable
        onPress={onContinue}
        className="flex-row items-center justify-center gap-2 rounded-full bg-tally-primary py-4 active:opacity-90"
      >
        <MaterialIcons name="auto-awesome" size={18} color="#FFFFFF" />
        <Text className="text-base font-bold text-white">
          Start 7-day free trial
        </Text>
      </Pressable>

      <Text className="px-2 text-center text-xs leading-5 text-tally-textSecondary">
        Cancel anytime. You won&apos;t be charged until the trial ends.
      </Text>
    </View>
  );
}
