import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function UpgradeProHero() {
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
        Choose your plan
      </Text>
      <Text className="mt-2 text-sm leading-5 text-white/80">
        Unlimited groups & members, receipts OCR, multi-currency, and more.
      </Text>
    </View>
  );
}
