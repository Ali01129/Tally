import { Text, View } from "react-native";

type YouFooterProps = {
  version: string;
};

export function YouFooter({ version }: YouFooterProps) {
  return (
    <View className="items-center py-2">
      <Text className="text-sm text-tally-textSecondary">
        Tally v{version} · Made with care
      </Text>
    </View>
  );
}
