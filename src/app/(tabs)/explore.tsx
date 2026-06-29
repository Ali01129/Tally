import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 px-4 pt-10">
        <Text className="text-2xl font-bold text-black">Explore</Text>
      </SafeAreaView>
    </View>
  );
}
