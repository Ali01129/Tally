import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

type FriendsSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showScanner?: boolean;
};

export function FriendsSearchBar({
  value,
  onChangeText,
  placeholder = "Search friends or @handles",
  showScanner = true,
}: FriendsSearchBarProps) {
  return (
    <View className="flex-row items-center rounded-2xl bg-white px-4 py-2">
      <Feather name="search" size={18} color="#9CA3AF" />
      <TextInput
        className="ml-2 flex-1 text-base text-tally-text"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {showScanner ? (
        <Pressable className="ml-2 active:opacity-70">
          <MaterialIcons name="qr-code-scanner" size={20} color="#9CA3AF" />
        </Pressable>
      ) : null}
    </View>
  );
}
