import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type AccountRow = {
  id: string;
  label: string;
  value?: string;
  icon: ComponentProps<typeof Feather>["name"];
  destructive?: boolean;
};

type EditProfileAccountProps = {
  rows: AccountRow[];
  onRowPress?: (id: string) => void;
};

export function EditProfileAccount({
  rows,
  onRowPress,
}: EditProfileAccountProps) {
  return (
    <View className="gap-2">
      <Text className="px-1 text-xs font-semibold tracking-wider text-tally-textSecondary">
        ACCOUNT
      </Text>

      <View className="overflow-hidden rounded-3xl bg-white">
        {rows.map((row, index) => {
          const color = row.destructive ? "#E5484D" : "#808080";

          return (
            <Pressable
              key={row.id}
              onPress={() => onRowPress?.(row.id)}
              className={`flex-row items-center gap-3 px-4 py-4 active:opacity-80 ${
                index < rows.length - 1 ? "border-b border-black/5" : ""
              }`}
            >
              <Feather name={row.icon} size={20} color={color} />
              <Text
                className={`flex-1 text-base font-medium ${
                  row.destructive ? "text-[#E5484D]" : "text-tally-text"
                }`}
              >
                {row.label}
              </Text>
              {row.value ? (
                <Text className="text-sm text-tally-textSecondary">
                  {row.value}
                </Text>
              ) : null}
              {!row.destructive ? (
                <Feather name="chevron-right" size={18} color="#C0C0C0" />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
