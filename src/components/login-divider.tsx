import { Text, View } from "react-native";

export function LoginDivider() {
  return (
    <View className="flex-row items-center py-2">
      <View className="h-px flex-1 bg-gray-200" />
      <Text className="px-4 text-xl text-gray-400">or continue with</Text>
      <View className="h-px flex-1 bg-gray-200" />
    </View>
  );
}
