import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type YouProCardProps = {
  onUpgrade?: () => void;
};

export function YouProCard({ onUpgrade }: YouProCardProps) {
  return (
    <View className="relative overflow-hidden rounded-3xl bg-tally-primary p-5">
      <View className="absolute -right-6 top-[-8] h-32 w-32 rounded-full bg-white/10" />
      <View className="absolute right-16 -bottom-8 h-28 w-28 rounded-full bg-white/5" />

      <View className="self-start flex-row items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
        <MaterialIcons name="auto-awesome" size={12} color="#FFFFFF" />
        <Text className="text-[11px] font-semibold tracking-wider text-white">
          TALLY PRO
        </Text>
      </View>

      <Text className="mt-4 text-2xl font-bold leading-8 text-white">
        Split bigger, with everyone.
      </Text>
      <Text className="mt-2 text-sm leading-5 text-white/80">
        Unlimited groups & members, receipts OCR, multi-currency, and more.
      </Text>

      <View className="mt-5 flex-row items-center gap-4">
        <Pressable
          onPress={onUpgrade}
          className="flex-row items-center gap-1.5 rounded-full bg-white px-4 py-2.5 active:opacity-90"
        >
          <Text className="text-sm font-semibold text-tally-primary">
            Upgrade
          </Text>
          <Feather name="arrow-right" size={14} color="#785DC3" />
        </Pressable>
        <Text className="text-sm text-white/80">7-day free trial</Text>
      </View>
    </View>
  );
}
