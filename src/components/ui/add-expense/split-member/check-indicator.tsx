import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

type CheckIndicatorProps = {
  included: boolean;
  onPress: () => void;
};

export function CheckIndicator({ included, onPress }: CheckIndicatorProps) {
  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-80"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: included }}
    >
      {included ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-tally-primary">
          <Feather name="check" size={14} color="#ffffff" />
        </View>
      ) : (
        <View className="h-7 w-7 rounded-full border-2 border-tally-textSecondary" />
      )}
    </Pressable>
  );
}
